import { Schema, model, SchemaTypes } from 'mongoose';

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

export const hiddenFriendModel = model('hiddenfriend', hiddenFriendSchema)