import { Router } from 'express';
import ChatController from '../controllers/chat.controller';
import Verify from '../middleware/verify'

const router = Router();

router.post('/create', Verify, ChatController.messageController);

export default router;