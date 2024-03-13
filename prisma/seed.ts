import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.upsert({
    where: {
      email: 'admin@email.com',
    },
    update: {},
    create: {
      email: 'admin@email.com',
      password: 'admin',
      permissions: [
        'READ_USERS',
        'CREATE_USERS',
        'UPDATE_USERS',
        'DELETE_USERS',
        'READ_TASKS',
        'CREATE_TASKS',
        'UPDATE_TASKS',
        'DELETE_TASKS',
      ],
    },
  });

  console.log({ adminUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
