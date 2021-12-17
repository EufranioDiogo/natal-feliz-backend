const { responseGenerator, generateServerErrorMessage } = require('../../helpers/remote/response/responseGenerator');
const { verifyUserByToken } = require('../../helpers/security/jwt/jwtHelper');
const { UserModel } = require('../../models/user/userModel');
const { STATUS_CONTAINER } = require('../../utils/constants/remoteConstants');
const ObjectId = require('mongoose').Types.ObjectId;

const isOwnerOfData = async (req, res, next) => {
  const user = verifyUserByToken(req.body?.token)

  if (user !== null) {
    console.log(user._id)
    try {
      next()
    } catch (error) {
      res
        .status(STATUS_CONTAINER.STATUS_INTERNAL_SERVER_ERROR)
        .json(generateServerErrorMessage(STATUS_CONTAINER.STATUS_INTERNAL_SERVER_ERROR))
    }
  }
}

module.exports = { isOwnerOfData }