const crypto = require('crypto')

const encrypt = (plaintext, key) => {
  const cipher = crypto.createCipher('aes-256-cbc', key)
  var crypt = cipher.update(plaintext, 'utf8', 'base64')
  crypt += cipher.final('base64')
  return crypt
}
  
const decrypt = (ciphertext, key) => {
  const decipher = crypto.createDecipher('aes-256-cbc', key)
  var drypt = decipher.update(ciphertext, 'base64', 'utf8')
  drypt += decipher.final('utf8')
  return drypt
}

module.exports = {encrypt: encrypt, decrypt: decrypt}