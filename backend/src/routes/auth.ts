import { Router } from 'express';
import { login, register, adminLogin } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { loginSchema, registerSchema, adminLoginSchema } from '../schemas/authSchema';

const router = Router();

// POST /api/v1/auth/login
router.post('/login', validate(loginSchema), login);

// POST /api/v1/auth/register
router.post('/register', validate(registerSchema), register);

// POST /api/v1/auth/admin/login
router.post('/admin/login', validate(adminLoginSchema), adminLogin);

export default router;
