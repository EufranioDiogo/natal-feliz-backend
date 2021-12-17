const { Schema, model, SchemaTypes } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: SchemaTypes.String,
      required: true,
      unique: true
    },
    password: {
      type: SchemaTypes.String,
      required: true
    },
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
  }
);

const UserModel = model('users', userSchema)

module.exports = { UserModel }
/*

    
*/