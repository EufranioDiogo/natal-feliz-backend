const responseGenerator = (res, responseBody) => {
  return {
    ...responseBody,
    metadata: {
      requestDate: new Date().getDate()
    }
  }
}
module.exports = { responseGenerator }