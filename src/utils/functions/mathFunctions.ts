/*
  Return number in interval (exclusive with endNumber), from [startNumber, endNumber - 1] 
*/
export const randomNumber = (startNumber: number, endNumber: number) => {
  return Math.random() * (endNumber - startNumber) + startNumber
}