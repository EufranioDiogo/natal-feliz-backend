"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = require("express");
var authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.get('/', function () { });
authRouter.post('/login', function () { });
authRouter.post('/logout', function () { });
