"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
    },
    password: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
    },
    hasHiddenFriend: {
        type: mongoose_1.SchemaTypes.Boolean,
        required: true,
        default: false
    },
    desires: {
        type: mongoose_1.SchemaTypes.String,
        required: false
    },
    createdAt: {
        type: mongoose_1.SchemaTypes.Date,
        default: new Date().getDate(),
        required: true
    },
    updatedAt: {
        type: mongoose_1.SchemaTypes.Date,
        default: new Date().getDate(),
        required: true
    }
});
exports.UserModel = (0, mongoose_1.model)('user', userSchema);
