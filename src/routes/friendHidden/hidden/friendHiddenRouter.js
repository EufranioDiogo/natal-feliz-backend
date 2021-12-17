const { getUserHiddenFriendController, getUserHiddenFriendDesiresController } = require('../../../controllers/friend/hidden/FriendHiddenController');
const { Router } = require("express");

const friendHiddenRouter = Router()

friendHiddenRouter.get('/hidden', getUserHiddenFriendController)
friendHiddenRouter.get('/hidden/desires', getUserHiddenFriendDesiresController)

module.exports = { friendHiddenRouter }
