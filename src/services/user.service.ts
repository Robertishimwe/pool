// import { PrismaClient, Role } from '@prisma/client';

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




import { PrismaClient, Role, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: Role | null;
}

async function createUser(user: User){
  const createdUser = await prisma.user.create({
    data: user,
  });

  console.log(createdUser);
  return createdUser
}

async function findUniqueUser(where: Prisma.UserWhereUniqueInput) {
  const user = await prisma.user.findUnique({
    where,
  });

  return user;
}

async function findUsers(params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}) {
  const users = await prisma.user.findMany({
    ...params,
  });

  return users;
}

export { createUser, findUniqueUser, findUsers };
