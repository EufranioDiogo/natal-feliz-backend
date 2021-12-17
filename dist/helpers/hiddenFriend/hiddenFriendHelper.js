"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userHasHiddenFriendHelper = exports.registerHiddenFriendRelationShipHelper = exports.getUserHiddenFriendHelper = exports.getUserHiddenFriendDesiresHelper = void 0;

var _userVars = require("../../utils/vars/user/userVars");

var _userModel = require("../../models/user/userModel");

var _hiddenFriendModel = require("../../models/hiddenFriend/hiddenFriendModel");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userHasHiddenFriendHelper = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userid) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _hiddenFriendModel.hiddenFriendModel.findOne({
              fromUser: userid
            });

          case 2:
            result = _context.sent;

            if (!result) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", true);

          case 5:
            return _context.abrupt("return", false);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userHasHiddenFriendHelper(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.userHasHiddenFriendHelper = userHasHiddenFriendHelper;

var getUserHiddenFriendHelper = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userid) {
    var result, hiddenFriend;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _hiddenFriendModel.hiddenFriendModel.findOne({
              fromUser: userid
            });

          case 2:
            result = _context2.sent;
            _context2.next = 5;
            return _userModel.UserModel.findOne({
              _id: result === null || result === void 0 ? void 0 : result.destinationUser
            });

          case 5:
            hiddenFriend = _context2.sent;

            if (!result) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", hiddenFriend);

          case 8:
            return _context2.abrupt("return", null);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUserHiddenFriendHelper(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserHiddenFriendHelper = getUserHiddenFriendHelper;

var registerHiddenFriendRelationShipHelper = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userid, hiddenFriendId) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _hiddenFriendModel.hiddenFriendModel.create({
              fromUser: userid,
              destinationUser: hiddenFriendId
            });

          case 2:
            return _context3.abrupt("return", true);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function registerHiddenFriendRelationShipHelper(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.registerHiddenFriendRelationShipHelper = registerHiddenFriendRelationShipHelper;

var getUserHiddenFriendDesiresHelper = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userid) {
    var hiddenFriend, hiddeFriendDesires;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getUserHiddenFriendHelper(userid);

          case 2:
            hiddenFriend = _context4.sent;
            hiddeFriendDesires = String(hiddenFriend === null || hiddenFriend === void 0 ? void 0 : hiddenFriend.desires);
            return _context4.abrupt("return", (hiddenFriend === null || hiddenFriend === void 0 ? void 0 : hiddenFriend.desires) === undefined ? '' : hiddeFriendDesires);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getUserHiddenFriendDesiresHelper(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getUserHiddenFriendDesiresHelper = getUserHiddenFriendDesiresHelper;