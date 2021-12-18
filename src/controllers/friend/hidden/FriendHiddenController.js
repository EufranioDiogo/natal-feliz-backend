const { responseGenerator, generateServerGoodResponseMessage } = require('../../../helpers/remote/response/responseGenerator');
const { userHasHiddenFriendHelper, getUserHiddenFriendHelper, registerHiddenFriendRelationShipHelper, getUserHiddenFriendDesiresHelper } = require('../../../helpers/hiddenFriend/hiddenFriendHelper');
const { getUserByTokenHelper, getRandomUserNotSelectedForHiddenFriendHelper } = require('../../../helpers/user/userHelper');
const { STATUS_CONTAINER } = require('../../../utils/constants/remoteConstants');

const getUserHiddenFriendController = async (req, res) => {
  const user = await getUserByTokenHelper(req.header('Authorization'))

  if (await userHasHiddenFriendHelper(user?._id)) {
    const hiddenFriend = await getUserHiddenFriendHelper(user?._id)

    if (hiddenFriend !== null) {
      res
        .status(STATUS_CONTAINER.STATUS_SUCCES)
        .json(
          generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
            hiddenFriend
          })
        )
    } else {
      res
        .status(STATUS_CONTAINER.STATUS_NO_CONTENT)
        .json(
          generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_NO_CONTENT, {
          })
        )
    }

  } else {
    const hiddenFriend = await getRandomUserNotSelectedForHiddenFriendHelper(user?._id)
    await registerHiddenFriendRelationShipHelper(user?._id, hiddenFriend._id)

    res
      .status(STATUS_CONTAINER.STATUS_SUCCES)
      .json(
        generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
          hiddenFriend
        })
      )
  }
}

const getUserHiddenFriendDesiresController = async (req, res) => {
  const user = await getUserByTokenHelper(req.header('Authorization'))

  const hiddenFriendDesires = await getUserHiddenFriendDesiresHelper(user?._id)

  res
    .status(STATUS_CONTAINER.STATUS_SUCCES)
    .json(
      generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
        hiddenFriendDesires
      })
    )
}

const userHasHiddenFriendController = async (req, res) => {
  const user = await getUserByTokenHelper(req.header('Authorization'))

  const hasHiddenFriend = await userHasHiddenFriendHelper(user?._id)

  res
    .status(STATUS_CONTAINER.STATUS_SUCCES)
    .json(
      generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
        hasHiddenFriend
      })
    )
}

module.exports = { getUserHiddenFriendController, getUserHiddenFriendDesiresController, userHasHiddenFriendController }