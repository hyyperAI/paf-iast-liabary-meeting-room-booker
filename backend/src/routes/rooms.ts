import { Router } from 'express';
import { getRooms, getRoomById, getRoomAvailability } from '../controllers/roomController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';
import { validate } from '../middleware/validate';
import { getRoomsSchema, getRoomAvailabilitySchema } from '../schemas/roomSchema';

const router = Router();

// GET /api/v1/rooms
// router.get('/', authenticate, validate(getRoomsSchema), getRooms);
router.get('/', validate(getRoomsSchema), getRooms);

// GET /api/v1/rooms/:id
// router.get('/:id', authenticate, getRoomById);
router.get('/:id', getRoomById);

// GET /api/v1/rooms/:id/availability
// router.get('/:id/availability', authenticate, validate(getRoomAvailabilitySchema), getRoomAvailability);
router.get('/:id/availability', validate(getRoomAvailabilitySchema), getRoomAvailability);

export default router;
