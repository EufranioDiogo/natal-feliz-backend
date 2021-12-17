"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: {
        type: mongoose_1.SchemaTypes.String,
    },
    password: {
        type: mongoose_1.SchemaTypes.String,
    }
});
exports.UserModel = (0, mongoose_1.model)('users', userSchema);
/*

    hasHiddenFriend: {
      type: SchemaTypes.Boolean,
      required: true,
      default: false
    },
    desires: {
      type: SchemaTypes.String,
      required: false
    },
    createdAt: {
      type: SchemaTypes.Date,
      default: new Date().getDate(),
      required: true
    },
    updatedAt: {
      type: SchemaTypes.Date,
      default: new Date().getDate(),
      required: true
    }
*/ 
