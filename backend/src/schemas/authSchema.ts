import { z } from 'zod';

export const loginSchema = z.object({
  registrationNo: z.string().min(1, 'Registration number is required'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});

export const registerSchema = z.object({
  registrationNo: z
    .string()
    .min(1, 'Registration number is required')
    .regex(/^[0-9]{4}-[A-Z]{2}-\d{3}$/, 'Invalid registration number format'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+92\d{10}$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email format'),
  semester: z.string().min(1, 'Semester is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const adminLoginSchema = z.object({
  registrationNo: z.string().min(1, 'Registration number is required'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});
