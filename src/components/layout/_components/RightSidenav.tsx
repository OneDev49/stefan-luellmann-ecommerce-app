'use client';

import { useState } from 'react';
import CloseIcon from '@/components/icons/ui/CloseIcon';
import CartIcon from '@/components/icons/ecommerce/CartIcon';
import HeartIcon from '@/components/icons/ecommerce/HeartIcon';
import clsx from 'clsx';

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
  const [currentActiveTab, setCurrentActiveTab] = useState(activeTab);

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[1000] bg-black/60',
        isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
      )}
    >
      <div
        className={clsx(
          'absolute top-0 right-0 h-full w-full max-w-sm bg-[#002107] shadow-xl flex flex-col',
          isClosing ? 'animate-slideOutToRight' : 'animate-slideInFromRight'
        )}
      >
        <div className='p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-bold text-2xl px-4 py-3'>
              Your Cart and Wishlist
            </h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-white'
            >
              <span className='sr-only'>Close panel</span>
              <CloseIcon width={30} height={25} />
            </button>
          </div>

          <div className='my-2 py-2 border-b border-t border-gray-700'>
            <nav className='flex gap-4 justify-center'>
              <button
                onClick={() => setCurrentActiveTab('cart')}
                className={clsx(
                  'flex gap-2 bg-[#075d0c] py-1 px-3 rounded-md transition-colors',
                  { ['bg-[#0ca816]']: currentActiveTab === 'cart' }
                )}
              >
                <CartIcon width={20} height='100%' />
                <span>Shopping Cart</span>
              </button>
              <button
                onClick={() => setCurrentActiveTab('wishlist')}
                className={clsx(
                  'flex gap-2 bg-[#075d0c] py-1 px-3 rounded-md transition-colors',
                  { ['bg-[#0ca816]']: currentActiveTab === 'wishlist' }
                )}
              >
                <HeartIcon width={20} height='100%' />
                <span>Wishlist</span>
              </button>
            </nav>
          </div>
        </div>

        <div className='relative flex-1 px-4 py-2'>
          {currentActiveTab === 'cart' && (
            <div>
              <p>Your shopping cart is empty.</p>
            </div>
          )}
          {currentActiveTab === 'wishlist' && (
            <div>
              <p>Your wishlist is empty.</p>
            </div>
          )}
        </div>
      </div>
      <div onClick={onClose} className='absolute inset-0 -z-10' />
    </div>
  );
}
