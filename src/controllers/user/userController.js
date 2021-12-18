const { getUserByTokenHelper, createUserHelper } = require('../../helpers/user/userHelper');
const { generateJWT, verifyUserByToken } = require('../../helpers/security/jwt/jwtHelper');
const { encryptString } = require('../../helpers/security/encryption/encryptHelper');
const { generateServerGoodResponseMessage, generateServerErrorMessage } = require('../../helpers/remote/response/responseGenerator');
const { UserModel } = require("../../models/user/userModel");
const { STATUS_CONTAINER } = require("../../utils/constants/remoteConstants");

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

        res
          .status(STATUS_CONTAINER.STATUS_CREATED)
          .json(
            generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_CREATED, {
              ...data,
              token
            })
          )
      })
      .catch((err) => {
        res
          .status(STATUS_CONTAINER.STATUS_INTERNAL_SERVER_ERROR)
          .json(
            generateServerErrorMessage(
              STATUS_CONTAINER.STATUS_INTERNAL_SERVER_ERROR,
            )
          )
      })
  } catch (error) {
    res
      .status(STATUS_CONTAINER.STATUS_INTERNAL_SERVER_ERROR)
      .json(
        generateServerErrorMessage(
          STATUS_CONTAINER.STATUS_INTERNAL_SERVER_ERROR,
        )
      )
  }
}

const getUserData = async (req, res) => {
  const user = await verifyUserByToken(req.header('Authorization'))

  if (user !== null) {
    try {
      const userFounded = await UserModel.findOne({ _id: user?._id })

      console.log(userFounded)
      if (userFounded) {
        res
          .status(STATUS_CONTAINER.STATUS_SUCCES)
          .json(
            generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
              userFounded
            })
          )
      } else {
        res
          .status(STATUS_CONTAINER.STATUS_NO_CONTENT)
          .json(
            generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_NO_CONTENT, {})
          )
      }
    } catch (error) {
      res
        .status(STATUS_CONTAINER.STATUS_INTERNAL_SERVER_ERROR)
        .json(
          generateServerErrorMessage(STATUS_CONTAINER.STATUS_INTERNAL_SERVER_ERROR)
        )
    }
  } else {
    res
      .status(STATUS_CONTAINER.STATUS_FORBIDDEN)
      .json(
        generateServerErrorMessage(STATUS_CONTAINER.STATUS_FORBIDDEN)
      )
  }
}

const updateUserData = async (req, res) => {
  console.log(req.body)

  const user = verifyUserByToken(req.header('Authorization'))
  const newPasswordGenerated = await encryptString(user?.password)
  console.log(req.body)
  const newUserData = {
    username: req.body?.username,
    password: newPasswordGenerated,
    desires: req.body?.desires || ''
  }
  if (user !== null) {
    try {

      await UserModel
        .updateOne({
          _id: user?._id
        }, newUserData)

      res
        .status(STATUS_CONTAINER.STATUS_SUCCES)
        .json(
          generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
            ...newUserData
          })
        )
    } catch (error) {
      res
        .status(STATUS_CONTAINER.STATUS_INTERNAL_SERVER_ERROR)
        .json(
          generateServerErrorMessage(STATUS_CONTAINER.STATUS_INTERNAL_SERVER_ERROR)
        )
    }
  } else {
    res
      .status(STATUS_CONTAINER.STATUS_FORBIDDEN)
      .json(
        generateServerErrorMessage(STATUS_CONTAINER.STATUS_FORBIDDEN)
      )
  }
}

module.exports = { createUserController, getUserData, updateUserData }