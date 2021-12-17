"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserByToken = exports.generateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var generateJWT = function (user) {
    var accessToken = jsonwebtoken_1.default.sign({
        _id: user._id,
        username: user.username,
        password: user.password
    }, process.env.JWT_SECRET || 'djnjdsn3jsnj', {
        expiresIn: '48h'
    });
    return accessToken;
};
exports.generateJWT = generateJWT;
var verifyUserByToken = function (accessToken) {
    try {
        var user = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET || '');
        return user;
    }
    catch (error) {
        return null;
    }
};
exports.verifyUserByToken = verifyUserByToken;
