"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutUserController = exports.loginUserController = exports.isAuthenticatedUserController = void 0;

var _jwtHelper = require("../../../dist/helpers/security/jwt/jwtHelper");

var _responseGenerator = require("../../helpers/remote/response/responseGenerator");

var _encryptHelper = require("../../helpers/security/encryption/encryptHelper");

var _userModel = require("../../models/user/userModel");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isAuthenticatedUserController = function isAuthenticatedUserController(req, res) {
  var _req$body;

  var user = (0, _jwtHelper.verifyUserByToken)((_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.token);

  if (user !== null) {
    (0, _responseGenerator.responseGenerator)(res, {
      url: req.url,
      status: 200,
      result: true,
      data: {
        message: 'User authenticated'
      }
    });
  } else {
    (0, _responseGenerator.responseGenerator)(res, {
      url: req.url,
      status: 403,
      result: false,
      data: {
        message: 'Not authenticated'
      }
    });
  }
};

exports.isAuthenticatedUserController = isAuthenticatedUserController;

var loginUserController = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body2, _req$body3;

    var user, userFounded, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = {
              username: (_req$body2 = req.body) === null || _req$body2 === void 0 ? void 0 : _req$body2.username,
              password: (_req$body3 = req.body) === null || _req$body3 === void 0 ? void 0 : _req$body3.password
            };
            _context.next = 3;
            return _userModel.UserModel.findOne({
              username: user.username
            });

          case 3:
            userFounded = _context.sent;

            if ((0, _encryptHelper.compareEncryptedStringToNormal)(userFounded === null || userFounded === void 0 ? void 0 : userFounded.password, user === null || user === void 0 ? void 0 : user.password)) {
              token = (0, _jwtHelper.generateJWT)(_objectSpread({
                _id: userFounded === null || userFounded === void 0 ? void 0 : userFounded._id
              }, user));
              (0, _responseGenerator.responseGenerator)(res, {
                url: req.url,
                status: 200,
                result: true,
                data: _objectSpread(_objectSpread({}, userFounded), {}, {
                  token: token
                })
              });
            } else {
              (0, _responseGenerator.responseGenerator)(res, {
                url: req.url,
                status: 403,
                result: false,
                data: {
                  message: 'Erro, dados inválidos'
                }
              });
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loginUserController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.loginUserController = loginUserController;

var logoutUserController = function logoutUserController(req, res) {
  (0, _responseGenerator.responseGenerator)(res, {
    url: req.url,
    status: 200,
    result: true,
    data: {
      message: 'Logout user'
    }
  });
};

exports.logoutUserController = logoutUserController;