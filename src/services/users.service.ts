import { UserDocument } from '../models/user';
import { HydratedDocument } from 'mongoose';
import { save, get, getByEmail } from '../repositories/users.db.repository';
import bcrypt from 'bcrypt';
import { AuthenticationError } from '../errors/appErrors';
import jwt from 'jsonwebtoken';

export const saveUser = (
  user: UserDocument
): Promise<HydratedDocument<UserDocument>> => {
  return save(user);
};

export const getUser = (id: string): Promise<HydratedDocument<UserDocument>> =>
  get(id);

export const authenticate = async (user: HydratedDocument<UserDocument>) => {
  const userEntity: HydratedDocument<UserDocument> = await getByEmail(
    user.email
  );

  const isPasswordValid: boolean = await bcrypt.compare(
    user.password,
    userEntity.password
  );

  if (!isPasswordValid) {
    throw new AuthenticationError(`Not valid password`);
  }

  const token = jwt.sign({ id: userEntity._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  return { token, userId: userEntity._id, name: userEntity.name };
};
