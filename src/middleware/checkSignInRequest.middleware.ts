import { NextFunction, Request, Response } from 'express';
import { getUser } from '../services/users.service';
import { AuthenticationError } from '../errors/appErrors';
import { getClaims } from '../utils/jwtUtils';

export const signInRequestValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body;
};
