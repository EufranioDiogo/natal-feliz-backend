const { UserModel } = require('../../models/user/userModel');
const { hiddenFriendModel } = require("../../models/hiddenFriend/hiddenFriendModel");

const userHasHiddenFriendHelper = async (userid) => {
  const result = await hiddenFriendModel.findOne({ fromUser: userid })

  if (result) {
    return true
  }
  return false
}

const getUserHiddenFriendHelper = async (userid) => {
  const result = await hiddenFriendModel.findOne({ fromUser: userid })
  const hiddenFriend = await UserModel.findOne({ _id: result?.destinationUser })

  if (result) {
    return hiddenFriend
  }
  return null
}


const registerHiddenFriendRelationShipHelper = async (userid, hiddenFriendId) => {
  await hiddenFriendModel.create({
    fromUser: userid,
    destinationUser: hiddenFriendId
  })
  return true;
}

const getUserHiddenFriendDesiresHelper = async (userid) => {
  const hiddenFriend = await getUserHiddenFriendHelper(userid)
  const hiddeFriendDesires = String(hiddenFriend?.desires)

  return hiddenFriend?.desires === undefined ? '' : hiddeFriendDesires
}

module.exports = { userHasHiddenFriendHelper, getUserHiddenFriendHelper, registerHiddenFriendRelationShipHelper, getUserHiddenFriendDesiresHelper }