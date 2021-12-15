import { userHasHiddenFriendHelper } from './../hiddenFriend/hiddenFriendHelper';
import { randomNumber } from '../../utils/functions/mathFunctions';
import { hiddenFriendModel } from './../../models/hiddenFriend/hiddenFriendModel';
import { verifyUserByToken } from './../security/jwt/jwtHelper';
import { userModel } from '../../models/user/userModel';


export const getUserByTokenHelper = async (token: string) => {
  const user = verifyUserByToken(token)

  return await userModel.findOne({ _id: user?._id })
}

export const getAllUsersHelper = async () => {
  return await userModel.find()
}

export const getRandomUserNotSelectedForHiddenFriendHelper = async () => {
  const users = await userModel.find({ hasHiddenFriend: false })
  const sortedIndex = randomNumber(0, users.length)
  const newUpdateState = {
    hasHiddenFriend: true

  }
  await userModel.updateOne({ _id: users[sortedIndex]?._id }, newUpdateState)

  return users[sortedIndex]
}

export const getUserByIdHelper = async (userid: string) => {
  return await userModel.findOne({ _id: userid })
}