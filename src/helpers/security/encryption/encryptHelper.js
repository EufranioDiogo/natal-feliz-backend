const bcryptjs = require('bcryptjs')

const encryptString = async (value) => {
  const newValue = await bcryptjs.hash(value, 10)
  return newValue
}

const compareEncryptedStringToNormal = (encryptedString, normalString) => {
  return bcryptjs.compareSync(normalString, encryptedString)
}

module.exports = { encryptString, compareEncryptedStringToNormal }