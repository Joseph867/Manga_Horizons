import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed users
  const users: { id: number; profilename: string; email: string; password: string }[] = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        profilename: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
    users.push(user);
  }
  console.log(`Seeded ${users.length} users.`);
}

main()
  .then(async () => {
    console.log('Seeding completed.');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });