import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors/CustomError';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.errorCode).send(err.convertToResponse());
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ errorMessage: 'Unknown Server Error' });
};
export default errorHandler;
