/* setup.js */

const readlineSync = require('readline-sync')
const publicIp = require('public-ip')
const cipher = require('./cipher')
const https = require('https')
const fs = require('fs')
const scheduler = require('./scheduler')

const username = process.argv[2]
if (!username) {
  console.error('Supply ur name as argv, fx > node setup.js "og da don"')
  process.exit(1)
}
const ui = readlineSync.question(`Use this name: ${username} [y/n]? `)
if (!/^y(?:e?a|es)?$/i.test(ui)) process.exit(1)


if (fs.existsSync('.env')) {
  require('dotenv-safe').load({allowEmptyValues: true})
  if (/[^ ]+/.test(process.env.MY_STORE) ||
      /[^ ]+/.test(process.env.MY_NAME)) {
    throw new Error('dotenv variables already defined')
  }
}

publicIp.v4().then(ip => {
  
  const pubip = JSON.stringify({
    user: username, 
    public: cipher.encrypt(ip, username)
  })
  
  const options = {
    hostname : 'api.myjson.com',
    path     : '/bins',
    method   : 'POST',
    headers  : {
      'Content-Type'   : 'application/json; charset=utf-8',
      'Content-Length' : Buffer.byteLength(pubip)
    }
  }
  
  const req = https.request(options, res => {
    if (res.statusCode !== 201) return console.error(res.statusCode)
    res.setEncoding('utf8')
    res.on('data', data => {
      const uri = JSON.parse(data).uri
      fs.writeFileSync('.env', `MY_STORE=${uri}\nMY_NAME=${username}`, 'utf8')
      console.log(data)
    //scheduler.schedule()
    })
  })
  
  req.on('error', err => {
    console.error(err)
    process.exit(1)
  })
  
  req.write(pubip, 'utf8')

  req.end()
  
}).catch(err => {
  console.error(err)
  process.exit(1)
})
