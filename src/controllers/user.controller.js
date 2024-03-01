"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user.service");
const thread_service_1 = require("../services/thread.service");
const openai_services_1 = require("../services/openai.services");
const encryption_1 = require("../utils/encryption");
class UsersController {
    //create account
    static createUserController = async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await encryption_1.PassowrdProtection.hashPassword(password);
        const user = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        };
        const newUser = await (0, user_service_1.createUser)(user);
        const openaiThread = await (0, openai_services_1.CreateNewThread)();
        const thread = {
            userId: newUser.id,
            threadId: openaiThread.id
        };
        const newThread = await (0, thread_service_1.createThread)(thread);
        res.status(201).json({ user: newUser, thread: newThread });
    };
}
exports.default = UsersController;
