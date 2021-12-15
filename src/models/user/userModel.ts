import { Schema, model, SchemaTypes } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: SchemaTypes.String,
      required: true,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
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

export const UserModel = model('user', userSchema)