import { Router } from 'express';
import AuthController from '../controllers/auth/AuthController';
import { registerSchema, loginSchema } from '../controllers/auth/validation';
import ValidationMiddleware from 'middleware/validation';

const router = Router();

router.post('/register', ValidationMiddleware.validate(registerSchema), AuthController.register);

router.post('/login', ValidationMiddleware.validate(loginSchema), AuthController.login);

export default router;
