/* schedule.js */

const execFile = require('child_process').execFile

const child = execFile(file, args, options, (err, stdout, stderr) => {
  if (err) return console.error(err)
  if (/[^ ]+/.test(stderr)) return console.error(stderr)
  console.log(stdout)
})