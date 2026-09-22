export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorCodes = {
  // Authentication errors (1000-1999)
  INVALID_CREDENTIALS: 1001,
  TOKEN_EXPIRED: 1002,
  TOKEN_MISSING: 1003,
  UNAUTHORIZED: 1004,
  ACCESS_DENIED: 1005,

  // Booking errors (2000-2999)
  ROOM_NOT_AVAILABLE: 2001,
  QUEUE_FULL: 2002,
  ALREADY_BOOKED_TODAY: 2003,
  INVALID_TIME_SLOT: 2004,
  WEEKEND_BOOKING_NOT_ALLOWED: 2005,
  BOOKING_NOT_FOUND: 2006,
  CANNOT_CANCEL_BOOKING: 2007,

  // Validation errors (3000-3999)
  INVALID_INPUT: 3001,
  MISSING_REQUIRED_FIELD: 3002,
  INVALID_DATE: 3003,
  INVALID_REGISTRATION_NO: 3004,
  INVALID_PHONE: 3005,
  INVALID_EMAIL: 3006,

  // System errors (9000-9999)
  DATABASE_ERROR: 9001,
  INTERNAL_ERROR: 9002,
  SERVICE_UNAVAILABLE: 9003,
};

export const createError = (code: number, message: string) => {
  return new AppError(message, code);
};
