"use strict";
// import { PrismaClient, Role } from '@prisma/client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUsers = exports.findUniqueUser = exports.createUser = void 0;
// const prisma = new PrismaClient();
// interface User {
//   email: string;
//   firstName: string;
//   lastName: string;
//   password: string;
//   role?: Role | null;
// }
// async function createUser(user: User){
//   const createdUser = await prisma.user.create({
//     data: user,
//   });
//   console.log(createdUser);
//   return createdUser
// }
// export { createUser }
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createUser(user) {
    const createdUser = await prisma.user.create({
        data: user,
    });
    console.log(createdUser);
    return createdUser;
}
exports.createUser = createUser;
async function findUniqueUser(where) {
    const user = await prisma.user.findUnique({
        where,
    });
    return user;
}
exports.findUniqueUser = findUniqueUser;
async function findUsers(params) {
    const users = await prisma.user.findMany({
        ...params,
    });
    return users;
}
exports.findUsers = findUsers;
