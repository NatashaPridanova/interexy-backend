import { UserDocument } from '../models/user';
import { HydratedDocument } from 'mongoose';
import { getByEmail } from '../repositories/users.db.repository';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../errors/appErrors';
import jwt from 'jsonwebtoken';

export type Authentication = {
  token: string;
  userId: string;
  name: string;
};

export const authenticate = async (
  user: HydratedDocument<UserDocument>
): Promise<Authentication> => {
  const userEntity: HydratedDocument<UserDocument> = await getByEmail(
    user.email
  );

  const isPasswordValid: boolean = await bcrypt.compare(
    user.password,
    userEntity.password
  );

  if (!isPasswordValid) {
    throw new BadRequestError(`Not valid password`);
  }

  const token = jwt.sign({ id: userEntity._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  return { token, userId: userEntity._id, name: userEntity.name };
};
