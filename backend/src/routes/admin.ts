import { Router } from 'express';
import { approveBooking, rejectBooking } from '../controllers/adminController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';

const router = Router();

// PUT /api/v1/admin/bookings/:id/approve (Admin only)
// router.put('/bookings/:id/approve', authenticate, authorize('ADMIN'), approveBooking);
// router.put('/bookings/:id/approve', authorize('ADMIN'), approveBooking);
router.put('/bookings/:id/approve', approveBooking);

// PUT /api/v1/admin/bookings/:id/reject (Admin only)
// router.put('/bookings/:id/reject', authenticate, authorize('ADMIN'), rejectBooking);
// router.put('/bookings/:id/reject', authorize('ADMIN'), rejectBooking);
router.put('/bookings/:id/reject', rejectBooking);

export default router;
