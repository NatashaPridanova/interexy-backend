import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface UserDocument extends User, Document {
  toResponse: () => Record<string, unknown>;
}

const userSchema: Schema<UserDocument> = new Schema(
  {
    name: {
      type: 'string',
      required: true,
    },
    surname: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
      trim: true,
    },
  },
  { collection: 'users' }
);

userSchema.methods.toResponse = function (): Record<string, unknown> {
  const { _id, ...rest } = this.toJSON();
  delete rest.password;
  delete rest.__v;
  return { id: _id, ...rest };
};

userSchema.pre('save', async function (this: UserDocument) {
  this.password = await bcrypt.hash(this.password, 10);
});

export const userModel = mongoose.model<UserDocument>('User', userSchema);
