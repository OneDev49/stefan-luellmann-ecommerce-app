import { DefaultSession, DefaultUser } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
  }

  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}
