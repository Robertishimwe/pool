"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThread = exports.getThreads = exports.createThread = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createThread(thread) {
    const createdThread = await prisma.thread.create({
        data: thread,
    });
    return createdThread;
}
exports.createThread = createThread;
async function getThreads() {
    const threads = await prisma.thread.findMany();
    console.log(threads);
    return threads;
}
exports.getThreads = getThreads;
async function getThread(user) {
    const thread = await prisma.thread.findUnique({
        where: {
            userId: user,
        },
    });
    console.log(thread);
    return thread;
}
exports.getThread = getThread;
