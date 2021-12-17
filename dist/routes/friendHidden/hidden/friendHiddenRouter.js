"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendHiddenRouter = void 0;
var FriendHiddenController_1 = require("./../../../controllers/friend/hidden/FriendHiddenController");
var express_1 = require("express");
var friendHiddenRouter = (0, express_1.Router)();
exports.friendHiddenRouter = friendHiddenRouter;
friendHiddenRouter.get('/hidden', FriendHiddenController_1.getUserHiddenFriendController);
friendHiddenRouter.get('/hidden/desires', FriendHiddenController_1.getUserHiddenFriendDesiresController);
