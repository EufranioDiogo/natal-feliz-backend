const { responseGenerator } = require('../../../helpers/remote/response/responseGenerator');
const { userHasHiddenFriendHelper, getUserHiddenFriendHelper, registerHiddenFriendRelationShipHelper, getUserHiddenFriendDesiresHelper } = require('../../../helpers/hiddenFriend/hiddenFriendHelper');
const { getUserByTokenHelper, getRandomUserNotSelectedForHiddenFriendHelper } = require('../../../helpers/user/userHelper');

const getUserHiddenFriendController = async (req, res) => {
  const user = await getUserByTokenHelper(req.body?.token)

  if (await userHasHiddenFriendHelper(user?._id)) {
    const hiddenFriend = await getUserHiddenFriendHelper(user?._id)

    if (hiddenFriend !== null) {
      responseGenerator(res, {
        url: req.url,
        status: 200,
        result: true,
        data: {
          ...hiddenFriend
        }
      })
    } else {
      responseGenerator(res, {
        url: req.url,
        status: 200,
        result: true,
        data: {
          message: 'Sem amigo oculto'
        }
      })
    }

  } else {
    const hiddenFriend = await getRandomUserNotSelectedForHiddenFriendHelper()
    await registerHiddenFriendRelationShipHelper(user?._id, hiddenFriend._id)

    responseGenerator(res, {
      url: req.url,
      status: 200,
      result: true,
      data: {
        ...hiddenFriend
      }
    })
  }
}

const getUserHiddenFriendDesiresController = async (req, res) => {
  const user = await getUserByTokenHelper(req.body?.token)

  const hiddenFriendDesires = await getUserHiddenFriendDesiresHelper(user?._id)

  responseGenerator(res, {
    url: req.url,
    status: 200,
    result: true,
    data: {
      hiddenFriendDesires
    }
  })
}

const userHasHiddenFriendController = async (req, res) => {
  const user = await getUserByTokenHelper(req.body?.token)

  const hasHiddenFriend = await userHasHiddenFriendHelper(user?._id)

  responseGenerator(res, {
    url: req.url,
    status: 200,
    result: true,
    data: {
      hasHiddenFriend
    }
  })
}

module.exports = { getUserHiddenFriendController, getUserHiddenFriendDesiresController, userHasHiddenFriendController }