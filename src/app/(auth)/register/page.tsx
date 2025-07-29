'use client';

import Link from 'next/link';
import clsx from 'clsx';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import Button from '@/components/ui/Button';
import ArrowRightIcon from '@/components/icons/ui/ArrowRightIcon';
import { useState } from 'react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (password !== newConfirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // TODO: Add API Route
    console.log('Success!');
  };

  const transparentCardClassName = clsx(
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-3xl max-w-7xl m-auto flex flex-col justify-between overflow-hidden'
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
          onChange={(e) => setPassword(e.target.value)}
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
            I agree to the <Link href='/impressum'>Terms of Service</Link> and{' '}
            <Link href='/datenschutz'>Privacy Policy</Link>
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
          <Link
            href='/login'
            className='underline hover:text-[#00ff1e] transition-all'
          >
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
}
