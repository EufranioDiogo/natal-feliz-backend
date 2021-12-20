const bcryptjs = require('bcryptjs')

const encryptString = async (value) => {
  const newValue = await bcryptjs.hash(value, 10)
  return newValue
}

const compareEncryptedStringToNormal = async (encryptedString, normalString) => {
  const result = await bcryptjs.compare(normalString, encryptedString)
  return result
}

module.exports = { encryptString, compareEncryptedStringToNormal }