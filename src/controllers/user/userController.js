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
              data,
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
  const user = await getUserByTokenHelper(req.body?.token)
  if (user !== null) {
    try {
      const userFounded = await UserModel.findOne({ _id: user?._id })

      if (userFounded !== {}) {
        res
          .status(STATUS_CONTAINER.STATUS_SUCCES)
          .json(
            generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
              ...userFounded
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
          _id: user?._id
        }, { newUserData })

      res
        .status(STATUS_CONTAINER.STATUS_SUCCES)
        .json(
          generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
            ...userUpdated
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