"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createQuery(query) {
    const createQuery = await prisma.query.create({
        data: query,
    });
    console.log(createQuery);
}
