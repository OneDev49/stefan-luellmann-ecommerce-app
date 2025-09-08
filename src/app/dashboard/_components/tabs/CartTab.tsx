import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { DashboardUser } from '../DashboardClient';
import {
  selectCartTotal,
  selectTotalItems,
  useCartStore,
} from '@/store/cartStore';

import CartIcon from '@/components/icons/ecommerce/CartIcon';
import ChevronLeftIcon from '@/components/icons/ui/ChevronLeftIcon';
import CloseIcon from '@/components/icons/ui/CloseIcon';
import CartQuantityInput from '@/components/ui/CartQuantityInput';
import Button from '@/components/ui/Button';

interface DashboardCartProps {
  user: DashboardUser;
}

export default function DashboardCart({ user }: DashboardCartProps) {
  /* Zustand Cart Store */
  const cartItems = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
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

  const totalTaxAmount: number =
    (totalCartValue - totalCartValue * DISCOUNT_AMOUNT + SHIPPING_COSTS) *
    TAX_AMOUNT;

  const totalAmount: number =
    totalCartValue -
    totalCartValue * DISCOUNT_AMOUNT +
    SHIPPING_COSTS +
    totalTaxAmount;

  const transparentCardClassName = clsx(
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-2xl'
  );
  const headingClassNames = clsx('text-3xl font-bold p-4');
  const headingMobileClassNames = clsx(
    'bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)]'
  );
  const listClassName = clsx('flex justify-between');

  return (
    <div className='py-12 max-w-5xl w-[95%] space-y-6'>
      {totalCartAmount > 0 && cartItems ? (
        <div className='grid grid-cols-[10fr_4fr] items-start gap-6'>
          <div>
            <div className='grid grid-cols-[4fr_1fr_2fr_auto] px-4 gap-4'>
              <strong>Product</strong>
              <strong>Qty</strong>
              <strong>Subtotal</strong>
              <div className='w-[25px]'></div>
            </div>
            <ol className='p-0 m-0 list-none border-y border-[#3a3a3a]'>
              {cartItems.map((item, index) => {
                return (
                  <li
                    key={index}
                    className='grid grid-cols-[4fr_1fr_2fr_auto] gap-4 px-4 py-4 items-center hover:bg-green-950 transition-colors rounded-md select-none'
                  >
                    <Link
                      href={`/product/${item.slug}`}
                      className='flex gap-4 group'
                    >
                      <div className='max-w-28 h-full rounded-xl overflow-hidden relative'>
                        {item.isOnSale && (
                          <div className='absolute select-none bg-red-700 h-6 grid place-items-center w-40 top-[20px] right-[-40px] rotate-45 z-50 will-change-transform text-sm'>
                            On Sale
                          </div>
                        )}
                        <Image
                          className='object-contain w-full group-hover:scale-105 transition-all'
                          src={`https://utfs.io/a/5sfnefg5kv/${item.imageUrl}`}
                          height={115}
                          width={115}
                          alt={item.name}
                          draggable='false'
                          loading='eager'
                        />
                      </div>
                      <h3 className='flex items-center gap-3'>
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
                  </li>
                );
              })}
            </ol>
          </div>
          <div
            className={`${transparentCardClassName} flex flex-col overflow-hidden sticky top-20`}
          >
            <div className='flex-1 relative overflow-hidden'>
              <h2 className={`${headingClassNames} ${headingMobileClassNames}`}>
                Summary
              </h2>
              <div className='p-4'>
                <ul className='list-none pt-2 pb-8 px-0 m-0 space-y-2'>
                  <li className={listClassName}>
                    <span>Subtotal</span>
                    <strong>{totalCartValue.toFixed(2)}€</strong>
                  </li>
                  {DISCOUNT_AMOUNT > 0 && (
                    <li className={listClassName}>
                      <span>Discount ({DISCOUNT_AMOUNT * 100}%)</span>
                      <strong>
                        -{(totalCartValue * DISCOUNT_AMOUNT).toFixed(2)}€
                      </strong>
                    </li>
                  )}
                  <li className={listClassName}>
                    <span>Shipping (Standard)</span>
                    <strong>{SHIPPING_COSTS.toFixed(2)}€</strong>
                  </li>

                  <li className={listClassName}>
                    <span>Tax</span>
                    <strong>{TAX_AMOUNT * 100}%</strong>
                  </li>
                </ul>
                <hr />
                <p className={`${listClassName} py-8`}>
                  <span>Total Amount:</span>
                  <strong className='text-brightGreen'>
                    {totalAmount.toFixed(2)}€
                  </strong>
                </p>
                <Button
                  href='/checkout'
                  variant='primary'
                  className='justify-center'
                >
                  <CartIcon height={20} />
                  Continue to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Your Shopping Cart is empty</div>
      )}
      <div className='flex'>
        <Button variant='secondary' href='/search'>
          <ChevronLeftIcon height={20} />
          {totalCartAmount > 0 ? 'Continue Shopping' : 'Browse our Store'}
        </Button>
      </div>
    </div>
  );
}
