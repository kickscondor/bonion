import 'regenerator-runtime/runtime'
const bonion = require("./bonion.js");
const u = require("umbrellajs");

function ready(fn) {
  if (document.readyState !== 'loading') {
    return fn()
  }
  u(document).on('DOMContentLoaded', fn)
} 

ready(async function () {
  let body = u(document.body)
  body.html("<b>Loading...</b>")

  let B = await bonion(beaker.hyperdrive.drive())
  body.html("<b>Searching for this file...</b>")
  console.log(body)

  try {
    let f = await B.stat(window.location.pathname)
    console.log(f)
    let txt = ''
    if (f.stat?.isFile()) {
      txt = await f.drive.readFile(window.location.pathname)
      txt = `path: ${window.location.pathname}\ndrive: ${f.drive.url}\nmodified: ${f.stat.mtime}\n---\n\n` +
        txt + "\n\n" + (B.mergeUrl(f.drive) || '')
    } else if (f.stat?.isDirectory()) {
      let dir = await B.readdir(window.location.pathname)
      for (let file of dir) {
        txt += `${file.name}\t${file.label}\t${file.stat.mtime}\n`
      }
    }
    body.empty().append(u("<pre><code>").text(txt))
  } catch (e) {
    body.html(`<b>${e}</b>`)
  }
});
