'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { selectTotalItems, useCartStore } from '@/store/cartStore';
import {
  selectWishlistTotalItems,
  useWishlistStore,
} from '@/store/wishlistStore';
import { useSession, signOut } from 'next-auth/react';

import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';

import UserIcon from '../icons/ecommerce/UserIcon';
import HeartIcon from '../icons/ecommerce/HeartIcon';
import CartIcon from '../icons/ecommerce/CartIcon';
import MenuIcon from '../icons/ui/MenuIcon';
import RightSidenav from './_components/RightSidenav';
import LeftSidenav from './_components/LeftSidenav';
import {
  quickNavCategories,
  sideNavMenu,
} from './_components/config/headerConfig';

interface HeaderLayoutProps {
  variant: 'simple' | 'full';
}

export default function HeaderLayout({ variant = 'full' }: HeaderLayoutProps) {
  /* Zustand Cart Store for Header */
  const totalCartItems = useCartStore(selectTotalItems);

  /* Zustand Wishlist Store for Header */
  const totalWishlistItems = useWishlistStore(selectWishlistTotalItems);

  /* Embla Carousel for Bottom Header Navigation */
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  /* Necessary type and const declaration for Sidenavs */
  type SidenavView = 'left' | 'right-wishlist' | 'right-cart';
  const [openSidenav, setOpenSidenav] = useState<SidenavView | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const handleOpenSidenav = (view: SidenavView) => {
    setIsClosing(false);
    setOpenSidenav(view);
  };
  const handleCloseSidenav = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenSidenav(null);
      setIsClosing(false);
    }, 300);
  };

  /* NextAuth Session */
  const { data: session, status } = useSession();

  /* CSS ClassNames */
  const linkTransitionClassNames = clsx('hover:text-[#53ff5f] transition-all');
  const bottomLinksClassNames = clsx('py-1 px-2 rounded-md transition-colors');
  const topHeaderClassNames = clsx(
    'flex justify-between px-4 py-1 items-center',
    {
      'border-b border-[#6c6c6c]': variant === 'simple',
    }
  );

  return (
    <header className='sticky top-0 z-20 left-0 right-0 bg-black'>
      <div className={topHeaderClassNames}>
        <Link href='/'>
          <Image
            src='/images/entro_logo.webp'
            alt='Entro Logo'
            width={125}
            height={50}
          />
        </Link>
        <div className='flex gap-4'>
          <div
            className='relative cursor-pointer'
            onClick={() => handleOpenSidenav('right-cart')}
          >
            {totalCartItems > 0 && (
              <div className='absolute bg-[#0c4800] h-5 w-5 text-sm grid place-items-center top-0 -right-2 rounded-full text-[#53ff5f]'>
                {totalCartItems}
              </div>
            )}
            <CartIcon
              className={linkTransitionClassNames}
              width={38}
              height='100%'
            />
          </div>
          <div
            className='relative cursor-pointer'
            onClick={() => handleOpenSidenav('right-wishlist')}
          >
            {totalWishlistItems > 0 && (
              <div className='absolute bg-[#0c4800] h-5 w-5 text-sm grid place-items-center top-0 -right-2 rounded-full text-[#53ff5f]'>
                {totalWishlistItems}
              </div>
            )}
            <HeartIcon
              className={linkTransitionClassNames}
              width={35}
              height='100%'
            />
          </div>
          {status === 'loading' ? (
            <div className='h-8 w-24 animate-pulse bg-gray-700 rounded-md' />
          ) : (
            <div className='flex gap-1'>
              {session && session.user ? (
                <>
                  <Link href='/dashboard'>
                    <UserIcon
                      height='100%'
                      width={27}
                      className={linkTransitionClassNames}
                    />
                  </Link>
                  <div className='flex flex-col items-start text-sm'>
                    <Link
                      className={`${linkTransitionClassNames} underline`}
                      href='/dashboard'
                    >
                      Your Account
                    </Link>
                    <button
                      className={`${linkTransitionClassNames} underline`}
                      onClick={() => signOut()}
                    >
                      Log Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link href='/login'>
                    <UserIcon
                      height='100%'
                      width={27}
                      className={linkTransitionClassNames}
                    />
                  </Link>
                  <div className='underline flex flex-col text-sm'>
                    <Link className={linkTransitionClassNames} href='/login'>
                      Login
                    </Link>
                    <Link className={linkTransitionClassNames} href='/register'>
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {variant === 'full' && (
        <div className='border-gray-400 border-t border-b flex items-center whitespace-nowrap'>
          <div
            className='border-r border-r-gray-400 py-1 px-2'
            onClick={() => handleOpenSidenav('left')}
          >
            <MenuIcon
              height='100%'
              width={35}
              className={`mx-1 cursor-pointer hover:bg-gray-700 ${bottomLinksClassNames}`}
            />
          </div>
          <nav
            className='overflow-hidden w-full select-none mx-2'
            ref={emblaRef}
          >
            <div className='flex gap-2'>
              {quickNavCategories.map((category) => (
                <Link
                  className={clsx(
                    `block whitespace-nowrap ${bottomLinksClassNames}`,
                    {
                      'bg-[#1f7414] text-white':
                        activeCategory === category.slug,
                      'hover:bg-gray-700': activeCategory !== category.slug,
                    }
                  )}
                  href={`/search?category=${category.slug}`}
                  key={category.slug}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}

      {openSidenav === 'right-cart' && (
        <RightSidenav
          onClose={handleCloseSidenav}
          isClosing={isClosing}
          activeTab='cart'
        />
      )}
      {openSidenav === 'right-wishlist' && (
        <RightSidenav
          onClose={handleCloseSidenav}
          isClosing={isClosing}
          activeTab='wishlist'
        />
      )}
      {openSidenav === 'left' && variant === 'full' && (
        <LeftSidenav
          onClose={handleCloseSidenav}
          isClosing={isClosing}
          sideMenus={sideNavMenu}
        />
      )}
    </header>
  );
}
