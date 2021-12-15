import bcryptjs from 'bcryptjs'

export const encryptString = async (value: string): Promise<string> => {
  const newValue = await bcryptjs.hash(value, 10) 
  return newValue
}

export const compareEncryptedStringToNormal = (encryptedString: string, normalString: string): boolean => {
  return bcryptjs.compareSync(normalString, encryptedString)
}