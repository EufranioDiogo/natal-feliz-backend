const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateJWT = (user) => {
  const accessToken = jwt.sign({
    _id: user._id,
    username: user.username,
    password: user.password
  },
    process.env.JWT_SECRET || 'djnjdsn3jsnj',
    {
      expiresIn: '48h'
    });

  return accessToken;
}

const verifyUserByToken = (accessToken) => {
  try {
    const user = jwt.verify(accessToken, process.env.JWT_SECRET || '')

    return user
  } catch (error) {
    return null
  }
}

module.exports = { generateJWT, verifyUserByToken }