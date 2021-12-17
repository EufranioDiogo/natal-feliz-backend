"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hiddenFriendModel = void 0;

var _mongoose = require("mongoose");

var hiddenFriendSchema = new _mongoose.Schema({
  fromUser: {
    type: _mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'users'
  },
  destinationUser: {
    type: _mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'users'
  },
  createdAt: {
    type: _mongoose.SchemaTypes.Date,
    "default": new Date().getDate(),
    required: true
  }
});
var hiddenFriendModel = (0, _mongoose.model)('hiddenfriend', hiddenFriendSchema);
exports.hiddenFriendModel = hiddenFriendModel;