const { Schema, model, SchemaTypes } = require('mongoose');

const hiddenFriendSchema = new Schema(
  {
    fromUser: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'users'
    },
    destinationUser: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'users'
    },
    createdAt: {
      type: SchemaTypes.Date,
      default: new Date().getDate(),
      required: true
    }
  }
);

const hiddenFriendModel = model('hiddenfriend', hiddenFriendSchema)

module.exports = { hiddenFriendModel }