'use client';

import { useState } from 'react';
import CloseIcon from '@/components/icons/ui/CloseIcon';
import CartIcon from '@/components/icons/ecommerce/CartIcon';
import HeartIcon from '@/components/icons/ecommerce/HeartIcon';
import clsx from 'clsx';
import {
  useCartStore,
  selectTotalItems,
  selectCartTotal,
} from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';

interface RightSidenavProps {
  onClose: () => void;
  isClosing: boolean;
  activeTab: 'wishlist' | 'cart';
}

export default function RightSidenav({
  onClose,
  isClosing,
  activeTab,
}: RightSidenavProps) {
  /* Active Tab Management */
  const [currentActiveTab, setCurrentActiveTab] = useState(activeTab);

  /* Zustand Cart Store */
  const cartItems = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalCartValue = useCartStore(selectCartTotal);
  const totalCartAmount = useCartStore(selectTotalItems);

  /* Tab CSS Tailwind Classes */
  const tabClassNames = clsx(
    'flex gap-2 bg-[#075d0c] py-1 px-3 rounded-3xl transition-colors border border-[#0ca816] hover:bg-[#1f702a]'
  );
  const tabAnnouncerClassNames = clsx(
    'p-2 bg-[#2d2d2d] border border-gray-500 shadow-[0_4px_15px_0_rgb(140,140,140,0.25)] rounded-md text-center'
  );

  /* Handle RemovefromCart */
  const handleRemoveFromCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromCart(productId);
    console.log('Added to Cart!');
  };

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[1000] bg-black/60',
        isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
      )}
    >
      <div
        className={clsx(
          'absolute top-0 right-0 h-full w-full max-w-sm bg-[#00210b] shadow-xl flex flex-col',
          isClosing ? 'animate-slideOutToRight' : 'animate-slideInFromRight'
        )}
      >
        <div className='p-4 bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)] space-y-5 border-b border-green-500'>
          <div className='flex items-center justify-between'>
            <h2 className='font-bold text-xl'>
              Your Shopping Cart and Wishlist
            </h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-white'
            >
              <span className='sr-only'>Close panel</span>
              <CloseIcon width={30} height={25} />
            </button>
          </div>

          <nav className='flex gap-4 justify-center'>
            <button
              type='button'
              onClick={() => setCurrentActiveTab('cart')}
              className={clsx(tabClassNames, {
                ['bg-[#0ca816] border-[#075d0c] hover:bg-[#0ca816]']:
                  currentActiveTab === 'cart',
              })}
            >
              <CartIcon width={20} height='100%' />
              <span>Shopping Cart</span>
            </button>
            <button
              type='button'
              onClick={() => setCurrentActiveTab('wishlist')}
              className={clsx(tabClassNames, {
                ['bg-[#0ca816] border-[#075d0c] hover:bg-[#0ca816]']:
                  currentActiveTab === 'wishlist',
              })}
            >
              <HeartIcon width={20} height='100%' />
              <span>Wishlist</span>
            </button>
          </nav>
        </div>

        <div className='relative flex-1 px-4 py-6 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-green-500'>
          {currentActiveTab === 'cart' && (
            <>
              {cartItems.length > 0 ? (
                <div className='space-y-5'>
                  <ul className='list-none m-0 p-0 space-y-3'>
                    {cartItems.map((item) => (
                      <Link
                        key={item.id}
                        href={`/product/${item.slug}`}
                        className='p-2 border border-[#1e9c29] rounded-lg flex gap-2 justify-between bg-[#103d22]'
                        onClick={onClose}
                      >
                        <div className='flex gap-2'>
                          <div className='bg-white min-w-24 h-24 w-24 block rounded-lg overflow-hidden relative'>
                            {item.isOnSale && (
                              <div className='absolute text-sm bg-red-700 h-8 grid place-items-center w-32 top-[8px] right-[-40px] rotate-45 z-50 will-change-transform'>
                                On Sale
                              </div>
                            )}
                            <Image
                              className='object-contain w-full'
                              src={`https://utfs.io/a/5sfnefg5kv/${item.imageUrl}`}
                              height={90}
                              width={90}
                              alt={item.name}
                              draggable='false'
                              decoding='async'
                              loading='lazy'
                            />
                          </div>
                          <div className='flex flex-col gap-1'>
                            <strong className='line-clamp-1 text-lg'>
                              {item.name}
                            </strong>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm'>In Your Cart:</span>
                              <span>{item.quantity}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              {item.isOnSale && item.reducedPrice ? (
                                <>
                                  <span className='text-sm'>Price:</span>
                                  <span className='text-red-500 font-bold'>
                                    {item.reducedPrice.toFixed(2)}€
                                  </span>
                                  <span className='text-xs text-red-500 line-through'>
                                    {item.price.toFixed(2)}€
                                  </span>
                                </>
                              ) : (
                                <span>
                                  Total:{' '}
                                  {(item.price * item.quantity).toFixed(2)}€
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className='min-w-4'>
                          <button
                            onClick={(e) => handleRemoveFromCart(e, item.id)}
                            className='bg-red-500 rounded-sm'
                          >
                            <CloseIcon height={20} width={20} />
                          </button>
                        </div>
                      </Link>
                    ))}
                  </ul>
                  <div className='border-t border-white pt-4 space-y-4'>
                    <div className='space-y-2'>
                      <strong className='text-xl flex justify-between items-center'>
                        <span>Quantity of your Cart: </span>
                        <span className='underline text-2xl'>
                          {totalCartAmount}
                        </span>
                      </strong>
                      <strong className='text-xl flex justify-between items-center'>
                        <span>Your Cart Value: </span>
                        <span className='underline text-2xl'>
                          {totalCartValue.toFixed(2)}€
                        </span>
                      </strong>
                    </div>
                    <div className='ml-auto max-w-fit'>
                      <button
                        onClick={clearCart}
                        className='bg-red-500 rounded-sm text-black px-2 py-1'
                      >
                        Clear Cart
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className={tabAnnouncerClassNames}>
                  Your shopping cart is empty.
                </p>
              )}
            </>
          )}
          {currentActiveTab === 'wishlist' && (
            <div>
              <p className={tabAnnouncerClassNames}>Your wishlist is empty.</p>
            </div>
          )}
        </div>
      </div>
      <div onClick={onClose} className='absolute inset-0 -z-10' />
    </div>
  );
}
