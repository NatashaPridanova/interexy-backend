import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UnauthorizedError, AuthenticationError } from '../errors';

interface JWTPayload {
  id: string;
  iat: number;
  exp: number;
}

export function getClaims(req: Request): JWTPayload {
  const rawToken = req.headers.authorization;

  if (!rawToken) {
    throw new UnauthorizedError('User is not authorized');
  }

  try {
    const token = rawToken.slice(7, rawToken.length);
    const secret = process.env.JWT_SECRET_KEY;
    return jwt.verify(token, secret) as JWTPayload;
  } catch (error) {
    throw new AuthenticationError(
      `Error while decoding authentification token`
    );
  }
}
