import { AppError, errorCodes } from './errors';
import {
  isWorkingDay,
  isDateInNext3WorkingDays,
  isDateInPast,
} from './dateHelpers';

export const validateBookingDate = (date: Date): void => {
  if (isDateInPast(date)) {
    throw new AppError('Cannot book for past dates', errorCodes.INVALID_DATE);
  }

  if (!isWorkingDay(date)) {
    throw new AppError('Booking not allowed on weekends', errorCodes.WEEKEND_BOOKING_NOT_ALLOWED);
  }

  if (!isDateInNext3WorkingDays(date)) {
    throw new AppError('Can only book for next 3 working days', errorCodes.INVALID_DATE);
  }
};

export const validateRegistrationNo = (regNo: string): boolean => {
  const regex = /^[0-9]{4}-[A-Z]{2}-\d{3}$/;
  return regex.test(regNo);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const regex = /^\+92\d{10}$/;
  return regex.test(phone);
};

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const calculateQueueDisplay = (totalQueueMembers: number, maxQueue: number = 5): number => {
  return Math.ceil((totalQueueMembers - 1) / maxQueue);
};
