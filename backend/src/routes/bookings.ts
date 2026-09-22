import { Router } from 'express';
import {
  getMyBookings,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';
import { validate } from '../middleware/validate';
import {
  createBookingSchema,
  getBookingsSchema,
  updateBookingSchema,
  deleteBookingSchema,
} from '../schemas/bookingSchema';

const router = Router();

// GET /api/v1/bookings/my
// router.get('/my', authenticate, getMyBookings);
router.get('/my', getMyBookings);

// GET /api/v1/bookings (Admin only)
// router.get('/', authenticate, authorize('ADMIN'), validate(getBookingsSchema), getBookings);
// router.get('/', authorize('ADMIN'), validate(getBookingsSchema), getBookings);
router.get('/', validate(getBookingsSchema), getBookings);

// POST /api/v1/bookings
// router.post('/', authenticate, validate(createBookingSchema), createBooking);
router.post('/', validate(createBookingSchema), createBooking);

// PUT /api/v1/bookings/:id
// router.put('/:id', authenticate, validate(updateBookingSchema), updateBooking);
router.put('/:id', validate(updateBookingSchema), updateBooking);

// DELETE /api/v1/bookings/:id
// router.delete('/:id', authenticate, validate(deleteBookingSchema), deleteBooking);
router.delete('/:id', validate(deleteBookingSchema), deleteBooking);

export default router;
