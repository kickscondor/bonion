Bonion is a "union mounts" library for Hyperdrive and the Beaker Browser.
(Since there is already an NPM module called 'bunion' - and I figured the
'onion' [layers] metaphor still applies - this is called 'bonion'.)

Basically this is a cheap way of doing multiwriter drives from Javascript.
It doesn't attempt to auto-merge files or anything - the most recent edit wins.
However, the complete version history is still there - and Beaker can be used
to merge changes.

Here's how it goes:

1. Create the master hyperdrive. (This could even be a copy of another bonion.)
2. Add forked hyperdrives by mounting them under a `.forks` directory at the
   root of the drive.
3. Mark deleted files by adding a metadata entry to the file named `bonion`
   with a value of `D`.

All of the above can be managed by this library - but those are the underlying
details that make the union possible.

## Discovering Forks

From the master hyperdrive, one simply needs to list the contents of the 
`.forks` directory to see the approved forks.

     master (hyper://1c6d8c..c4/)
       ┣━━ .forks
             ┣━━ friendo (hyper://abcdef..01/)
             ┣━━ pal (hyper://abcdef..02/)
             ┗━━ forkling (hyper://abcdef..03/)

However, from a fork, the `forkOf` property of the `index.json` contains
the address to the master hyperdrive.
So that drive is added to the union - as well as any `.forks` (and any master
drive and its forks, etc) attached.

## API
