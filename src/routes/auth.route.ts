import express, { Request, Response } from 'express';
import { authenticate } from '../services/users.service';
import { StatusCodes } from 'http-status-codes';
import { saveUser } from '../services/users.service';
import { HydratedDocument } from 'mongoose';
import { UserDocument } from '../models/user';

const authRoute = express.Router();

authRoute.post('/signin', async (req: Request, res: Response) => {
  const auth = await authenticate(req.body);

  res.status(StatusCodes.OK).json({
    message: 'Authenticated',
    ...auth,
  });
});

authRoute.post(
  '/signup',
  async (req: Request, res: Response): Promise<void> => {
    const userEntity: HydratedDocument<UserDocument> = await saveUser(req.body);
    res.status(StatusCodes.CREATED).send(userEntity.toResponse());
  }
);

export default authRoute;
