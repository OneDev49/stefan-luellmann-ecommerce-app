import HeaderLayout from '@/components/layout/Header';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

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
