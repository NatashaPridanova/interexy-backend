import express, { Request, Response } from 'express';
import { getUser } from '../services/users.service';
import { StatusCodes } from 'http-status-codes';
import { HydratedDocument } from 'mongoose';
import { UserDocument } from '../models/user';
import { isAuthenticatedValidator } from '../middleware/checkAuth.middleware';

const userRoute = express.Router();

userRoute.get(
  '/:id',
  isAuthenticatedValidator,
  async (req: Request, res: Response): Promise<void> => {
    const userEntity: HydratedDocument<UserDocument> = await getUser(
      req.params.id
    );
    res.status(StatusCodes.OK).send(userEntity.toResponse());
  }
);

export default userRoute;
