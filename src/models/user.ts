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
      type: String,
      required: [true, 'No name was provided'],
    },
    surname: {
      type: String,
      required: [true, 'No surname was provided'],
    },
    email: {
      type: String,
      required: [true, 'No email was provided'],
      unique: true,
      validate: {
        validator: function(str: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
        },
        message: `Your email should be valid`
      },
    },
    password: {
      type: String,
      required: [true, 'No password was provided'],
      trim: true,
      min: 6,
      validate: {
        validator: function(str: string) {
          return /[a-zA-Z0-9]{6,}/.test(str);
        },
        message: `Your password should contain letters or numbers and have the length of 6 characters`
      },
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

userSchema.pre("save", async function (this: UserDocument) {
  this.password = await bcrypt.hash(this.password, 10);
});

export const userModel = mongoose.model<UserDocument>("User", userSchema);