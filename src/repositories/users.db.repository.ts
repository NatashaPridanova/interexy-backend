import { UserDocument, userModel } from '../models/user';
import { HydratedDocument } from 'mongoose';
import {
  EntityExistsError,
  NotFoundError,
  ValidationError,
} from '../errors/appErrors';

const ENTITY_NAME = 'user';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

export const save = async (
  user: UserDocument
): Promise<HydratedDocument<UserDocument>> => {
  try {
    return await userModel.create(user);
  } catch (err) {
    if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
      throw new EntityExistsError(`${ENTITY_NAME} with this email exists`);
    } else if (err.name === 'ValidationError') {
      throw new ValidationError(err.message);
    } else {
      throw err;
    }
  }
};

export const get = async (
  id: string
): Promise<HydratedDocument<UserDocument>> => {
  const user: HydratedDocument<UserDocument> | null = await userModel.findOne({
    _id: id,
  });
  if (!user) {
    throw new NotFoundError(`${ENTITY_NAME} with this id ${id} wasn't found`);
  }
  return user;
};

export const getByEmail = async (
  email: string
): Promise<HydratedDocument<UserDocument>> => {
  const user: HydratedDocument<UserDocument> | null = await userModel.findOne({
    email,
  });
  if (!user) {
    throw new NotFoundError(`${ENTITY_NAME} with such email wasn't found`);
  }
  return user;
};
