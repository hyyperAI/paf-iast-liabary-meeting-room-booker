import { Router } from 'express';
import { getQueueStatus } from '../controllers/queueController';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET /api/v1/queue/:roomId/:date/:timeSlot
// router.get('/:roomId/:date/:timeSlot', authenticate, getQueueStatus);
router.get('/:roomId/:date/:timeSlot', getQueueStatus);

export default router;
