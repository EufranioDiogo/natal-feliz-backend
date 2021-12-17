const { getUserByTokenHelper, createUserHelper } = require('../../helpers/user/userHelper');
const { generateJWT, verifyUserByToken } = require('../../helpers/security/jwt/jwtHelper');
const { encryptString } = require('../../helpers/security/encryption/encryptHelper');
const { responseGenerator } = require('../../helpers/remote/response/responseGenerator');
const { UserModel } = require("../../models/user/userModel");


const createUserController = async (req, res) => {
  try {
    const user = {
      username: req.body.username,
      password: req.body.password
    }

    createUserHelper(user)
      .then((data) => {
        const token = generateJWT({
          _id: data?._id,
          ...user
        })

        res.json(
          responseGenerator(res, {
            url: req.url,
            status: 200,
            result: true,
            data: {
              ...data,
              token
            }
          }))
      })
      .catch((err) => {
        console.log(err)
      })
  } catch (error) {
    console.log(error)
    responseGenerator(res, {
      url: req.url,
      status: 500,
      result: true,
      data: {
      }
    })
  }
}

const getUserData = async (req, res) => {
  const user = await getUserByTokenHelper(req.body?.token)


  if (user !== null) {

    try {
      const userFounded = await UserModel.findOne({ _id: user?._id || '' })

      responseGenerator(res, {
        url: req.url,
        status: 200,
        result: true,
        data: {
          ...userFounded
        }
      })
    } catch (error) {
      responseGenerator(res, {
        url: req.url,
        status: 500,
        result: false,
        data: {
          message: 'Erro no servidor',
          error: String(error)
        }
      })
    }
  }
}

const updateUserData = async (req, res) => {
  const user = verifyUserByToken(req.body?.token)
  const newPasswordGenerated = encryptString(req.body?.password)

  const newUserData = {
    username: req.body?.username,
    password: newPasswordGenerated,
    desires: req.body?.desires
  }

  if (user !== null) {
    try {

      const userUpdated = await UserModel
        .updateOne({
          _id: user?._id || ''
        }, { newUserData })

      responseGenerator(res, {
        url: req.url,
        status: 200,
        result: true,
        data: {
          ...userUpdated
        }
      })
    } catch (error) {
      responseGenerator(res, {
        url: req.url,
        status: 500,
        result: false,
        data: {
          message: 'Erro no servidor',
          error: String(error)
        }
      })
    }
  }
}

module.exports = { createUserController, getUserData, updateUserData }