import { PrismaClient } from '@prisma/client';
import { categories, products as productsData } from './seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting the seeding process...');

  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  console.log('Cleared existing Data');

  await prisma.category.createMany({
    data: categories,
  });
  console.log(`Seeded ${categories.length} categories.`);

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

  console.log('Seeding finished successfully.');
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
