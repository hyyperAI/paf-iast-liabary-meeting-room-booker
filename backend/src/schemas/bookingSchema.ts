import { z } from 'zod';

export const createBookingSchema = z.object({
  roomId: z.string().min(1, 'Room ID is required'),
  studentId: z.string().optional(),
  registrationNo: z.string().optional(),
  applicantName: z.string().min(2, 'Applicant name is required'),
  applicantPhone: z.string().regex(/^\+92\d{10}$/, 'Invalid phone number format'),
  applicantEmail: z.string().email('Invalid email format'),
  applicantSemester: z.string().min(1, 'Semester is required'),
  groupMemberCount: z.number().min(0).max(4, 'Maximum 4 additional members allowed'),
  members: z
    .array(
      z.object({
        name: z.string().min(2, 'Member name is required'),
        registrationNo: z.string().min(1, 'Member registration number is required'),
      })
    )
    .optional(),
});

export const getBookingsSchema = z.object({
  query: z.object({
    date: z.string().optional(),
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
  }),
});

export const updateBookingSchema = z.object({
  id: z.string().min(1, 'Booking ID is required'),
  requestStatus: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
});

export const deleteBookingSchema = z.object({
  id: z.string().min(1, 'Booking ID is required'),
});
