"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUserByToken = exports.generateJWT = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var generateJWT = function generateJWT(user) {
  var accessToken = _jsonwebtoken["default"].sign({
    _id: user._id,
    username: user.username,
    password: user.password
  }, process.env.JWT_SECRET || 'djnjdsn3jsnj', {
    expiresIn: '48h'
  });

  return accessToken;
};

exports.generateJWT = generateJWT;

var verifyUserByToken = function verifyUserByToken(accessToken) {
  try {
    var user = _jsonwebtoken["default"].verify(accessToken, process.env.JWT_SECRET || '');

    return user;
  } catch (error) {
    return null;
  }
};

exports.verifyUserByToken = verifyUserByToken;