"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRouter = void 0;

var _authController = require("../../controllers/auth/authController");

var _express = require("express");

var authRouter = (0, _express.Router)();
exports.authRouter = authRouter;
authRouter.get('/', _authController.isAuthenticatedUserController);
authRouter.post('/login', _authController.loginUserController);
authRouter.post('/logout', _authController.logoutUserController);