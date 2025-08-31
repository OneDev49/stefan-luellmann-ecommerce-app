import HeaderLayout from '@/components/layout/Header';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/dashboard');
  }

  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <HeaderLayout variant='simple' />
      <main className='flex-1 flex'>{children}</main>
    </div>
  );
}
