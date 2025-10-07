import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LoginForm from './_components/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description:
    'Log into your Entro Account to manage all your Orders, safe your Shopping Cart, safe your Wishlist, manage your account and so much more.',

  openGraph: {
    title: 'Login',
    description:
      'Log into your Entro Account to manage all your Orders, safe your Shopping Cart, safe your Wishlist, manage your account and so much more.',
  },

  twitter: {
    title: 'Login',
    description:
      'Log into your Entro Account to manage all your Orders, safe your Shopping Cart, safe your Wishlist, manage your account and so much more.',
  },
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return <LoginForm />;
}
