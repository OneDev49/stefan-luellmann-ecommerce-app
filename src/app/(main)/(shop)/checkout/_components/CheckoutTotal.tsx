'use client';

import { selectCartTotal, useCartStore } from '@/store/cartStore';

import CartIcon from '@/components/icons/ecommerce/CartIcon';
import AnglesRightIcon from '@/components/icons/ui/AnglesRightIcon';
import Button from '@/components/ui/Button';

export default function CheckoutTotal() {
  const totalCartValue = useCartStore(selectCartTotal);

  /* Calculate Tax and TotalAmount with Tax */
  const taxAmount = totalCartValue * 0.19;
  const taxedTotal = totalCartValue + taxAmount;

  return (
    <>
      <h2 className='text-3xl font-bold p-4 bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)]'>
        Checkout
      </h2>
      <div className='px-3 space-y-2'>
        <div className='flex flex-col gap-2 border-b border-white pb-4'>
          <strong className='flex justify-between'>
            <span>Current Subtotal:</span>
            <span className='text-[#2aff00]'>{totalCartValue.toFixed(2)}€</span>
          </strong>
          <strong className='flex justify-between'>
            <span>Tax(19%):</span>
            <span className='text-[#2aff00]'>{taxAmount.toFixed(2)}€</span>
          </strong>
        </div>
        <h3 className='text-xl flex justify-between font-bold'>
          <span>Total Amount:</span>
          <span className='text-[#2aff00]'>{taxedTotal.toFixed(2)}€</span>
        </h3>
      </div>
      <div className='p-3 flex flex-col space-y-2 items-start'>
        <Button href='/' variant='primary' position='card'>
          <>
            <CartIcon />
            <span>Proceed to Payment</span>
          </>
        </Button>
        <Button href='/' variant='secondary' position='card'>
          <>
            <span>Continue Shopping</span>
            <AnglesRightIcon />
          </>
        </Button>
      </div>
    </>
  );
}
