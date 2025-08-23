'use client';

import AnglesRightIcon from '@/components/icons/ui/AnglesRightIcon';
import Button from '@/components/ui/Button';
import { selectTotalItems, useCartStore } from '@/store/cartStore';
import clsx from 'clsx';
import CheckoutCard from './_components/CheckoutCard';
import CheckoutTotal from './_components/CheckoutTotal';

export default function CheckoutPage() {
  /* Zustand Cart Store */
  const cartItems = useCartStore((state) => state.items);
  const totalCartAmount = useCartStore(selectTotalItems);

  /* CSS Classnames */
  const transparentCardClassName = clsx(
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-xl flex flex-col overflow-hidden'
  );
  const headingClassNames = clsx('text-3xl font-bold p-4');
  const headingMobileClassNames = clsx(
    'bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)]'
  );
  const checkoutContentClassName = clsx({
    ['basis-9/12']: totalCartAmount > 0,
    ['grow']: totalCartAmount === 0,
  });

  return (
    <section className='max-w-7xl min-h-screen mx-auto my-6 flex gap-12 items-start'>
      <h1 className='sr-only'>Checkout</h1>
      <div
        className={`${checkoutContentClassName} ${transparentCardClassName}`}
      >
        <h2 className={`${headingClassNames} ${headingMobileClassNames}`}>
          {cartItems.length > 1
            ? `${totalCartAmount} Products`
            : `${totalCartAmount} Product`}{' '}
          in your Cart
        </h2>
        <div className='px-8'>
          {cartItems.length > 0 ? (
            <ul className='list-none m-0'>
              {cartItems.map((item) => (
                <li className='border-b border-[#6c6c6c] last:border-0 pt-6 pb-6'>
                  <CheckoutCard product={item} quantity={item.quantity} />
                </li>
              ))}
            </ul>
          ) : (
            <div className='py-6 flex items-start flex-col space-y-4'>
              <strong className='text-2xl'>Your Cart is currently empty</strong>
              <div>
                <Button href='/search' variant='secondary' position='card'>
                  <>
                    <span>Start Shopping Now!</span>
                    <AnglesRightIcon />
                  </>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {cartItems.length > 0 && (
        <div
          className={`basis-3/12 sticky top-28 space-y-6 ${transparentCardClassName}`}
        >
          <CheckoutTotal />
        </div>
      )}
    </section>
  );
}
