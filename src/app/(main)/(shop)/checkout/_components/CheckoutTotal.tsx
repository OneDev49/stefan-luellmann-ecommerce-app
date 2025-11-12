'use client';

import { selectCartTotal, useCartStore } from '@/store/cartStore';

import CartIcon from '@/components/icons/ecommerce/CartIcon';
import AnglesRightIcon from '@/components/icons/ui/AnglesRightIcon';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CheckoutTotal() {
  const totalCartValue = useCartStore(selectCartTotal);

  /* Calculate Tax and TotalAmount with Tax */
  const taxAmount = totalCartValue * 0.19;
  const taxedTotal = totalCartValue + taxAmount;

  const listItemClassName =
    'flex justify-between gap-2 border-b border-gray-600 border-dashed last:border-0 py-2';

  // Summary Calculations
  const TAX_AMOUNT: number = 0.19;
  const DISCOUNT_AMOUNT: number = 0.1;
  const SHIPPING_COSTS: number = 7.99;
  const SHIPPING_METHOD: string = 'Standard';

  const totalTaxAmount: number =
    (totalCartValue - totalCartValue * DISCOUNT_AMOUNT + SHIPPING_COSTS) *
    TAX_AMOUNT;

  return (
    <>
      <h2 className='text-3xl font-bold p-4 bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)]'>
        Checkout
      </h2>
      <div className='px-3 space-y-2'>
        <ul className='list-none flex flex-col pb-4'>
          <li className={listItemClassName}>
            <span className='font-bold'>Subtotal</span>
            <strong>{totalCartValue.toFixed(2)}€</strong>
          </li>
          {DISCOUNT_AMOUNT > 0 && (
            <li className={listItemClassName}>
              <div className='space-x-2'>
                <span>Discount</span>
                <span className='text-sm text-brightGreen'>
                  ({DISCOUNT_AMOUNT * 100}%)
                </span>
              </div>
              <span>-{(totalCartValue * DISCOUNT_AMOUNT).toFixed(2)}€</span>
            </li>
          )}
          <li className={listItemClassName}>
            <div className='space-x-2'>
              <span>Shipping</span>
              <span className='text-sm text-brightGreen'>
                ({SHIPPING_METHOD})
              </span>
            </div>
            <span>{SHIPPING_COSTS.toFixed(2)}€</span>
          </li>
          <li className={listItemClassName}>
            <div className='space-x-2'>
              <span>Tax</span>
              <span className='text-sm text-brightGreen'>
                ({TAX_AMOUNT * 100}%)
              </span>
            </div>
            <span>{totalTaxAmount.toFixed(2)}€</span>
          </li>
        </ul>
        <hr />
        <h3 className='text-lg flex justify-between font-bold'>
          <span>Total Amount:</span>
          <span className='text-brightGreen'>{taxedTotal.toFixed(2)}€</span>
        </h3>
      </div>
      <div className='p-3 flex justify-between gap-2 flex-row md:flex-col items-start'>
        <Button
          as={Link}
          href='/'
          variant='primary'
          position='standalone'
          className='py-2 px-4 rounded-md md:w-full md:justify-center'
        >
          <>
            <CartIcon />
            <span>Proceed to Payment</span>
          </>
        </Button>
        <Button
          as={Link}
          href='/search'
          variant='secondary'
          position='standalone'
          className='py-2 px-4 rounded-md md:w-full md:justify-center'
        >
          <>
            <span>Continue Shopping</span>
            <AnglesRightIcon />
          </>
        </Button>
      </div>
    </>
  );
}
