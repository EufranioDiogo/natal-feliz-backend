"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendRouter = void 0;
var express_1 = require("express");
var friendHiddenRouter_1 = require("./hidden/friendHiddenRouter");
var friendRouter = (0, express_1.Router)();
exports.friendRouter = friendRouter;
friendRouter.use('/hidden', friendHiddenRouter_1.friendHiddenRouter);
