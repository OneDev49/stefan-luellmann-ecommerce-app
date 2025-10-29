'use client';

import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { isDemoMode } from '@/config/site';

import Link from 'next/link';
import clsx from 'clsx';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import Button from '@/components/ui/Button';
import ArrowRightIcon from '@/components/icons/ui/ArrowRightIcon';
import z from 'zod';

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(30, { message: 'Name can not be longer than 30 characters.' }),
  email: z.email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(32, { message: 'Password can not be longer than 32 characters.' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Confirm Password must be at least 8 characters long.' })
    .max(32, {
      message: 'Confirm Password can not be longer than 32 characters',
    }),
});

export default function RegisterForm() {
  const router = useRouter();
  const cartStore = useCartStore.getState();
  const wishlistStore = useWishlistStore.getState();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'password' || name === 'confirmPassword') {
      if (
        form.confirmPassword &&
        name === 'password' &&
        value !== form.confirmPassword
      ) {
        setError('Passwords do not match.');
      } else if (
        form.password &&
        name === 'confirmPassword' &&
        value !== form.password
      ) {
        setError('Passwords do not match.');
      } else {
        setError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const validation = registerSchema.safeParse(form);
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      // Get localStorage cart/wishlist to sync
      const localCart = cartStore.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const localWishlist = wishlistStore.items.map((item) => item.id);

      // Register with cart/wishlist data
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          cart: localCart,
          wishlist: localWishlist,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong.');
        setIsLoading(false);
        return;
      }

      // Clear localStorage after successful registration
      cartStore._reset();
      wishlistStore._reset();

      // Auto-login after registration
      const loginResult = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (loginResult?.ok) {
        // Redirect to homepage
        router.push('/');
        router.refresh();
      } else {
        setError(
          'Account created, but automatic login failed. Please log in manually.'
        );
        router.push('/login');
      }
    } catch (err: any) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /* CSS ClassNames */
  const transparentCardClassName = clsx(
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-3xl max-w-md m-auto flex flex-col justify-between overflow-hidden'
  );
  const linkHoverClassName = clsx(
    'underline hover:text-[#00ff1e] transition-all'
  );

  if (isDemoMode) {
    return (
      <section className={transparentCardClassName}>
        <div>
          <h1 className='p-8 bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)] text-3xl font-bold'>
            Registration Disabled
          </h1>
        </div>
        <div className='p-8 space-y-4 text-center'>
          <p className='text-lg text-red-500 underline'>
            User Registration is disabled for this public demo.
          </p>
          <p>
            Please use the provided demo account to explore the application's
            features.
          </p>
          <div className='pt-4'>
            <Button
              href={'/login'}
              variant='primary'
              className='justify-center font-bold'
            >
              Go to Login Page
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </section>
    );
  }

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
          onChange={handleChange}
          autoComplete='name'
        />
        <FloatingLabelInput
          id='email'
          name='email'
          type='email'
          label='Email Address'
          required
          onChange={handleChange}
          autoComplete='email'
        />
        <FloatingLabelInput
          id='password'
          name='password'
          type='password'
          label='Password'
          required
          minLength={8}
          onChange={handleChange}
        />
        <FloatingLabelInput
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          required
          minLength={8}
          onChange={handleChange}
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
            disabled={isLoading}
            className='w-full justify-center mt-8'
          >
            {isLoading ? (
              'Creating Account...'
            ) : (
              <>
                Create Account <ArrowRightIcon />
              </>
            )}
          </Button>
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
