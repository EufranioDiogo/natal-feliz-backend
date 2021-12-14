import { Schema, model, SchemaTypes } from 'mongoose';

const userSchema = new Schema(
  {
    fromUser: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'user'
    },
    destinationUser: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'user'
    },
    createdAt: {
      type: SchemaTypes.Date,
      default: new Date().getDate(),
      required: true
    }
  }
);

export const userModel = model('user', userSchema)