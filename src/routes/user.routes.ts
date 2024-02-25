import { Router } from 'express';
import UsersController from '../controllers/user.controller';

const router = Router();

router.post('/create', UsersController.createUserController);

export default router;