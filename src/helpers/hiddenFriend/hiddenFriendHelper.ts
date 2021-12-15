import { UserType } from './../../utils/vars/user/userVars';
import { UserModel } from './../../models/user/userModel';
import { hiddenFriendModel } from "../../models/hiddenFriend/hiddenFriendModel"

export const userHasHiddenFriendHelper = async (userid: string): Promise<boolean> => {
  const result = await hiddenFriendModel.findOne({ fromUser: userid })

  if (result) {
    return true
  }
  return false
}

export const getUserHiddenFriendHelper = async (userid: string): Promise<UserType | null> => {
  const result = await hiddenFriendModel.findOne({ fromUser: userid })
  const hiddenFriend = await UserModel.findOne({ _id: result?.destinationUser })

  if (result) {
    return hiddenFriend
  }
  return null
}


export const registerHiddenFriendRelationShipHelper = async (userid: string, hiddenFriendId: string): Promise<boolean> => {
  await hiddenFriendModel.create({
    fromUser: userid,
    destinationUser: hiddenFriendId
  })
  return true;
}

export const getUserHiddenFriendDesiresHelper = async (userid: string): Promise<string> => {
  const hiddenFriend = await getUserHiddenFriendHelper(userid)
  const hiddeFriendDesires = String(hiddenFriend?.desires)

  return hiddenFriend?.desires === undefined ? '' : hiddeFriendDesires
}