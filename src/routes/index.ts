import { Router } from 'express';
import userRoutes from "./user.routes";
import chatRoutes from "./chat.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use('/user', userRoutes);
router.use('/chat', chatRoutes);
router.use('/auth', authRoutes);

export default router;