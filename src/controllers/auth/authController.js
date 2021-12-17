const { generateJWT, verifyUserByToken } = require("../../../dist/helpers/security/jwt/jwtHelper");
const { responseGenerator } = require("../../helpers/remote/response/responseGenerator");
const { compareEncryptedStringToNormal } = require("../../helpers/security/encryption/encryptHelper");
const { UserModel } = require("../../models/user/userModel");

const isAuthenticatedUserController = (req, res) => {
  const user = verifyUserByToken(req.body?.token)

  if (user !== null) {
    responseGenerator(res, {
      url: req.url,
      status: 200,
      result: true,
      data: {
        message: 'User authenticated'
      }
    })
  } else {
    responseGenerator(res, {
      url: req.url,
      status: 403,
      result: false,
      data: {
        message: 'Not authenticated'
      }
    })
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

    responseGenerator(res, {
      url: req.url,
      status: 200,
      result: true,
      data: {
        ...userFounded,
        token
      }
    })
  } else {
    responseGenerator(res, {
      url: req.url,
      status: 403,
      result: false,
      data: {
        message: 'Erro, dados inválidos'
      }
    })
  }
}

const logoutUserController = (req, res) => {
  responseGenerator(res, {
    url: req.url,
    status: 200,
    result: true,
    data: {
      message: 'Logout user'
    }
  })
}


module.exports = { isAuthenticatedUserController, loginUserController, logoutUserController }