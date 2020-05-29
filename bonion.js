//
// bonion
// Beaker union mounts w/o conflict resolution.
//
module.exports = async (...args) => {
  let bon = new Bonion(...args)
  await bon.scan()
  return bon
}

class Bonion {
  constructor (drive, opts = {}) {
    this.drive = drive
    this.opts = {}
    this.forks = {}
  }

  async scan(drive = null, label = null, depth = 0) {
    if (!drive)
      drive = this.drive
    if (depth > 20)
      throw new InternalError("the fork tree is too large, more than 20 master hyperdrives")

    let current = this.forks[drive.url]
    if (current) {
      if (current.label == null)
        current.label = label
      return
    }
    this.forks[drive.url] = {drive, label}

    //
    // Access all forks
    //
    let listing = await drive.readdir('.forks', {includeStats: true})
    for (let fork of listing) {
      let key = fork.stat?.mount?.key
      if (key) {
        this.scan(beaker.hyperdrive.drive(key), fork.name, depth + 1)
      }
    }

    //
    // Access master drive and its forks
    //
    try {
      info = JSON.parse(await drive.readFile('index.json'))
      if (info.forkOf) {
        this.scan(beaker.hyperdrive.drive(info.forkOf), null, depth + 1)
      }
    } catch {}
  }

  async addFork(label, url) {
    await this.drive.mkdir('/.forks')
    await this.drive.mount(`/.forks/${label}`, url)
  }

  async removeFork(label) {
    await this.drive.unmountFork(`/.forks/${label}`)
  }

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

  mergeUrl(drive) {
    if (this.drive.url !== drive.url) {
      return `beaker://diff/?base=${encodeURIComponent(drive.url)}&target=${encodeURIComponent(this.drive.url)}`
    }
  }
}
