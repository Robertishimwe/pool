"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponse = exports.checkRunStatus = exports.runAssistant = exports.sendMessage = exports.CreateNewThread = exports.createAssistant = void 0;
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const createAssistant = async (name, instructions) => {
    try {
        const assistant = await openai.beta.assistants.create({
            name,
            instructions,
            model: "gpt-3.5-turbo-1106",
        });
        console.log(assistant);
        return assistant;
    }
    catch (error) {
        throw error;
    }
};
exports.createAssistant = createAssistant;
const CreateNewThread = async () => {
    try {
        const thread = await openai.beta.threads.create();
        console.log(thread);
        return thread;
    }
    catch (error) {
        throw error;
    }
};
exports.CreateNewThread = CreateNewThread;
const sendMessage = async (threadId, text) => {
    try {
        const message = await openai.beta.threads.messages.create(threadId, {
            role: "user",
            content: text
        });
        console.log(message);
        return message;
    }
    catch (error) {
        throw error;
    }
};
exports.sendMessage = sendMessage;
const runAssistant = async (threadId, assistantId) => {
    try {
        const run = await openai.beta.threads.runs.create(threadId, {
            assistant_id: assistantId,
            instructions: "Please polite"
        });
        console.log(run);
        return run;
    }
    catch (error) {
        throw error;
    }
};
exports.runAssistant = runAssistant;
const checkRunStatus = async (threadId, runId) => {
    try {
        const run = await openai.beta.threads.runs.retrieve(threadId, runId);
        console.log(run);
        return run;
    }
    catch (error) {
        throw error;
    }
};
exports.checkRunStatus = checkRunStatus;
const getResponse = async (threadId) => {
    try {
        const messages = await openai.beta.threads.messages.list(threadId);
        console.log(messages.body.data[0].content);
        return messages;
    }
    catch (error) {
        throw error;
    }
};
exports.getResponse = getResponse;
