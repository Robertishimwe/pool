import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Thread {
    userId:      string,
    threadId:   string
}

async function createThread(thread: Thread) {
    const createdThread = await prisma.thread.create({
        data: thread,
    });

    console.log(createdThread);
    return createdThread
}

async function getThreads() {
    const threads = await prisma.thread.findMany()
    console.log(threads)
    return threads   
}

async function getThread(user: string) {
    const thread = await prisma.thread.findUnique(
        {
            where: {
                userId: user,
            },
          }
    )
    console.log(thread)
    return thread  
}