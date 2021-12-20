const { responseGenerator, generateServerGoodResponseMessage, generateServerErrorMessage } = require("../../helpers/remote/response/responseGenerator");
const { compareEncryptedStringToNormal } = require("../../helpers/security/encryption/encryptHelper");
const { verifyUserByToken, generateJWT } = require("../../helpers/security/jwt/jwtHelper");
const { UserModel } = require("../../models/user/userModel");
const { STATUS_CONTAINER } = require("../../utils/constants/remoteConstants");

const isAuthenticatedUserController = async (req, res) => {
  const user = verifyUserByToken(req.header('Authorization'))

  if (user !== null) {
    const userFounded = await UserModel.findOne({ _id: user?._id })

    res
      .status(STATUS_CONTAINER.STATUS_SUCCES)
      .json(
        generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
          message: 'User authenticated',
          userFounded
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
    password: req.body?.password
  }


  const userFounded = await UserModel.findOne({ username: user.username })

  if (userFounded !== null) {
    const result = await compareEncryptedStringToNormal(userFounded?.password, user?.password)
    if (result) {
      const token = generateJWT({
        _id: userFounded?._id,
        ...user
      })


      res
        .status(STATUS_CONTAINER.STATUS_SUCCES)
        .json(
          generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
            userFounded,
            token
          })
        )
    } else {
      res
        .status(STATUS_CONTAINER.STATUS_FORBIDDEN)
        .json(
          generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_FORBIDDEN, {
            message: 'Error with your authentication'
          })
        )
    }
  } else {
    res
      .status(STATUS_CONTAINER.STATUS_FORBIDDEN)
      .json(
        generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_FORBIDDEN, {
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