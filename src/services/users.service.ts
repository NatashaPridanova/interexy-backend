import { UserDocument } from '../models/user';
import { HydratedDocument } from 'mongoose';
import { save, get } from '../repositories/users.db.repository';

export const saveUser = (
  user: UserDocument
): Promise<HydratedDocument<UserDocument>> => {
  return save(user);
};

export const getUser = (id: string): Promise<HydratedDocument<UserDocument>> =>
  get(id);
