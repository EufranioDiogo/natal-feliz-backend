const { getUserHiddenFriendController, getUserHiddenFriendDesiresController } = require('../../../controllers/friend/hidden/FriendHiddenController');
const { Router } = require("express");

const friendHiddenRouter = Router()

friendHiddenRouter.get('/', getUserHiddenFriendController)
friendHiddenRouter.get('/desires', getUserHiddenFriendDesiresController)

module.exports = { friendHiddenRouter }
