import { UserDocument } from '../models/User';
import { HydratedDocument } from 'mongoose';
import { save, get } from '../repositories/users.db.repository';

export const saveUser = (
  user: UserDocument,
  next
): Promise<HydratedDocument<UserDocument>> => {
  try {
    return save(user);
  } catch (err) {
    if (err) next(err);
  }
};

export const getUser = (id: string): Promise<HydratedDocument<UserDocument>> =>
  get(id);
