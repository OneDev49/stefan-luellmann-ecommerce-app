import Link from 'next/link';
import clsx from 'clsx';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import Button from '@/components/ui/Button';
import ArrowRightIcon from '@/components/icons/ui/ArrowRightIcon';

export default function LoginPage() {
  // TODO: Add form handling later

  const transparentCardClassName = clsx(
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-3xl max-w-7xl m-auto flex flex-col justify-between overflow-hidden'
  );

  return (
    <section className={transparentCardClassName}>
      <div>
        <h1 className='p-8 bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)] text-3xl font-bold'>
          Log in to your Account
        </h1>
      </div>
      <form className='space-y-3 p-8'>
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
            children={
              <>
                Log In <ArrowRightIcon />
              </>
            }
            className='w-full justify-center mt-8'
          />
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
  );
}
