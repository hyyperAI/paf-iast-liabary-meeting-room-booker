import { z } from 'zod';

export const getStudentsSchema = z.object({
  query: z.object({
    search: z.string().optional(),
  }),
});

export const getStudentSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Student ID is required'),
  }),
});

export const getStudentMembersSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Student ID is required'),
  }),
});
