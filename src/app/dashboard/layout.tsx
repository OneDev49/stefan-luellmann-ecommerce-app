import HeaderLayout from '@/components/layout/Header';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Dashboard',
  description:
    'Your personal Entro User Dashboard for your Account. Manage all your settings, your orders, your Cart and your Wishlist comfortable from your own Dashboard.',

  openGraph: {
    title: 'User Dashboard',
    description:
      'Your personal Entro User Dashboard for your Account. Manage all your settings, your orders, your Cart and your Wishlist comfortable from your own Dashboard.',
  },

  twitter: {
    title: 'User Dashboard',
    description:
      'Your personal Entro User Dashboard for your Account. Manage all your settings, your orders, your Cart and your Wishlist comfortable from your own Dashboard.',
  },

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

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
