"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encryptString = exports.compareEncryptedStringToNormal = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var encryptString = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
    var newValue;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcryptjs["default"].hash(value, 10);

          case 2:
            newValue = _context.sent;
            return _context.abrupt("return", newValue);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function encryptString(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.encryptString = encryptString;

var compareEncryptedStringToNormal = function compareEncryptedStringToNormal(encryptedString, normalString) {
  return _bcryptjs["default"].compareSync(normalString, encryptedString);
};

exports.compareEncryptedStringToNormal = compareEncryptedStringToNormal;