const { randomNumber } = require('../../utils/functions/mathFunctions');
const { verifyUserByToken } = require('../security/jwt/jwtHelper');
const { UserModel } = require('../../models/user/userModel');
const { UpdateWithAggregationPipeline } = require('mongoose');
const { encryptString } = require('../security/encryption/encryptHelper');


const createUserHelper = async (user) => {
  const newPasswordGenerated = await encryptString(user.password)

  const newUser = {
    ...user,
    password: newPasswordGenerated
  }

  try {
    const resultOfOperation = await UserModel.create(newUser)

    return resultOfOperation
  } catch (error) {
    throw new Error(error)
  }
}

const getUserByTokenHelper = async (token) => {
  const user = verifyUserByToken(token)

  const userFounded = await UserModel.findOne({ _id: user?._id })

  return userFounded
}

const getAllUsersHelper = async () => {
  return await UserModel.find()
}

const getRandomUserNotSelectedForHiddenFriendHelper = async (userid) => {
  const users = await UserModel.find({ hasHiddenFriend: false, $not: { _id: userid } })
  const sortedIndex = randomNumber(0, users.length)

  await UserModel.updateOne({ _id: users[sortedIndex]?._id }, { $set: { "hasHiddenFriend": true } })

  return users[sortedIndex]
}

const getUserByIdHelper = async (userid) => {
  return await UserModel.findOne({ _id: userid })
}

module.exports = { createUserHelper, getUserByTokenHelper, getRandomUserNotSelectedForHiddenFriendHelper, getAllUsersHelper, getUserByIdHelper }