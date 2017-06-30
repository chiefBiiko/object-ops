/* schedule.js */

const { join } = require('path')
const { spawn } = require('child_process')

module.exports = () => {
  const cmd = join(process.cwd(), /^win/i.test(process.platform) ?
                   'schedule.bat' : 'schedule.sh')
  const arg = join(process.cwd(), /^win/i.test(process.platform) ?
                   'republish.bat' : 'republish.sh')
  const child = spawn(cmd, [arg], {cwd: process.cwd(), shell: true})
  child.stdout.on('data', data => console.log(data.toString()))
  child.stderr.on('data', data => console.error(data.toString()))
  child.on('exit', code => console.log(`[scheduler exited with code ${code}]`))
}
