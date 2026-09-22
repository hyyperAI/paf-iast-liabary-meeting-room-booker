import { Router } from 'express';
import { getStudents, getStudentById, getStudentMembers } from '../controllers/studentController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';
import { validate } from '../middleware/validate';
import { getStudentsSchema, getStudentSchema, getStudentMembersSchema } from '../schemas/studentSchema';

const router = Router();

// GET /api/v1/students (Admin only)
// router.get('/', authenticate, authorize('ADMIN'), validate(getStudentsSchema), getStudents);
// router.get('/', authorize('ADMIN'), validate(getStudentsSchema), getStudents);
router.get('/', validate(getStudentsSchema), getStudents);

// GET /api/v1/students/:id (Admin only)
// router.get('/:id', authenticate, authorize('ADMIN'), validate(getStudentSchema), getStudentById);
// router.get('/:id', authorize('ADMIN'), validate(getStudentSchema), getStudentById);
router.get('/:id', validate(getStudentSchema), getStudentById);

// GET /api/v1/students/:id/members (Admin only)
// router.get('/:id/members', authenticate, authorize('ADMIN'), validate(getStudentMembersSchema), getStudentMembers);
// router.get('/:id/members', authorize('ADMIN'), validate(getStudentMembersSchema), getStudentMembers);
router.get('/:id/members', validate(getStudentMembersSchema), getStudentMembers);

export default router;
