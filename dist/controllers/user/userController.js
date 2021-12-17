"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserData = exports.getUserData = exports.createUserController = void 0;

var _userHelper = require("../../helpers/user/userHelper");

var _jwtHelper = require("../../helpers/security/jwt/jwtHelper");

var _encryptHelper = require("../../helpers/security/encryption/encryptHelper");

var _responseGenerator = require("../../helpers/remote/response/responseGenerator");

var _userModel = require("../../models/user/userModel");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createUserController = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, newUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              user = _objectSpread({}, req.body.user);
              newUser = new _userModel.UserModel(user);

              _userModel.UserModel.create(newUser).then(function () {
                console.log('Creation ', newUser);
                var token = (0, _jwtHelper.generateJWT)(_objectSpread({
                  _id: newUser === null || newUser === void 0 ? void 0 : newUser._id
                }, user));
                res.json((0, _responseGenerator.responseGenerator)(res, {
                  url: req.url,
                  status: 200,
                  result: true,
                  data: _objectSpread(_objectSpread({}, newUser), {}, {
                    token: token
                  })
                }));
              })["catch"](function (err) {
                console.log(err);
                res.json((0, _responseGenerator.responseGenerator)(res, {
                  url: req.url,
                  status: 500,
                  result: false,
                  data: {
                    err: err
                  }
                }));
              });
            } catch (error) {
              console.log(error);
              (0, _responseGenerator.responseGenerator)(res, {
                url: req.url,
                status: 500,
                result: true,
                data: {}
              });
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUserController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUserController = createUserController;

var getUserData = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body;

    var user, userFounded;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _userHelper.getUserByTokenHelper)((_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.token);

          case 2:
            user = _context2.sent;

            if (!(user !== null)) {
              _context2.next = 14;
              break;
            }

            _context2.prev = 4;
            _context2.next = 7;
            return _userModel.UserModel.findOne({
              _id: (user === null || user === void 0 ? void 0 : user._id) || ''
            });

          case 7:
            userFounded = _context2.sent;
            (0, _responseGenerator.responseGenerator)(res, {
              url: req.url,
              status: 200,
              result: true,
              data: _objectSpread({}, userFounded)
            });
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](4);
            (0, _responseGenerator.responseGenerator)(res, {
              url: req.url,
              status: 500,
              result: false,
              data: {
                message: 'Erro no servidor',
                error: String(_context2.t0)
              }
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 11]]);
  }));

  return function getUserData(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserData = getUserData;

var updateUserData = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body2, _req$body3, _req$body4, _req$body5;

    var user, newPasswordGenerated, newUserData, userUpdated;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = (0, _jwtHelper.verifyUserByToken)((_req$body2 = req.body) === null || _req$body2 === void 0 ? void 0 : _req$body2.token);
            newPasswordGenerated = (0, _encryptHelper.encryptString)((_req$body3 = req.body) === null || _req$body3 === void 0 ? void 0 : _req$body3.password);
            newUserData = {
              username: (_req$body4 = req.body) === null || _req$body4 === void 0 ? void 0 : _req$body4.username,
              password: newPasswordGenerated,
              desires: (_req$body5 = req.body) === null || _req$body5 === void 0 ? void 0 : _req$body5.desires
            };

            if (!(user !== null)) {
              _context3.next = 14;
              break;
            }

            _context3.prev = 4;
            _context3.next = 7;
            return _userModel.UserModel.updateOne({
              _id: (user === null || user === void 0 ? void 0 : user._id) || ''
            }, {
              newUserData: newUserData
            });

          case 7:
            userUpdated = _context3.sent;
            (0, _responseGenerator.responseGenerator)(res, {
              url: req.url,
              status: 200,
              result: true,
              data: _objectSpread({}, userUpdated)
            });
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](4);
            (0, _responseGenerator.responseGenerator)(res, {
              url: req.url,
              status: 500,
              result: false,
              data: {
                message: 'Erro no servidor',
                error: String(_context3.t0)
              }
            });

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 11]]);
  }));

  return function updateUserData(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateUserData = updateUserData;