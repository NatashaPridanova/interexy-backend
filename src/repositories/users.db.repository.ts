import { UserDocument, userModel } from '../models/User';
const ENTITY_NAME = 'user';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;
import { HydratedDocument } from 'mongoose';
import { EntityExistsError } from '../errors';

export const save = async (
  user: UserDocument
): Promise<HydratedDocument<UserDocument>> => {
  try {
    return await userModel.create(user);
  } catch (err) {
    if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
      throw new EntityExistsError(`${ENTITY_NAME} with this email exists`);
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
    /*   */
  }

  return user;
};
