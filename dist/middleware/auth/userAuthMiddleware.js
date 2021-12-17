"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwnerOfData = void 0;
var responseGenerator_1 = require("../../helpers/remote/response/responseGenerator");
var jwtHelper_1 = require("../../helpers/security/jwt/jwtHelper");
var userModel_1 = require("../../models/user/userModel");
var isOwnerOfData = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userFounded, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = (0, jwtHelper_1.verifyUserByToken)((_a = req.body) === null || _a === void 0 ? void 0 : _a.token);
                if (!(user !== null)) return [3 /*break*/, 4];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userModel_1.UserModel.findOne({ _id: (user === null || user === void 0 ? void 0 : user._id) || '' })];
            case 2:
                userFounded = _b.sent();
                if (userFounded !== null) {
                    if ((userFounded === null || userFounded === void 0 ? void 0 : userFounded._id) === (user === null || user === void 0 ? void 0 : user._id)) {
                        next();
                    }
                    else {
                        (0, responseGenerator_1.responseGenerator)(res, {
                            url: req.url,
                            status: 403,
                            result: false,
                            data: {
                                message: 'Operação inválida, sem permissões'
                            }
                        });
                    }
                }
                else {
                    (0, responseGenerator_1.responseGenerator)(res, {
                        url: req.url,
                        status: 403,
                        result: false,
                        data: {
                            message: 'Usuário não autenticado'
                        }
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                (0, responseGenerator_1.responseGenerator)(res, {
                    url: req.url,
                    status: 500,
                    result: false,
                    data: {
                        message: 'Erro no servidor',
                        error: String(error_1)
                    }
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.isOwnerOfData = isOwnerOfData;
