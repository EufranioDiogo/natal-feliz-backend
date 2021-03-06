/*
  Return number in interval (exclusive with endNumber), from [startNumber, endNumber - 1] 
*/
const randomNumber = (startNumber, endNumber) => {
  return parseInt(Math.random() * (endNumber - startNumber) + startNumber)
}

module.exports = { randomNumber }