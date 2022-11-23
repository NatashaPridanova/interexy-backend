import express, { Request, Response } from 'express';
import { getUser } from '../services/users.service';
import { StatusCodes } from 'http-status-codes';
import { userModel } from '../models/user';
import { HydratedDocument } from 'mongoose';
import { UserDocument } from '../models/user';
import { authValidator } from '../middleware/checkAuth.middleware';

const userRoute = express.Router();

userRoute.get(
  '/',
  authValidator,
  async (req: Request, res: Response): Promise<void> => {
    const users = await userModel.find({});
    res
      .status(StatusCodes.OK)
      .send(users.map((userEntity) => userEntity.toResponse()));
  }
);

userRoute.get(
  '/:id',
  authValidator,
  async (req: Request, res: Response): Promise<void> => {
    const userEntity: HydratedDocument<UserDocument> = await getUser(
      req.params.id
    );
    res.status(StatusCodes.OK).send(userEntity.toResponse());
  }
);

export default userRoute;
