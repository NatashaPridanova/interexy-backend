import express, { Request, Response, NextFunction } from 'express';
const userRoute = express.Router();
import { saveUser,getUser } from '../services/users.service';
import { StatusCodes } from 'http-status-codes';
import { userModel } from '../models/User';
import { HydratedDocument } from 'mongoose';
import { UserDocument } from '../models/User';
import { ValidationError } from '../errors';


userRoute.get(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await userModel.find({});
      res
        .status(StatusCodes.OK)
        .send(users.map((userEntity) => userEntity.toResponse()));
    } catch (err) {
      next(err);
    }
  }
);

userRoute.post(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userEntity: HydratedDocument<UserDocument> = await saveUser(
        req.body,
        next
      );
      res.status(StatusCodes.OK).send(userEntity.toResponse());
    } catch (err) {
      console.log(err);
      throw new ValidationError(err.message);
      next(err);
    }
  }
);

userRoute.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userEntity: HydratedDocument<UserDocument> = await getUser(
        req.params.id
      );
      res.status(StatusCodes.OK).send(userEntity.toResponse());
    } catch (error) {
      next(error);
    }
  }
);

export default userRoute;
