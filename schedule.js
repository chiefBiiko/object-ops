/* schedule.js */

const join = require('path').join
const exec = require('child_process').exec

module.exports = () => {
  const cmd = join(process.cwd(), /^win/i.test(process.platform) ?
                    'schedule.bat' : 'schedule.sh')
  const arg = join(process.cwd(), /^win/i.test(process.platform) ?
                    'republish.bat' : 'republish.sh')
  const child = exec(`${cmd} ${arg}`, {cwd: process.cwd()}, 
                     (err, stdout, stderr) => {
    if (err) return console.error(err)
    if (/[^ ]+/.test(stderr)) return console.error(stderr)
    return console.log(stdout)
  })
}

/*
const execFile = require('child_process').execFile

module.exports = () => {
  const file = join(process.cwd(), /^win/i.test(process.platform) ?
                    'schedule.bat' : 'schedule.sh')
  const arg = join(process.cwd(), /^win/i.test(process.platform) ?
                    'republish.bat' : 'republish.sh')
  const shell = /^win/i.test(process.platform) ? 'cmd.exe' : 'bash'
  const child = execFile(shell, [file, arg], {cwd: process.cwd()}, 
                         (err, stdout, stderr) => {
    if (err) return console.error(err)
    if (/[^ ]+/.test(stderr)) return console.error(stderr)
    console.log(stdout)
  })
}
*/