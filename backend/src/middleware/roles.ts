import { Request, Response, NextFunction } from 'express';
import { AppError, errorCodes } from '../utils/errors';

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Skip authorization if req.user is not set (testing mode)
    if (!req.user) {
      return next(new AppError('Authentication required', errorCodes.UNAUTHORIZED));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('Access denied. Insufficient permissions', errorCodes.ACCESS_DENIED)
      );
    }

    next();
  };
};
