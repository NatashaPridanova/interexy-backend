import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { InvalidJwtError } from '../errors/appErrors';

export interface JwtClaims {
  id: string;
  iat: number;
  exp: number;
}

export function getClaims(req: Request): JwtClaims {
  const rawToken = req.headers.authorization;

  if (!rawToken) {
    throw new InvalidJwtError('JWT is not provided');
  }

  try {
    const token = rawToken.slice(7, rawToken.length);
    const secret = process.env.JWT_SECRET_KEY;
    return jwt.verify(token, secret) as JwtClaims;
  } catch (error) {
    throw new InvalidJwtError(`Invalid JWT`);
  }
}
