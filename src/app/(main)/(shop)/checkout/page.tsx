'use client';

import CartIcon from '@/components/icons/ecommerce/CartIcon';
import AnglesRightIcon from '@/components/icons/ui/AnglesRightIcon';
import CloseIcon from '@/components/icons/ui/CloseIcon';
import Button from '@/components/ui/Button';
import {
  selectCartTotal,
  selectTotalItems,
  useCartStore,
} from '@/store/cartStore';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  /* Zustand Cart Store */
  const cartItems = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalCartValue = useCartStore(selectCartTotal);
  const totalCartAmount = useCartStore(selectTotalItems);

  /* Calculate Tax and TotalAmount with Tax */
  const taxAmount = totalCartValue * 0.19;
  const taxedTotal = totalCartValue + taxAmount;

  /* Handlers */
  const handleRemoveFromCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromCart(productId);
  };

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
                  <Link
                    href={`/product/${item.slug}`}
                    className='flex gap-4 group'
                  >
                    <div className='max-w-48 rounded-xl overflow-hidden relative'>
                      {item.isOnSale && (
                        <div className='absolute select-none bg-red-700 h-6 grid place-items-center w-40 top-[20px] right-[-40px] rotate-45 z-50 will-change-transform text-sm'>
                          On Sale
                        </div>
                      )}
                      <Image
                        className='object-contain lg:w-full group-hover:scale-105 transition-all'
                        src={`https://utfs.io/a/5sfnefg5kv/${item.imageUrl}`}
                        height={200}
                        width={200}
                        alt={item.name}
                        draggable='false'
                        loading='eager'
                      />
                    </div>
                    <div className='w-full space-y-4'>
                      <div className='flex justify-between items-center'>
                        <h3 className='flex items-center gap-3'>
                          <span className='text-2xl font-bold'>
                            {item.name}
                          </span>
                          <span className='text-sm text-[#2aff00]'>
                            ({item.quantity} in your Cart)
                          </span>
                        </h3>
                        <button
                          onClick={(e) => handleRemoveFromCart(e, item.id)}
                          className='bg-red-500 rounded-sm'
                          title={`Remove ${item.name} from your Cart`}
                        >
                          <CloseIcon height={25} width={25} />
                        </button>
                      </div>
                      <div>
                        {item.reducedPrice &&
                        item.isOnSale &&
                        item.reducedPrice !== null ? (
                          <div className=''>
                            <span className='text-xl font-headings line-through font-normal'>
                              {item.price}€
                            </span>
                            <div className='flex items-start gap-2 text-[#ff4545] font-bold font-headings'>
                              <strong className='text-2xl'>
                                {item.reducedPrice}€*
                              </strong>
                              <span>
                                (
                                {(
                                  (item.reducedPrice / item.price - 1) *
                                  100
                                ).toFixed(0)}
                                % Off)
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm'>
                                * +19% VAT and Delivery Costs
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className='flex flex-col gap-2'>
                            <strong className='text-2xl font-bold'>
                              {item.price}€*
                            </strong>
                            <span className='text-sm'>
                              * +19% VAT and Delivery Costs
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
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
          <h2 className={`${headingClassNames} ${headingMobileClassNames}`}>
            Checkout
          </h2>
          <div className='px-3 space-y-2'>
            <div className='flex flex-col gap-2 border-b border-white pb-4'>
              <strong className='flex justify-between'>
                <span>Current Subtotal:</span>
                <span className='text-[#2aff00]'>
                  {totalCartValue.toFixed(2)}€
                </span>
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
        </div>
      )}
    </section>
  );
}
