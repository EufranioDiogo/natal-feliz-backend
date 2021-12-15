"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.updateUserData = exports.getUserData = exports.createUserController = void 0;
var userHelper_1 = require("./../../helpers/user/userHelper");
var jwtHelper_1 = require("./../../helpers/security/jwt/jwtHelper");
var encryptHelper_1 = require("./../../helpers/security/encryption/encryptHelper");
var responseGenerator_1 = require("./../../helpers/remote/response/responseGenerator");
var userModel_1 = require("../../models/user/userModel");
var createUserController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    var _a, _b;
    return __generator(this, function (_c) {
        user = {
            username: (_a = req.body) === null || _a === void 0 ? void 0 : _a.username,
            password: (_b = req.body) === null || _b === void 0 ? void 0 : _b.password,
        };
        console.log(user);
        try {
            (0, userHelper_1.createUserHelper)(user)
                .then(function (creationResult) {
                var token = (0, jwtHelper_1.generateJWT)(__assign({ _id: creationResult === null || creationResult === void 0 ? void 0 : creationResult._id }, user));
                res.json((0, responseGenerator_1.responseGenerator)(res, {
                    url: req.url,
                    status: 200,
                    result: true,
                    data: __assign(__assign({}, creationResult), { token: token })
                }));
            })
                .catch(function (err) {
                console.log(err);
            });
        }
        catch (error) {
            console.log(error);
            (0, responseGenerator_1.responseGenerator)(res, {
                url: req.url,
                status: 500,
                result: true,
                data: {}
            });
        }
        return [2 /*return*/];
    });
}); };
exports.createUserController = createUserController;
var getUserData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userFounded, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, userHelper_1.getUserByTokenHelper)((_a = req.body) === null || _a === void 0 ? void 0 : _a.token)];
            case 1:
                user = _b.sent();
                if (!(user !== null)) return [3 /*break*/, 5];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, userModel_1.UserModel.findOne({ _id: (user === null || user === void 0 ? void 0 : user._id) || '' })];
            case 3:
                userFounded = _b.sent();
                (0, responseGenerator_1.responseGenerator)(res, {
                    url: req.url,
                    status: 200,
                    result: true,
                    data: __assign({}, userFounded)
                });
                return [3 /*break*/, 5];
            case 4:
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
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getUserData = getUserData;
var updateUserData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newPasswordGenerated, newUserData, userUpdated, error_2;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                user = (0, jwtHelper_1.verifyUserByToken)((_a = req.body) === null || _a === void 0 ? void 0 : _a.token);
                newPasswordGenerated = (0, encryptHelper_1.encryptString)((_b = req.body) === null || _b === void 0 ? void 0 : _b.password);
                newUserData = {
                    username: (_c = req.body) === null || _c === void 0 ? void 0 : _c.username,
                    password: newPasswordGenerated,
                    desires: (_d = req.body) === null || _d === void 0 ? void 0 : _d.desires
                };
                if (!(user !== null)) return [3 /*break*/, 4];
                _e.label = 1;
            case 1:
                _e.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userModel_1.UserModel
                        .updateOne({
                        _id: (user === null || user === void 0 ? void 0 : user._id) || ''
                    }, { newUserData: newUserData })];
            case 2:
                userUpdated = _e.sent();
                (0, responseGenerator_1.responseGenerator)(res, {
                    url: req.url,
                    status: 200,
                    result: true,
                    data: __assign({}, userUpdated)
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _e.sent();
                (0, responseGenerator_1.responseGenerator)(res, {
                    url: req.url,
                    status: 500,
                    result: false,
                    data: {
                        message: 'Erro no servidor',
                        error: String(error_2)
                    }
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUserData = updateUserData;
