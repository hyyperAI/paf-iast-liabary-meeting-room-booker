import { Request, Response, NextFunction } from 'express';
import { verifyToken, JWTPayload } from '../utils/jwt';
import { AppError, errorCodes } from '../utils/errors';

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new AppError('Authentication required', errorCodes.TOKEN_MISSING));
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return next(new AppError('Authentication required', errorCodes.TOKEN_MISSING));
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expired', errorCodes.TOKEN_EXPIRED));
    }
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token', errorCodes.INVALID_CREDENTIALS));
    }
    return next(new AppError('Authentication failed', errorCodes.UNAUTHORIZED));
  }
};
