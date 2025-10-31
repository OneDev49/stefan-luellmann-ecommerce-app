'use client';

import {
  selectCartTotal,
  selectTotalItems,
  useCartStore,
} from '@/store/cartStore';
import { useCart } from '@/hooks/useCart';

import Image from 'next/image';
import Link from 'next/link';
import CartIcon from '@/components/icons/ecommerce/CartIcon';
import ChevronLeftIcon from '@/components/icons/ui/ChevronLeftIcon';
import CloseIcon from '@/components/icons/ui/CloseIcon';
import CartQuantityInput from '@/components/ui/CartQuantityInput';
import Button from '@/components/ui/Button';

export default function DashboardCart() {
  const { items, removeFromCart } = useCart();
  const totalCartValue = useCartStore(selectCartTotal);
  const totalCartAmount = useCartStore(selectTotalItems);

  const handleRemoveFromCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromCart(productId);
  };

  /* Summary Calculations */
  const TAX_AMOUNT: number = 0.19; // 19%
  const DISCOUNT_AMOUNT: number = 0.1; // 0%
  const SHIPPING_COSTS: number = 7.99; // 0€
  const SHIPPING_METHOD: string = 'Standard';

  const totalTaxAmount: number =
    (totalCartValue - totalCartValue * DISCOUNT_AMOUNT + SHIPPING_COSTS) *
    TAX_AMOUNT;

  const totalAmount: number =
    totalCartValue -
    totalCartValue * DISCOUNT_AMOUNT +
    SHIPPING_COSTS +
    totalTaxAmount;

  const listClassName =
    'flex justify-between border-b border-gray-600 border-dashed last:border-0 py-2';

  return (
    <div className='pt-12 pb-32 max-w-5xl space-y-6'>
      {totalCartAmount > 0 && items ? (
        <div className='space-y-20'>
          <div className='max-w-4xl'>
            <div className='grid-cols-[4fr_1fr_2fr_auto] px-4 gap-4 sm:grid hidden'>
              <strong>Product</strong>
              <strong>Qty</strong>
              <strong>Subtotal</strong>
              <div className='w-[25px]'></div>
            </div>
            <ol className='p-0 m-0 list-none border-y border-[#3a3a3a]'>
              {items.map((item, index) => {
                return (
                  <li
                    key={index}
                    className='block space-y-2 sm:space-y-0 px-1 sm:px-4 py-4 items-center hover:bg-green-950 transition-colors select-none border-b border-green-900 last:border-0 '
                  >
                    <Link href={`/product/${item.slug}`} className='sm:hidden'>
                      <h3 className='flex items-center gap-3'>
                        <span className='text-lg font-bold line-clamp-1 group-hover:underline'>
                          {item.name}
                        </span>
                        {item.isOnSale && (
                          <span className='text-red-500 font-bold'>
                            (On Sale)
                          </span>
                        )}
                      </h3>
                    </Link>
                    <div className='grid grid-cols-[4fr_1fr_2fr_auto] gap-4 items-center'>
                      <Link
                        href={`/product/${item.slug}`}
                        className='flex gap-2 sm:gap-4 group flex-col-reverse sm:flex-row'
                      >
                        <div className='max-w-28 h-full rounded-xl overflow-hidden relative'>
                          {item.isOnSale && (
                            <div className='absolute select-none bg-red-700 h-6 grid place-items-center w-40 top-[20px] right-[-40px] rotate-45 z-10 will-change-transform text-sm'>
                              On Sale
                            </div>
                          )}
                          <Image
                            className='object-contain w-full group-hover:scale-105 transition-all'
                            src={`${process.env.NEXT_PUBLIC_UPLOADTHING_URL}/${item.imageUrl}`}
                            height={115}
                            width={115}
                            alt={item.name}
                            draggable='false'
                            loading='eager'
                          />
                        </div>
                        <h3 className='hidden sm:flex items-center gap-3'>
                          <span className='text-lg font-bold line-clamp-1 group-hover:underline'>
                            {item.name}
                          </span>
                        </h3>
                      </Link>
                      <div className='flex items-center gap-1 mr-auto border-2 border-[#00520c] rounded px-2 py-1'>
                        <CartQuantityInput
                          productId={item.id}
                          productName={item.name}
                          quantity={item.quantity}
                        />
                      </div>
                      <div>
                        {item.reducedPrice &&
                        item.isOnSale &&
                        item.reducedPrice !== null ? (
                          <div>
                            <span className='text-sm font-headings line-through font-normal'>
                              {item.price.toFixed(2)}€
                            </span>
                            <div className='flex items-start gap-2 text-[#ff4545] font-bold font-headings'>
                              <strong className='text-xl font-headings'>
                                {item.reducedPrice.toFixed(2)}€
                              </strong>
                            </div>
                          </div>
                        ) : (
                          <div className='flex flex-col gap-2'>
                            <strong className='text-xl font-bold font-headings'>
                              {item.price.toFixed(2)}€
                            </strong>
                          </div>
                        )}
                      </div>
                      <Button
                        as='button'
                        type='button'
                        onClick={(e) => handleRemoveFromCart(e, item.id)}
                        className='bg-red-500 rounded-sm'
                        title={`Remove ${item.name} from your Cart`}
                        variant='danger'
                        position='standalone'
                      >
                        <CloseIcon height={25} width={25} />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className='flex flex-col top-20 max-w-2xl'>
            <h2 className='text-2xl sm:text-3xl font-bold p-4 border border-gray-700 bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)]'>
              Total Cart Summary
            </h2>
            <div className='p-4'>
              <ul className='list-none pt-2 pb-8 px-0 m-0'>
                <li className={listClassName}>
                  <span className='font-bold'>Subtotal</span>
                  <strong>{totalCartValue.toFixed(2)}€</strong>
                </li>
                {DISCOUNT_AMOUNT > 0 && (
                  <li className={listClassName}>
                    <div className='space-x-2'>
                      <span>Discount</span>
                      <span className='text-sm text-brightGreen'>
                        ({DISCOUNT_AMOUNT * 100}%)
                      </span>
                    </div>
                    <span>
                      -{(totalCartValue * DISCOUNT_AMOUNT).toFixed(2)}€
                    </span>
                  </li>
                )}
                <li className={listClassName}>
                  <div className='space-x-2'>
                    <span>Shipping</span>
                    <span className='text-sm text-brightGreen'>
                      ({SHIPPING_METHOD})
                    </span>
                  </div>
                  <span>{SHIPPING_COSTS.toFixed(2)}€</span>
                </li>
                <li className={listClassName}>
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
              <p className='font-bold text-lg flex justify-between py-8'>
                <span>Total Amount:</span>
                <strong className='text-brightGreen'>
                  {totalAmount.toFixed(2)}€
                </strong>
              </p>
              <div className='flex justify-between flex-col-reverse items-start gap-4 sm:flex-row '>
                <Button
                  variant='secondary'
                  href='/search'
                  position='standalone'
                  className='py-2 px-4 rounded-md'
                >
                  <ChevronLeftIcon height={20} />
                  {totalCartAmount > 0
                    ? 'Continue Shopping'
                    : 'Browse our Store'}
                </Button>
                <Button
                  href='/checkout'
                  variant='primary'
                  position='standalone'
                  className='py-2 px-4 rounded-md'
                >
                  <CartIcon height={20} />
                  Continue to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>Your Shopping Cart is empty</div>
          <div className='flex px-4'>
            <Button
              variant='secondary'
              href='/search'
              position='standalone'
              className='py-2 px-4 rounded-md'
            >
              <ChevronLeftIcon height={20} />
              {totalCartAmount > 0 ? 'Continue Shopping' : 'Browse our Store'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
