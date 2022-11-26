import { NextFunction, Request, Response } from 'express';
import { getUser } from '../services/users.service';
import { UnauthorizedError } from '../errors/appErrors';
import { getClaims } from '../utils/jwtUtils';

export const isAuthenticatedValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = getUserIdFromToken(req);

  const user = await getUser(userId);
  if (!user) {
    throw new UnauthorizedError('No user found');
  }

  return next();
};

function getUserIdFromToken(req: Request): string {
  try {
    return getClaims(req).id;
  } catch (err) {
    throw new UnauthorizedError('Token is not valid');
  }
}
