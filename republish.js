/* republish.js */

const publicIp = require('public-ip')
const cipher = require('./cipher')
const https = require('https')

var store_id, username
require('dotenv-safe').load()
store_id = process.env.MY_STORE.replace(/^.+\//, '')
username = process.env.MY_NAME

publicIp.v4().then(ip => {
  
  const pubip = JSON.stringify({
    user: username, 
    public: cipher.encrypt(ip, username)
  })
  
  const options = {
    hostname : 'api.myjson.com',
    path     : `/bins/${store_id}`,
    method   : 'PUT',
    headers  : {
      'Content-Type'   : 'application/json; charset=utf-8',
      'Content-Length' : Buffer.byteLength(pubip)
    }
  }
  
  const req = https.request(options, res => {
    if (res.statusCode !== 200) {
      console.error(res.statusCode)
      process.exit(1)
    }
    res.setEncoding('utf8')
    res.on('data', data => {
      console.log(data)
      process.exit(0)
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
