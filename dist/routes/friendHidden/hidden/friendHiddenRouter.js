"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendHiddenRouter = void 0;
var express_1 = require("express");
var friendHiddenRouter = (0, express_1.Router)();
exports.friendHiddenRouter = friendHiddenRouter;
friendHiddenRouter.get('/hidden', function () { });
friendHiddenRouter.get('/hidden/desires', function () { });
