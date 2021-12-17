"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.friendRouter = void 0;

var _express = require("express");

var _friendHiddenRouter = require("./hidden/friendHiddenRouter");

var friendRouter = (0, _express.Router)();
exports.friendRouter = friendRouter;
friendRouter.use('/hidden', _friendHiddenRouter.friendHiddenRouter);