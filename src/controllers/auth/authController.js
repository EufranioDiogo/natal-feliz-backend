const { generateJWT, verifyUserByToken } = require("../../../dist/helpers/security/jwt/jwtHelper");
const { responseGenerator, generateServerGoodResponseMessage, generateServerErrorMessage } = require("../../helpers/remote/response/responseGenerator");
const { compareEncryptedStringToNormal } = require("../../helpers/security/encryption/encryptHelper");
const { UserModel } = require("../../models/user/userModel");
const { STATUS_CONTAINER } = require("../../utils/constants/remoteConstants");

const isAuthenticatedUserController = (req, res) => {
  const user = verifyUserByToken(req.body?.token)

  if (user !== null) {
    res
      .status(STATUS_CONTAINER.STATUS_SUCCES)
      .json(
        generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
          message: 'User authenticated'
        })
      )
  } else {
    res
      .status(STATUS_CONTAINER.STATUS_FORBIDDEN)
      .json(
        generateServerErrorMessage(STATUS_CONTAINER.STATUS_FORBIDDEN, 'User authenticated')
      )
  }
}

const loginUserController = async (req, res) => {
  const user = {
    username: req.body?.username,
    password: req.body?.password,
  }

  const userFounded = await UserModel.findOne({ username: user.username })

  if (compareEncryptedStringToNormal(userFounded?.password, user?.password)) {
    const token = generateJWT({
      _id: userFounded?._id,
      ...user
    })


    res
      .status(STATUS_CONTAINER.STATUS_SUCCES)
      .json(
        generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
          ...userFounded,
          token
        })
      )
  } else {
    res
      .status(STATUS_CONTAINER.STATUS_SUCCES)
      .json(
        generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
          message: 'Error with your authentication'
        })
      )
  }
}

const logoutUserController = (req, res) => {
  res
    .status(STATUS_CONTAINER.STATUS_SUCCES)
    .json(
      generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
        message: 'Logout user'
      })
    )
}


module.exports = { isAuthenticatedUserController, loginUserController, logoutUserController }