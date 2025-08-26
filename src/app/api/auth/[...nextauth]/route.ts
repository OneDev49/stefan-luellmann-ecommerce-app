import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    /* Email & Password Provider */
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'EMail', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (passwordsMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
