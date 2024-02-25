import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Thread {
    userId:      string,
    threadId:   string
  }

async function createQuery(thread: Thread) {
    const createdThread = await prisma.thread.create({
        data: thread,
    });

    console.log(createdThread);
}