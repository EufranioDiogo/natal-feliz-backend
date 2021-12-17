"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.friendHiddenRouter = void 0;

var _FriendHiddenController = require("../../../controllers/friend/hidden/FriendHiddenController");

var _express = require("express");

var friendHiddenRouter = (0, _express.Router)();
exports.friendHiddenRouter = friendHiddenRouter;
friendHiddenRouter.get('/hidden', _FriendHiddenController.getUserHiddenFriendController);
friendHiddenRouter.get('/hidden/desires', _FriendHiddenController.getUserHiddenFriendDesiresController);