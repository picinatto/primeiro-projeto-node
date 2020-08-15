import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Token JWT Validation

  // Get the token info from the request
  const authHeader = request.headers.authorization;
  // Check if the token exists
  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }
  // If it does exists, it will come as: Bearer tokenHash
  // So we will need to split the Bearer from the token itself
  const [, token] = authHeader.split(' ');
  // Try if the JWT token is valid, otherwise return error
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    // Get the sub (user id) from the payload
    // Needed to use as to force the TS to type as TokenPayLoad
    const { sub } = decoded as ITokenPayload;
    // Add the user id information to the request
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
