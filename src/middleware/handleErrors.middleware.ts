import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import { UnauthorizedError } from '../errors/appErrors';
import CustomError from '../errors/CustomError';
export const pagesFolder = path.join(__dirname, '../' + 'pages/');

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.accept.includes('text/html')) {
    handleHtmlError(err, req, res);
  } else {
    handleJsonError(err, req, res);
  }
};

export default errorHandler;

const handleHtmlError = (err: Error, req: Request, res: Response) => {
  err instanceof CustomError
    ? res.sendFile(pagesFolder + '401Page.html')
    : res.sendFile(pagesFolder + '404Page.html');
};

const handleJsonError = (err: Error, req: Request, res: Response) => {
  if (err instanceof CustomError) {
    return res.status(err.errorCode).send(err.convertToResponse());
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ errorMessage: 'Unknown Server Error' });
  }
};
