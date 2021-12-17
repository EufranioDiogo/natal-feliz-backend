"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userHasHiddenFriendController = exports.getUserHiddenFriendDesiresController = exports.getUserHiddenFriendController = void 0;

var _responseGenerator = require("../../../helpers/remote/response/responseGenerator");

var _hiddenFriendHelper = require("../../../helpers/hiddenFriend/hiddenFriendHelper");

var _userHelper = require("../../../helpers/user/userHelper");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getUserHiddenFriendController = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body;

    var user, hiddenFriend, _hiddenFriend;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _userHelper.getUserByTokenHelper)((_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.token);

          case 2:
            user = _context.sent;
            _context.next = 5;
            return (0, _hiddenFriendHelper.userHasHiddenFriendHelper)(user === null || user === void 0 ? void 0 : user._id);

          case 5:
            if (!_context.sent) {
              _context.next = 12;
              break;
            }

            _context.next = 8;
            return (0, _hiddenFriendHelper.getUserHiddenFriendHelper)(user === null || user === void 0 ? void 0 : user._id);

          case 8:
            hiddenFriend = _context.sent;

            if (hiddenFriend !== null) {
              (0, _responseGenerator.responseGenerator)(res, {
                url: req.url,
                status: 200,
                result: true,
                data: _objectSpread({}, hiddenFriend)
              });
            } else {
              (0, _responseGenerator.responseGenerator)(res, {
                url: req.url,
                status: 200,
                result: true,
                data: {
                  message: 'Sem amigo oculto'
                }
              });
            }

            _context.next = 18;
            break;

          case 12:
            _context.next = 14;
            return (0, _userHelper.getRandomUserNotSelectedForHiddenFriendHelper)();

          case 14:
            _hiddenFriend = _context.sent;
            _context.next = 17;
            return (0, _hiddenFriendHelper.registerHiddenFriendRelationShipHelper)(user === null || user === void 0 ? void 0 : user._id, _hiddenFriend._id);

          case 17:
            (0, _responseGenerator.responseGenerator)(res, {
              url: req.url,
              status: 200,
              result: true,
              data: _objectSpread({}, _hiddenFriend)
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUserHiddenFriendController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUserHiddenFriendController = getUserHiddenFriendController;

var getUserHiddenFriendDesiresController = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2;

    var user, hiddenFriendDesires;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _userHelper.getUserByTokenHelper)((_req$body2 = req.body) === null || _req$body2 === void 0 ? void 0 : _req$body2.token);

          case 2:
            user = _context2.sent;
            _context2.next = 5;
            return (0, _hiddenFriendHelper.getUserHiddenFriendDesiresHelper)(user === null || user === void 0 ? void 0 : user._id);

          case 5:
            hiddenFriendDesires = _context2.sent;
            (0, _responseGenerator.responseGenerator)(res, {
              url: req.url,
              status: 200,
              result: true,
              data: {
                hiddenFriendDesires: hiddenFriendDesires
              }
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUserHiddenFriendDesiresController(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserHiddenFriendDesiresController = getUserHiddenFriendDesiresController;

var userHasHiddenFriendController = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body3;

    var user, hasHiddenFriend;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _userHelper.getUserByTokenHelper)((_req$body3 = req.body) === null || _req$body3 === void 0 ? void 0 : _req$body3.token);

          case 2:
            user = _context3.sent;
            _context3.next = 5;
            return (0, _hiddenFriendHelper.userHasHiddenFriendHelper)(user === null || user === void 0 ? void 0 : user._id);

          case 5:
            hasHiddenFriend = _context3.sent;
            (0, _responseGenerator.responseGenerator)(res, {
              url: req.url,
              status: 200,
              result: true,
              data: {
                hasHiddenFriend: hasHiddenFriend
              }
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function userHasHiddenFriendController(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.userHasHiddenFriendController = userHasHiddenFriendController;