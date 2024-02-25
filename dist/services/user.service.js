"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createUser(user) {
    const createdUser = await prisma.user.create({
        data: user,
    });
    console.log(createdUser);
}
exports.createUser = createUser;
createUser({
    email: "ishimwe@ishimweeee.rw",
    firstName: "ishimwe",
    lastName: "robert",
    password: "test@test",
    role: "USER",
});
