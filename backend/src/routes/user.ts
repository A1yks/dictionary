import { Router } from 'express';
import UserController from '../controllers/user/UserController';
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.get('/', verifyToken, UserController.getUser);

export default router;
