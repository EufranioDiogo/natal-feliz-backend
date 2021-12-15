"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hiddenFriendModel = void 0;
var mongoose_1 = require("mongoose");
var hiddenFriendSchema = new mongoose_1.Schema({
    fromUser: {
        type: mongoose_1.SchemaTypes.ObjectId,
        required: true,
        ref: 'user'
    },
    destinationUser: {
        type: mongoose_1.SchemaTypes.ObjectId,
        required: true,
        ref: 'user'
    },
    createdAt: {
        type: mongoose_1.SchemaTypes.Date,
        default: new Date().getDate(),
        required: true
    }
});
exports.hiddenFriendModel = (0, mongoose_1.model)('hiddenfriend', hiddenFriendSchema);
