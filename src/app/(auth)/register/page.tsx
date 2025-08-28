'use client';

import Link from 'next/link';
import clsx from 'clsx';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import Button from '@/components/ui/Button';
import ArrowRightIcon from '@/components/icons/ui/ArrowRightIcon';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /* Manage Password and ConfirmPassword Validation */
  const validatePasswords = (pass: string, confirmPass: string) => {
    if (confirmPass && pass !== confirmPass) {
      setError('Passwords do not match.');
    } else {
      setError(null);
    }
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePasswords(newPassword, confirmPassword);
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePasswords(password, newConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong.');
        setIsLoading(false);
        return;
      }

      const loginResult = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (loginResult?.ok) {
        router.replace('/dashboard');
      } else {
        setError(
          'Account created, but automatic login failed. Please go to the login page.'
        );
        setIsLoading(false);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  /* CSS ClassNames */
  const transparentCardClassName = clsx(
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-3xl max-w-7xl m-auto flex flex-col justify-between overflow-hidden'
  );
  const linkHoverClassName = clsx(
    'underline hover:text-[#00ff1e] transition-all'
  );

  return (
    <section className={transparentCardClassName}>
      <div>
        <h1 className='p-8 bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)] text-3xl font-bold'>
          Create Your Account
        </h1>
      </div>
      <form className='space-y-3 p-8' onSubmit={handleSubmit}>
        <FloatingLabelInput
          id='name'
          name='name'
          type='text'
          label='Full Name'
          required
          autoComplete='name'
        />
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
          minLength={8}
          onChange={handlePasswordChange}
        />
        <FloatingLabelInput
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          required
          minLength={8}
          onChange={handleConfirmPasswordChange}
        />
        {error && <p className='text-sm text-red-500'>{error}</p>}
        <div className='flex items-center gap-2'>
          <input
            id='terms'
            name='terms'
            type='checkbox'
            required
            className='h-4 w-4 rounded border-gray-600 bg-gray-800 text-[#00ff1e] focus:ring-[#00ff1e]'
          />
          <label htmlFor='terms'>
            I agree to the{' '}
            <Link className={linkHoverClassName} href='/impressum'>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link className={linkHoverClassName} href='/datenschutz'>
              Privacy Policy
            </Link>
          </label>
        </div>
        <div>
          <Button
            as='button'
            type='submit'
            variant='primary'
            children={
              <>
                Create Account <ArrowRightIcon />
              </>
            }
            className='w-full justify-center mt-8'
          />
        </div>
      </form>
      <div className='px-8 text-center py-4 space-y-2'>
        <p>
          Already have an Account?{' '}
          <Link href='/login' className={linkHoverClassName}>
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
}
