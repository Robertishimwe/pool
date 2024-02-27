import { Response, NextFunction } from 'express';
import { Request as ExpressRequest } from 'express';
import { Role } from '@prisma/client';
import {
  sendMessage,
  runAssistant,
  checkRunStatus,
  getResponse,
} from '../services/openai.services';

import { getThread } from '../services/thread.service';

interface Chat {
  text: string;
}

interface User {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role | null;
}

interface CustomRequest extends ExpressRequest {
  user?: User;
}

class ChatController {
  static messageController = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { text }: Chat = req.body as unknown as Chat;
      const { user } = req;

      if (!user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
      // Get thread id
      const thread = await getThread(user.id.toString());

      if (!thread) {
        // Handle the case where thread is null
        return res.status(404).json({ error: 'Thread not found' });
      }

      // Send message
      const message = await sendMessage(thread?.threadId, text);

      // Run assistant only if sendMessage was successful
      const run = await runAssistant(message.thread_id, "asst_N1EMmkfBXQXWzQpyQx9E2oFL");

      // Check run status with retries
      let status;
      for (let i = 0; i < 7; i++) {
        status = await checkRunStatus(run.thread_id, run.id);
        if (status.status === "completed") {
          break; // Exit the loop if completed
        }
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
      }

      // Get response only if checkRunStatus was successful (status = "completed")
      if (status.status === "completed") {
        const result = await getResponse(status.thread_id);
        res.status(200).json({ result: result.body.data[0].content });
      } else {
        res.status(500).json({ error: "Assistant run did not complete" });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export default ChatController;
