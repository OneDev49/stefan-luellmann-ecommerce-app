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
    <div className='flex flex-col'>
      <HeaderLayout variant='simple' />
      <main className='flex-1 flex overflow-y-auto'>{children}</main>
    </div>
  );
}
