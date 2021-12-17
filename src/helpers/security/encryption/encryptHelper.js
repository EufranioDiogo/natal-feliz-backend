import bcryptjs from 'bcryptjs'

export const encryptString = async (value) => {
  const newValue = await bcryptjs.hash(value, 10) 
  return newValue
}

export const compareEncryptedStringToNormal = (encryptedString, normalString) => {
  return bcryptjs.compareSync(normalString, encryptedString)
}