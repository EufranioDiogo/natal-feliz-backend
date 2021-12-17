"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserByTokenHelper = exports.getUserByIdHelper = exports.getRandomUserNotSelectedForHiddenFriendHelper = exports.getAllUsersHelper = exports.createUserHelper = void 0;

var _userVars = require("../../utils/vars/user/userVars");

var _mathFunctions = require("../../utils/functions/mathFunctions");

var _jwtHelper = require("../security/jwt/jwtHelper");

var _userModel = require("../../models/user/userModel");

var _mongoose = require("mongoose");

var _encryptHelper = require("../security/encryption/encryptHelper");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createUserHelper = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
    var newPasswordGenerated, newUser, creationResult;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('....--....1');
            _context.next = 3;
            return (0, _encryptHelper.encryptString)(user.password);

          case 3:
            newPasswordGenerated = _context.sent;
            newUser = new _userModel.UserModel(_objectSpread(_objectSpread({}, user), {}, {
              password: newPasswordGenerated
            }));
            console.log(newUser);
            console.log('....--....2');
            _context.next = 9;
            return _userModel.UserModel.create();

          case 9:
            creationResult = _context.sent;
            console.log('....--....3');
            return _context.abrupt("return", newUser);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUserHelper(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUserHelper = createUserHelper;

var getUserByTokenHelper = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(token) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = (0, _jwtHelper.verifyUserByToken)(token);
            _context2.next = 3;
            return _userModel.UserModel.findOne({
              _id: user === null || user === void 0 ? void 0 : user._id
            });

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUserByTokenHelper(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserByTokenHelper = getUserByTokenHelper;

var getAllUsersHelper = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _userModel.UserModel.find();

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getAllUsersHelper() {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAllUsersHelper = getAllUsersHelper;

var getRandomUserNotSelectedForHiddenFriendHelper = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var _users$sortedIndex;

    var users, sortedIndex;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _userModel.UserModel.find({
              hasHiddenFriend: false
            });

          case 2:
            users = _context4.sent;
            sortedIndex = (0, _mathFunctions.randomNumber)(0, users.length);
            _context4.next = 6;
            return _userModel.UserModel.updateOne({
              _id: (_users$sortedIndex = users[sortedIndex]) === null || _users$sortedIndex === void 0 ? void 0 : _users$sortedIndex._id
            }, [{
              $set: {
                "hasHiddenFriend": true,
                modified: "$$NOW"
              }
            }]);

          case 6:
            return _context4.abrupt("return", users[sortedIndex]);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getRandomUserNotSelectedForHiddenFriendHelper() {
    return _ref4.apply(this, arguments);
  };
}();

exports.getRandomUserNotSelectedForHiddenFriendHelper = getRandomUserNotSelectedForHiddenFriendHelper;

var getUserByIdHelper = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(userid) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _userModel.UserModel.findOne({
              _id: userid
            });

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getUserByIdHelper(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getUserByIdHelper = getUserByIdHelper;