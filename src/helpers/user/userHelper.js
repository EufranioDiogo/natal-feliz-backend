const { randomNumber } = require('../../utils/functions/mathFunctions');
const { verifyUserByToken } = require('../security/jwt/jwtHelper');
const { UserModel } = require('../../models/user/userModel');
const { UpdateWithAggregationPipeline } = require('mongoose');
const { encryptString } = require('../security/encryption/encryptHelper');


const createUserHelper = async (user) => {
  const newPasswordGenerated = await encryptString(user.password)

  const newUser = new UserModel({
    ...user,
    password: newPasswordGenerated
  })

  await UserModel.create()

  return newUser;
}

const getUserByTokenHelper = async (token) => {
  const user = verifyUserByToken(token)

  return await UserModel.findOne({ _id: user?._id })
}

const getAllUsersHelper = async () => {
  return await UserModel.find()
}

const getRandomUserNotSelectedForHiddenFriendHelper = async () => {
  const users = await UserModel.find({ hasHiddenFriend: false })
  const sortedIndex = randomNumber(0, users.length)

  await UserModel.updateOne({ _id: users[sortedIndex]?._id }, [{ $set: { "hasHiddenFriend": true, modified: "$$NOW" } }])

  return users[sortedIndex]
}

const getUserByIdHelper = async (userid) => {
  return await UserModel.findOne({ _id: userid })
}

module.exports = { createUserHelper, getUserByTokenHelper, getRandomUserNotSelectedForHiddenFriendHelper, getAllUsersHelper, getUserByIdHelper }