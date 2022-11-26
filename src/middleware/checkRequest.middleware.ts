import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../errors/appErrors';
import {
  body,
  Result,
  validationResult,
  ValidationError as ExpressValidationError,
} from 'express-validator';

export const expressValidatorResultHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: Result<ExpressValidationError> = validationResult(req);
  const errorsArray = errors.array();
  const errorFields = errorsArray.map((error) => error.param);
  const uniqueErrorFields = [...new Set(errorFields)].toString();

  if (!errors.isEmpty()) {
    throw new ValidationError(
      `Invalid request. Invalid fields [${uniqueErrorFields}]`
    );
  }

  return next();
};

export const signinBodyValidationMiddleware = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('password').isString(),
  expressValidatorResultHandler,
];

export const signupBodyValidationMiddleware = [
  body('name').notEmpty(),
  body('name').isString(),
  body('surname').notEmpty(),
  body('surname').isString(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('password').isString(),
  expressValidatorResultHandler,
];
