import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

interface User {
  email: string;
  password: string;
}

async function createUser(user: User){
  const createdUser = await prisma.user.create({
    data: user,
  });

  console.log(createdUser);
  return createdUser
}





// createUser({
//   email: "ishimwe@ishimweeee.rw",
//   firstName: "ishimwe",
//   lastName: "robert",
//   password: "test@test",
//   role: "USER",
// });

export { createUser }