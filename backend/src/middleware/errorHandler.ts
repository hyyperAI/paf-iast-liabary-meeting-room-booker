import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err);

  // Default error
  let statusCode = 500;
  let message = 'Internal server error';
  let errorCode = 500;

  // Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as any;
    if (prismaError.code === 'P2002') {
      statusCode = 400;
      errorCode = 400;
      message = 'Resource already exists';
    } else if (prismaError.code === 'P2025') {
      statusCode = 404;
      errorCode = 404;
      message = 'Resource not found';
    }
  }

  // Custom AppError
  if (err instanceof AppError) {
    // Map custom error codes to HTTP status codes
    const customCode = err.statusCode;
    if (customCode >= 1000 && customCode < 2000) {
      statusCode = 401; // Authentication errors
    } else if (customCode >= 2000 && customCode < 3000) {
      statusCode = 400; // Booking errors
    } else if (customCode >= 3000 && customCode < 4000) {
      statusCode = 400; // Validation errors
    } else if (customCode >= 9000) {
      statusCode = 500; // System errors
    } else {
      statusCode = 400;
    }
    errorCode = customCode;
    message = err.message;
  }

  // Zod validation errors
  if (err.name === 'ZodError') {
    statusCode = 400;
    errorCode = 400;
    message = 'Validation error';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    errorCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    errorCode = 401;
    message = 'Token expired';
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
    },
  });
};
