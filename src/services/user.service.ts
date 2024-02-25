const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Example usage:
async function createUser(email, firstName, lastName, password, role) {
    const user = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            password,
            role
        },

        
    });

    console.log(user)
}

createUser("ishimwe@ishimweee.rw","ishimwe","robert","test@test","USER");
