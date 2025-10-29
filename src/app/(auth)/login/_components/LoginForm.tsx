'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { isDemoMode } from '@/config/site';

import Link from 'next/link';
import clsx from 'clsx';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import Button from '@/components/ui/Button';
import ArrowRightIcon from '@/components/icons/ui/ArrowRightIcon';
import z from 'zod';

const userLoginSchema = z.object({
  email: z.email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export default function LoginForm() {
  const router = useRouter();

  /* States */
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /* Login Handler */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const validation = userLoginSchema.safeParse({ email, password });
    if (!validation.success) {
      setError('Invalid input data');
      setIsLoading(false);
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push('/dashboard');
    } else {
      setError('Invalid Email or Password. Please try again.');
      setIsLoading(false);
    }
  };

  /* CSS Classnames */
  const transparentCardClassName = clsx(
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-3xl max-w-md m-auto flex flex-col justify-between overflow-hidden'
  );

  return (
    <div className='space-y-4'>
      {isDemoMode && (
        <div className='px-4 py-6 bg-red-800 rounded-3xl max-w-md space-y-2 border border-gray-400 shadow-[0_4px_20px_0_rgb(0,0,0,1)]'>
          <h1 className='text-3xl underline'>Demo Mode is Enabled!</h1>
          <p>
            Entro is running in Demo Mode.
            <br />
            You can log into the Demo Account using:
          </p>
          <div className='flex flex-col'>
            <div className='space-x-2'>
              <span>E-Mail:</span>
              <span className='font-bold'>demoX@stefan-luellmann.com</span>
            </div>
            <div className='space-x-2'>
              <span>Password:</span>
              <span className='font-bold'>test12345</span>
            </div>
          </div>
        </div>
      )}
      <section className={transparentCardClassName}>
        <div>
          {isDemoMode ? (
            <h2 className='p-8 bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)] text-3xl font-bold'>
              Log in to your Account
            </h2>
          ) : (
            <h1 className='p-8 bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)] text-3xl font-bold'>
              Log in to your Account
            </h1>
          )}
        </div>
        <form className='space-y-3 p-8' onSubmit={handleSubmit}>
          {error && (
            <div className='p-3 mb-6 rounded-md bg-red-900/50 border border-red-500 text-red-300 text-sm'>
              {error}
            </div>
          )}
          <FloatingLabelInput
            id='email'
            name='email'
            type='email'
            label='Email Address'
            required
            autoComplete='email'
          />
          <FloatingLabelInput
            id='password'
            name='password'
            type='password'
            label='Password'
            required
            autoComplete='password'
          />
          <div>
            <Button
              as='button'
              type='submit'
              variant='primary'
              disabled={isLoading}
              className='w-full justify-center mt-8'
            >
              {isLoading ? (
                'Logging In...'
              ) : (
                <>
                  Log In <ArrowRightIcon />
                </>
              )}
            </Button>
          </div>
        </form>
        <div className='px-8 text-center py-4 space-y-2'>
          <p>
            Don't have a Account?{' '}
            <Link
              href='/register'
              className='underline hover:text-[#00ff1e] transition-all'
            >
              Register Now!
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
