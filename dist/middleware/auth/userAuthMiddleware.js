"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOwnerOfData = void 0;

var _responseGenerator = require("../../helpers/remote/response/responseGenerator");

var _jwtHelper = require("../../helpers/security/jwt/jwtHelper");

var _userModel = require("../../models/user/userModel");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isOwnerOfData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body;

    var user, userFounded;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = (0, _jwtHelper.verifyUserByToken)((_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.token);

            if (!(user !== null)) {
              _context.next = 12;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return _userModel.UserModel.findOne({
              _id: (user === null || user === void 0 ? void 0 : user._id) || ''
            });

          case 5:
            userFounded = _context.sent;

            if (userFounded !== null) {
              if ((userFounded === null || userFounded === void 0 ? void 0 : userFounded._id) === (user === null || user === void 0 ? void 0 : user._id)) {
                next();
              } else {
                (0, _responseGenerator.responseGenerator)(res, {
                  url: req.url,
                  status: 403,
                  result: false,
                  data: {
                    message: 'Operação inválida, sem permissões'
                  }
                });
              }
            } else {
              (0, _responseGenerator.responseGenerator)(res, {
                url: req.url,
                status: 403,
                result: false,
                data: {
                  message: 'Usuário não autenticado'
                }
              });
            }

            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            (0, _responseGenerator.responseGenerator)(res, {
              url: req.url,
              status: 500,
              result: false,
              data: {
                message: 'Erro no servidor',
                error: String(_context.t0)
              }
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));

  return function isOwnerOfData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.isOwnerOfData = isOwnerOfData;