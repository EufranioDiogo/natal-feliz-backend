"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  username: {
    type: _mongoose.SchemaTypes.String
  },
  password: {
    type: _mongoose.SchemaTypes.String
  }
});
var UserModel = (0, _mongoose.model)('users', userSchema);
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

exports.UserModel = UserModel;