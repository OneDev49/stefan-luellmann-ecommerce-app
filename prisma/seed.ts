import { PrismaClient } from '@prisma/client';
import { categories, products as productsData } from './seed-data';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting the seeding process...');

  // Create or update demo user in DB
  const demoEmail = process.env.DEMO_USER_EMAIL;
  const demoPassword = process.env.DEMO_USER_PASSWORD;
  const demoName = process.env.DEMO_USER_NAME;

  if (!demoEmail || !demoPassword || !demoName) {
    throw new Error(
      'Missing demo user credentials in your .env file.\nPlease define DEMO_USER_EMAIL, DEMO_USER_PASSWORD and DEMO_USER_NAME.'
    );
  }

  const costFactor = parseInt(process.env.HASHING_COST_FACTOR || '12');
  if (!process.env.HASH_COST_FACTOR)
    console.log(
      'No Hash Cost Factor set up in your .env file.\nSet it up to increase security.'
    );
  const hashedPassword = await bcrypt.hash(demoPassword, costFactor);

  await prisma.user.upsert({
    where: { email: demoEmail },
    update: {
      name: demoName,
      hashedPassword: hashedPassword,
    },
    create: {
      email: demoEmail,
      name: demoName,
      hashedPassword: hashedPassword,
    },
  });
  console.log('Demo User created successfully.');

  // Clear complete Product and Category Data from DB
  await prisma.$transaction([
    prisma.cartItem.deleteMany(),
    prisma.wishlistItem.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);
  console.log('Cleared existing product and category data.');

  // Seed Categories in DB
  await prisma.category.createMany({
    data: categories,
  });
  console.log(`Seeded ${categories.length} categories.`);

  // Seed Products in DB
  for (const product of productsData) {
    const { categorySlugs, ...productFields } = product;
    await prisma.product.create({
      data: {
        ...productFields,
        categories: {
          connect: categorySlugs.map((slug) => ({ slug })),
        },
      },
    });
  }
  console.log(`Seeded ${productsData.length} products.`);

  console.log('Seeding process finished successfully.');
}

main()
  .catch(async (e) => {
    console.error('An error occured during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
