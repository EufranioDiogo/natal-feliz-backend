import { getUserHiddenFriendController, getUserHiddenFriendDesiresController } from './../../../controllers/friend/hidden/FriendHiddenController';
import { Router } from "express";

const friendHiddenRouter = Router()

friendHiddenRouter.get('/hidden', getUserHiddenFriendController)
friendHiddenRouter.get('/hidden/desires', getUserHiddenFriendDesiresController)

export { friendHiddenRouter }
