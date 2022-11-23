import { NextFunction, Request, Response } from 'express';
import { getUser } from '../services/users.service';
import { AuthenticationError } from '../errors/appErrors';
import { getClaims } from '../utils/jwtUtils';

export const authValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = getClaims(req);
  if (!id) {
    throw new AuthenticationError('User is not authenticated');
  }
  const user = await getUser(id);
  if (!user) {
    throw new AuthenticationError('No user with such id was found');
  } else {
    return next();
  }
};
