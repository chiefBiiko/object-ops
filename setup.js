/* setup.js */

const readlineSync = require('readline-sync')
const publicIp = require('public-ip')
const ed = require('./ed')
const https = require('https')
const fs = require('fs')

const username = process.argv[2]
if (!username) {
  console.error('Supply ur name as argv, fx > node setup.js "og da don"')
  process.exit(1)
}
const ui = readlineSync.question(`Use this name: ${username} [y/n]? `)
if (!/y/i.test(ui)) process.exit(1)


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
    public: ed.encrypt(ip, username)
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
      fs.writeFile('.env', `MY_STORE=${uri}\nMY_NAME=${username}`, 'utf8',
                   err => err && console.error(err))
      console.log(data)
    })
  })
  
  req.on('error', console.error)
  
  req.write(pubip, 'utf8')

  req.end()
  
}).catch(console.error)
