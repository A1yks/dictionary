import { Router } from 'express';
import AuthController from '../controllers/auth/AuthController';
import { registerSchema, loginSchema } from '../controllers/auth/validation';
import validate from '../middleware/validate';

const router = Router();

router.post('/register', validate(registerSchema), AuthController.register);

router.post('/login', validate(loginSchema), AuthController.login);

export default router;
