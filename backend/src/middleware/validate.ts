import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError, errorCodes } from '../utils/errors';

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // The shape key exists at runtime on object schemas but is not exposed
      // on the ZodType type in newer zod versions, so cast to access it.
      const shape = (schema as any).shape as
        | { body?: ZodSchema; query?: ZodSchema; params?: ZodSchema }
        | undefined;

      if (shape?.body || shape?.query || shape?.params) {
        if (shape.body) req.body = shape.body.parse(req.body);
        if (shape.query) req.query = shape.query.parse(req.query);
        if (shape.params) req.params = shape.params.parse(req.params);
      } else {
        // Handle flat schemas for body validation
        req.body = schema.parse(req.body);
      }
      next();
    } catch (error) {
      const zodError = error as any;
      const errorMessage = zodError.errors?.[0]?.message || 'Validation error';
      return next(new AppError(errorMessage, errorCodes.INVALID_INPUT));
    }
  };
