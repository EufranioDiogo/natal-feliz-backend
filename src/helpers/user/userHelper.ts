import { UserType } from './../../utils/vars/user/userVars';
import { randomNumber } from '../../utils/functions/mathFunctions';
import { verifyUserByToken } from './../security/jwt/jwtHelper';
import { UserModel } from '../../models/user/userModel';
import { UpdateWithAggregationPipeline } from 'mongoose';
import { encryptString } from '../security/encryption/encryptHelper';


export const createUserHelper = async (user: UserType): Promise<any> => {
  console.log('....--....1')

  const newPasswordGenerated: string = await encryptString(user.password)

  const newUser = {
    ...user,
    password: newPasswordGenerated
  }
  console.log('....--....2')



  const creationResult = await UserModel
    .create(newUser)
    .then()
    .catch()
  
  console.log('....--....3')

  return creationResult;
}

export const getUserByTokenHelper = async (token: string) => {
  const user = verifyUserByToken(token)

  return await UserModel.findOne({ _id: user?._id })
}

export const getAllUsersHelper = async () => {
  return await UserModel.find()
}

export const getRandomUserNotSelectedForHiddenFriendHelper = async () => {
  const users = await UserModel.find({ hasHiddenFriend: false })
  const sortedIndex = randomNumber(0, users.length)

  await UserModel.updateOne({ _id: users[sortedIndex]?._id }, [{ $set: { "hasHiddenFriend": true, modified: "$$NOW" } }])

  return users[sortedIndex]
}

export const getUserByIdHelper = async (userid: string) => {
  return await UserModel.findOne({ _id: userid })
}