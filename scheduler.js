/* scheduler.js */

const { join } = require('path')
const { spawn } = require('child_process')

const schedule = () => {
  const cmd = join(process.cwd(), /^win/i.test(process.platform) ?
                   'schedule.bat' : 'schedule.sh')
  const arg = join(process.cwd(), /^win/i.test(process.platform) ?
                   'republish.bat' : 'republish.sh')
  const child = spawn(cmd, [arg], {cwd: process.cwd(), shell: true})
  child.stdout.on('data', data => console.log(data.toString()))
  child.stderr.on('data', data => console.error(data.toString()))
  child.on('exit', code => {
    console.log(`[scheduler exited with code ${code}]`)
    process.exit(code)
  })
}

const unschedule = () => {
  const cmd = join(process.cwd(), /^win/i.test(process.platform) ?
                   'unschedule.bat' : 'unschedule.sh')
  const child = spawn(cmd, [], {cwd: process.cwd(), shell: true})
  child.stdout.on('data', data => console.log(data.toString()))
  child.stderr.on('data', data => console.error(data.toString()))
  child.on('exit', code => {
    console.log(`[scheduler exited with code ${code}]`)
    process.exit(code)
  })
}

module.exports = {schedule: schedule, unschedule: unschedule}