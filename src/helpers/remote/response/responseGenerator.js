const responseGenerator = (res, responseBody) => {
  return {
    ...responseBody,
    metadata: {
      requestDate: new Date()
    }
  }
}

const generateServerGoodResponseMessage = (status, data) => {
  return {
    status: status,
    result: true,
    data: {
      ...data
    },
    metadata: {
      requestDate: new Date()
    }
  }
}

const generateServerErrorMessage = (status, message = 'An error occurred please try it later, or contact the coders of this API') => {
  return {
    status: status,
    result: false,
    data: {
      message 
    },
    metadata: {
      requestDate: new Date()
    }
  }
}


module.exports = { responseGenerator, generateServerGoodResponseMessage, generateServerErrorMessage }