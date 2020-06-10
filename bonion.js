//
// bonion
// Beaker union mounts w/o conflict resolution.
//

//
// bonion(drive[, opts]) => [object Bonion]
// - drive: A hyperdrive object. (e.g. beaker.hyperdrive.drive())
// - opts: {depth: N} how deeply will the fork search for child forks?
//
module.exports = async (...args) => {
  let bon = new Bonion(...args)
  await bon.scan()
  return bon
}

class Bonion {
  constructor (drive, opts = {}) {
    this.drive = drive
    this.index = null
    Object.assign(this.opts = {depth: 1}, opts)
    this.forks = {}
  }

  async scan(drive = null, label = null, depth = 0) {
    if (!drive)
      drive = this.drive
    if (depth > 20)
      throw new InternalError("the fork tree is too large, more than 20 primary hyperdrives")

    let current = this.forks[drive.url]
    if (current) {
      //
      // If a primary drive contains a fork, delete our duplicate in the current
      // drive.
      //
      if (depth === 0 && current.drive === this.drive && drive !== this.drive) {
        removeFork(current.label)
      }
      if (current.label == null)
        current.label = label
      return
    }
    this.forks[drive.url] = current = {drive, label}

    //
    // Access all forks
    //
    if (depth < this.opts.depth) {
      let listing = await drive.readdir('.forks', {includeStats: true})
      for (let fork of listing) {
        let key = fork.stat?.mount?.key
        if (key) {
          this.scan(beaker.hyperdrive.drive(key), fork.name, depth + 1)
        }
      }
    }

    //
    // Access primary drive and its forks
    //
    try {
      current.index = index = JSON.parse(await drive.readFile('index.json'))
      if (drive === this.drive) {
        this.index = index
      }
      if (index.forkOf) {
        this.scan(beaker.hyperdrive.drive(index.forkOf), null, depth)
      }
    } catch {}
  }

  //
  // Get this drive's info.
  //
  async getInfo() {
    let d = this.forks[this.drive.url]
    if (!d.info) {
      d.info = await this.drive.getInfo()
    }
    return d.info
  }

  //
  // Is the drive we're on the main drive?
  //
  isMain() {
    return typeof(this.index) === 'object' && typeof(this.index.forkOf) === 'undefined'
  }

  //
  // Are we an owner of any of the forks?
  //
  async canWrite() {
    for (let url in this.forks) {
      let fork = this.forks[url]
      if (!fork.info) {
        fork.info = await fork.drive.getInfo()
      }
      if (fork.info.writable) {
        return true
      }
    }
    return false
  }

  //
  // Add a mount under .forks for the given drive.
  //
  async addFork(label, url) {
    await this.drive.mkdir('/.forks')
    await this.drive.mount(`/.forks/${label}`, url)
  }

  //
  // Remove a mount under .forks named `label`.
  //
  async removeFork(label) {
    await this.drive.unmountFork(`/.forks/${label}`)
  }

  //
  // Get the least-common fork. (Available fork with the fewest seeds.)
  //
  async getLeastCommonFork() {
    let acc = 0, lcf = null
    for (let url in this.forks) {
      let fork = this.forks[url]
      if (!fork.info) {
        fork.info = await fork.drive.getInfo()
      }

      let peers = fork.info?.peers || 0
      if (acc == 0 || (peers != 0 && peers < acc)) {
        acc = peers
        lcf = fork
      }
    }
    return lcf
  }

  //
  // Build a directory listing by reading all of the attached forks.
  //
  async readdir(url) {
    //
    // Build an array of [listing, drive object] (or null
    // if the directory can't be accessed.)
    //
    let listings = await Promise.all(Object.values(this.forks).
      map(fork => fork.drive.readdir(url, {includeStats: true}).
        then((listing, err) => listing && {listing, drive: fork.drive, label: fork.label}).
        catch(err => null)))

    //
    // Sift out the most recent files.
    //
    let recent = {}
    for (let fork of listings) {
      if (!fork)
        continue

      for (let file of fork.listing) {
        let r = recent[file.name]
        if (!r || (r.stat.mtime < file.stat.mtime)) {
          file.drive = fork.drive
          file.label = fork.label
          recent[file.name] = file
        }
      }
    }

    return Object.values(recent).sort((a, b) => a.name.localeCompare(b.name))
  }

  //
  // Find the most recent file among the attached forks.
  //
  async stat(url, opts = null) {
    opts = opts || {}
    //
    // Build an array of [file stat, drive object] (these values being null
    // if the file can't be accessed.
    //
    let stats = await Promise.all(Object.values(this.forks).
      map(fork => fork.drive.stat(url, opts).
        then((stat, err) => stat && {stat, drive: fork.drive, label: fork.label}).
        catch(err => null)))

    //
    // Find the most recent edit.
    //
    let st = stats.reduce((a, b) => (b?.stat?.mtime || 0) > (a?.stat?.mtime || 0) ? b : a)
    if (st === null || st.metadata?.bonion === 'D')
      throw new Error("File not found")
    return st
  }

  //
  // URL for Beaker's merge page, comparing a fork to the current drive.
  //
  mergeUrl(drive) {
    if (this.drive.url !== drive.url) {
      return `beaker://diff/?base=${encodeURIComponent(drive.url)}&target=${encodeURIComponent(this.drive.url)}`
    }
  }
}
