import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Query {
    userId:      string,
    queryText:   string,
    apiResponse: string
  }

async function createQuery(query: Query) {
    const createQuery = await prisma.query.create({
        data: query,
    });

    console.log(createQuery);
}