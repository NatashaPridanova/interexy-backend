import CustomError from './CustomError';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

class AppError extends CustomError {
  errorCode = StatusCodes.INTERNAL_SERVER_ERROR;
  errorType = ReasonPhrases.INTERNAL_SERVER_ERROR;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

class NotFoundError extends AppError {
  errorCode = StatusCodes.NOT_FOUND;
  errorType = ReasonPhrases.NOT_FOUND;

  constructor(message: string) {
    super(message);
  }
}

class UnauthorizedError extends AppError {
  errorCode = StatusCodes.UNAUTHORIZED;
  errorType = ReasonPhrases.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
  }
}

class AuthentificationError extends AppError {
  errorCode = StatusCodes.FORBIDDEN;
  errorType = ReasonPhrases.FORBIDDEN;

  constructor(message: string) {
    super(message);
  }
}

class BadRequestError extends AppError {
  errorCode = StatusCodes.BAD_REQUEST;
  errorType = ReasonPhrases.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }
}

class EntityExistsError extends AppError {
  errorCode = StatusCodes.EXPECTATION_FAILED;
  errorType = ReasonPhrases.EXPECTATION_FAILED;

  constructor(message: string) {
    super(message);
  }
}

class ValidationError extends BadRequestError {
  constructor(message: string) {
    super(message);
  }
}

export {
  NotFoundError,
  UnauthorizedError,
  AuthentificationError,
  BadRequestError,
  EntityExistsError,
  ValidationError,
};
