"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouter = void 0;

var _userAuthMiddleware = require("../../middleware/auth/userAuthMiddleware");

var _userController = require("../../controllers/user/userController");

var _express = require("express");

var userRouter = (0, _express.Router)();
exports.userRouter = userRouter;
userRouter.get('/', _userAuthMiddleware.isOwnerOfData, _userController.getUserData);
userRouter.post('/', _userController.createUserController);
userRouter.put('/', _userAuthMiddleware.isOwnerOfData, _userController.updateUserData);