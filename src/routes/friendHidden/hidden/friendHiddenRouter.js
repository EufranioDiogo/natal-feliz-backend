const { getUserHiddenFriendController, getUserHiddenFriendDesiresController, getHiddenFriendListController } = require('../../../controllers/friend/hidden/FriendHiddenController');
const { Router } = require("express");

const friendHiddenRouter = Router()

friendHiddenRouter.get('/', getUserHiddenFriendController)
friendHiddenRouter.get('/desires', getUserHiddenFriendDesiresController)
friendHiddenRouter.get('/list', getHiddenFriendListController)

module.exports = { friendHiddenRouter }
