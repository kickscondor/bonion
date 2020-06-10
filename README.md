Bonion is a "union mounts" library for Hyperdrive and the Beaker Browser.
(Since there is already an NPM module called 'bunion' - and I figured the
'onion' [layers] metaphor still applies - this is called 'bonion'.)

Basically this is a cheap way of doing multiwriter drives from Javascript.
It doesn't attempt to auto-merge files or anything - the most recent edit wins.
However, the complete version history is still there - and Beaker can be used
to merge changes.

Here's how it goes:

1. Create the primary hyperdrive. (This could even be a copy of another bonion.)
2. Add forked hyperdrives by mounting them under a `.forks` directory at the
   root of the drive.
3. Mark deleted files by adding a metadata entry to the file named `bonion`
   with a value of `D`.

All of the above can be managed by this library - but those are the underlying
details that make the union possible.

## Discovering Forks

From the primary hyperdrive, one simply needs to list the contents of the 
`.forks` directory to see the approved forks.

     primary (hyper://1c6d8c..c4/)
       ┗━━ .forks
             ┣━━ friendo (hyper://abcdef..01/)
             ┣━━ pal (hyper://abcdef..02/)
             ┗━━ forkling (hyper://abcdef..03/)

However, from a fork, the `forkOf` property of the `index.json` contains
the address to the primary hyperdrive. So that drive is added to the union - as
well as any `.forks` (and any primary drive and its forks, etc) attached.

## Seeding Forks

One issue with seeding union mounts is that usually everyone will seed the
primary hyperdrive - it's the one that gets linked to. This is an issue because
the other drives need to be seeded equally - they all ultimately get accessed
on every request.

One possible way of dealing with this is to redirect visitors to one of the
forks - almost like you would with load-balancing on HTTP. This process could
look like this:

1. If a 'favoriteFork' cookie is found, redirect to that fork, if necessary.
2. Otherwise, get a list of all forks, along with the peer count.
3. Save the address of the least-common fork (so long as it's not zero) to
   'favoriteFork', then redirect.

Of course, this could be an issue if the least-common fork is inaccessible - so
you'll need to be sure you have at least one solid seed for a fork.

Here's some sample code illustrating this process, using the
`getLeastCommonFork` method:

     let B = await bonion(beaker.hyperdrive.drive())
     if (B.isMain()) {
       let fave = localStorage.getItem('favoriteFork')
       if (!fave) {
         let lcf = await B.getLeastCommonFork()
         if (lcf) {
           fave = lcf.drive.url
           localStorage.setItem('favoriteFork', fave)
         }
       }
       if (fave) {
         window.location.replace(fave)
       }
     }

## API
