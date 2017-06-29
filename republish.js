/* republish.js */

const publicIp = require('public-ip')
const https = require('https')

var store_id
require('dotenv-safe').load()
store_id = process.env.MY_STORE.replace(/^.+\//, '')



publicIp.v4().then(ip => {
  
  const pubip = JSON.stringify({pubip: ip})
  
  const options = {
    
  }
  
})
