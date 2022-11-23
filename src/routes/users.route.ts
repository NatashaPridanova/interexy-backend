import express, { Request, Response } from 'express';
const userRoute = express.Router();
import { getUser } from '../services/users.service';
import { StatusCodes } from 'http-status-codes';
import { userModel } from '../models/User';
import { HydratedDocument } from 'mongoose';
import { UserDocument } from '../models/User';
import { AuthValidator } from '../middleware/AuthValidator';

userRoute.get(
  '/',
  AuthValidator,
  async (req: Request, res: Response): Promise<void> => {
    const users = await userModel.find({});
    res
      .status(StatusCodes.OK)
      .send(users.map((userEntity) => userEntity.toResponse()));
  }
);

userRoute.get(
  '/:id',
  AuthValidator,
  async (req: Request, res: Response): Promise<void> => {
    const userEntity: HydratedDocument<UserDocument> = await getUser(
      req.params.id
    );
    res.status(StatusCodes.OK).send(userEntity.toResponse());
  }
);

export default userRoute;
