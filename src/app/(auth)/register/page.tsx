import RegisterForm from './_components/RegisterForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description:
    'Create a new Entro Account to safe your Shopping Cart, your Wishlist and to get all the benefits from being a Entro Member.',

  openGraph: {
    title: 'Register',
    description:
      'Create a new Entro Account to safe your Shopping Cart, your Wishlist and to get all the benefits from being a Entro Member.',
  },

  twitter: {
    title: 'Register',
    description:
      'Create a new Entro Account to safe your Shopping Cart, your Wishlist and to get all the benefits from being a Entro Member.',
  },
};

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return <RegisterForm />;
}
