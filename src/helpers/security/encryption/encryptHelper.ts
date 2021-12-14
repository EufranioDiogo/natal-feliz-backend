import bcryptjs from 'bcryptjs'

export const encryptString = (value: string): string => {
  return bcryptjs.hashSync(value, bcryptjs.genSaltSync(100))
}

export const compareEncryptedStringToNormal = (encryptedString: string, normalString: string): boolean => {
  return bcryptjs.compareSync(normalString, encryptedString)
}