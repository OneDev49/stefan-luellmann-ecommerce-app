'use client';

import { useCart } from '@/hooks/useCart';
import { selectTotalItems, useCartStore } from '@/store/cartStore';

import AnglesRightIcon from '@/components/icons/ui/AnglesRightIcon';
import Button from '@/components/ui/Button';
import clsx from 'clsx';
import CheckoutCard from './CheckoutCard';
import CheckoutTotal from './CheckoutTotal';

export default function CheckoutContent() {
  const { items } = useCart();
  const totalCartAmount = useCartStore(selectTotalItems);

  const transparentCardClassName =
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-xl flex flex-col overflow-hidden';
  const checkoutContentClassName = clsx({
    ['w-full md:basis-9/12']: totalCartAmount > 0,
    ['grow']: totalCartAmount === 0,
  });

  return (
    <section className='max-w-7xl min-h-screen mx-auto my-6 flex flex-col-reverse md:flex-row gap-4 lg:gap-12 items-start w-[98%] lg:w-[95%]'>
      <h1 className='sr-only'>Checkout</h1>
      <div
        className={`${checkoutContentClassName} ${transparentCardClassName}`}
      >
        <h2 className='text-3xl font-bold p-4 bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)]'>
          {items.length > 1
            ? `${totalCartAmount} Products`
            : `${totalCartAmount} Product`}{' '}
          in your Cart
        </h2>
        <div className='px-2 lg:px-8'>
          {items.length > 0 ? (
            <ul className='list-none m-0'>
              {items.map((item) => (
                <li
                  key={item.id}
                  className='border-b border-[#6c6c6c] last:border-0 py-3 lg:py-6'
                >
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
      {items.length > 0 && (
        <div
          className={`w-full md:basis-[300px] lg:basis-[320px] md:sticky md:top-28 space-y-6 ${transparentCardClassName}`}
        >
          <CheckoutTotal />
        </div>
      )}
    </section>
  );
}
