'use client';

import { useState } from 'react';

import CloseIcon from '@/components/icons/ui/CloseIcon';
import CartIcon from '@/components/icons/ecommerce/CartIcon';
import HeartIcon from '@/components/icons/ecommerce/HeartIcon';
import clsx from 'clsx';
import HeaderCart from './tabs/CartTab';
import HeaderWishlist from './tabs/WishlistTab';

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
  const [currentActiveTab, setCurrentActiveTab] = useState<'wishlist' | 'cart'>(
    activeTab
  );

  const tabClassName =
    'flex items-center gap-2 bg-[#075d0c] py-1 px-2 md:px-3 rounded-xl transition-colors border border-[#0ca816] hover:bg-[#1f702a]';
  const tabAnnouncerClassName =
    'p-2 bg-[#2d2d2d] border border-gray-500 shadow-[0_4px_15px_0_rgb(140,140,140,0.25)] rounded-md text-center';

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[1000] bg-black/60',
        isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
      )}
    >
      <div
        className={clsx(
          'absolute top-0 right-0 h-full w-full max-w-sm bg-[#00210b] border-l border-[#004810] shadow-xl flex flex-col',
          isClosing ? 'animate-slideOutToRight' : 'animate-slideInFromRight'
        )}
      >
        <div className='p-4 bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)] space-y-5 border-b border-green-500'>
          <div className='flex items-center justify-between'>
            <h2 className='font-bold text-lg md:text-xl'>
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
              className={clsx(tabClassName, {
                ['bg-[#0ca816] border-[#075d0c] hover:bg-[#0ca816]']:
                  currentActiveTab === 'cart',
              })}
            >
              <CartIcon width={20} height={20} />
              <span>Shopping Cart</span>
            </button>
            <button
              type='button'
              onClick={() => setCurrentActiveTab('wishlist')}
              className={clsx(tabClassName, {
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
            <HeaderCart onClose={onClose} className={tabAnnouncerClassName} />
          )}
          {currentActiveTab === 'wishlist' && (
            <HeaderWishlist
              onClose={onClose}
              className={tabAnnouncerClassName}
            />
          )}
        </div>
      </div>
      <div onClick={onClose} className='absolute inset-0 -z-10' />
    </div>
  );
}
