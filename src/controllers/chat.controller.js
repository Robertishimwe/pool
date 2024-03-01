"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_services_1 = require("../services/openai.services");
const thread_service_1 = require("../services/thread.service");
class ChatController {
    static messageController = async (req, res, next) => {
        try {
            const { text } = req.body;
            const { user } = req;
            if (!user) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            // Get thread id
            const thread = await (0, thread_service_1.getThread)(user.id.toString());
            if (!thread) {
                // Handle the case where thread is null
                return res.status(404).json({ error: 'Thread not found' });
            }
            // Send message
            const message = await (0, openai_services_1.sendMessage)(thread?.threadId, text);
            // Run assistant only if sendMessage was successful
            const run = await (0, openai_services_1.runAssistant)(message.thread_id, "asst_N1EMmkfBXQXWzQpyQx9E2oFL");
            // Check run status with retries
            let status;
            for (let i = 0; i < 7; i++) {
                status = await (0, openai_services_1.checkRunStatus)(run.thread_id, run.id);
                if (status.status === "completed") {
                    break; // Exit the loop if completed
                }
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
            }
            // Get response only if checkRunStatus was successful (status = "completed")
            if (status.status === "completed") {
                const result = await (0, openai_services_1.getResponse)(status.thread_id);
                res.status(200).json({ result: result.body.data[0].content });
            }
            else {
                res.status(500).json({ error: "Assistant run did not complete" });
            }
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    };
}
exports.default = ChatController;
