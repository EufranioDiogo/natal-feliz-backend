const { generateServerGoodResponseMessage, generateServerErrorMessage } = require("../../helpers/remote/response/responseGenerator");
const { verifyUserByToken } = require("../../helpers/security/jwt/jwtHelper");
const { UserModel } = require("../../models/user/userModel");
const { STATUS_CONTAINER } = require("../../utils/constants/remoteConstants");

const getAppStatistics = async (req, res) => {
  const user = verifyUserByToken(req.header('Authorization'))

  if (user !== null) {
    const quantUsersTotal = (await UserModel.find({})).length
    const quantUsersWithoutHiddenFriend = (await UserModel.find({ hasHiddenFriend: false })).length

    res
      .status(STATUS_CONTAINER.STATUS_SUCCES)
      .json(
        generateServerGoodResponseMessage(STATUS_CONTAINER.STATUS_SUCCES, {
          message: 'App information',
          quantUsersTotal,
          quantUsersWithoutHiddenFriend
        })
      )
  } else {
    res
      .status(STATUS_CONTAINER.STATUS_FORBIDDEN)
      .json(
        generateServerErrorMessage(STATUS_CONTAINER.STATUS_FORBIDDEN, 'User authenticated')
      )
  }
}



module.exports = { getAppStatistics }