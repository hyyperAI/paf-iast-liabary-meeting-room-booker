import { z } from 'zod';

export const getRoomsSchema = z.object({
  query: z.object({
    date: z.string().optional(),
  }),
});

export const getRoomAvailabilitySchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Room ID is required'),
  }),
  query: z.object({
    date: z.string().optional(),
  }),
});
