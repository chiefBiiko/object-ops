/* setup.js */

const publicIp = require('public-ip')
const https = require('https')
const fs = require('fs')

const username = process.argv[2]

if (fs.existsSync('.env')) {
  require('dotenv-safe').load({allowEmptyValues: true})
  if (/[^ ]+/.test(process.env.MY_STORE)) {
    throw new Error('dotenv var MY_STORE already defined')
  }
}

publicIp.v4().then(ip => {
  
  const pubip = JSON.stringify({user: username, public: ip})
  
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
    res.setEncoding('utf8')
    res.on('data', data => {
      const uri = JSON.parse(data).uri
      fs.writeFile('.env', `MY_STORE=${uri}\n`, 'utf8', err => {
        if (err) console.error(err)
      })
      console.log(data)
    })
  })
  
  req.on('error', console.error)
  
  req.write(pubip, 'utf8')

  req.end()
  
}).catch(console.error)
