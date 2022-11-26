import express, { Request, Response } from 'express';
import { authenticate, Authentication } from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';
import { saveUser } from '../services/users.service';
import { HydratedDocument } from 'mongoose';
import { UserDocument } from '../models/user';
import {
  signinBodyValidationMiddleware as signinRequestValidator,
  signupBodyValidationMiddleware as signupRequestValidator,
} from '../middleware/checkRequest.middleware';

const authRoute = express.Router();

authRoute.post(
  '/signin',
  ...signinRequestValidator,
  async (req: Request, res: Response) => {
    const auth: Authentication = await authenticate(req.body);
    res.status(StatusCodes.OK).json(auth);
  }
);

authRoute.post(
  '/signup',
  ...signupRequestValidator,
  async (req: Request, res: Response): Promise<void> => {
    const userEntity: HydratedDocument<UserDocument> = await saveUser(req.body);
    res.status(StatusCodes.CREATED).send(userEntity.toResponse());
  }
);

export default authRoute;
