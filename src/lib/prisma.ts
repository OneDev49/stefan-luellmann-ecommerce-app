import { PrismaClient } from '@prisma/client';

const prismaClientSingelton = () => {
  return new PrismaClient();
};

declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingelton>;
}

const prisma = globalThis.prisma ?? prismaClientSingelton();

export { prisma };

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}
