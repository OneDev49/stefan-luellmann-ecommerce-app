'use client';

import { selectTotalItems, useCartStore } from '@/store/cartStore';
import {
  selectWishlistTotalItems,
  useWishlistStore,
} from '@/store/wishlistStore';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { quickNavCategories, sideNavMenu } from './config/headerConfig';
import { LogoutButton } from '@/components/ui/LogoutButton';

import CartIcon from '@/components/icons/ecommerce/CartIcon';
import HeartIcon from '@/components/icons/ecommerce/HeartIcon';
import UserIcon from '@/components/icons/ecommerce/UserIcon';
import MenuIcon from '@/components/icons/ui/MenuIcon';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import RightSidenav from './RightSidenav';
import LeftSidenav from './LeftSidenav';
import HeaderSearchBar from './HeaderSearchBar';

interface HeaderContentProps {
  headerVariant: HeaderVariant;
  categories?: { name: string; slug: string }[];
  popularBrands?: string[];
}

export type HeaderVariant = 'simple' | 'full';

type SidenavView = 'left' | 'right-wishlist' | 'right-cart';

export default function HeaderContent({
  headerVariant = 'full',
  categories,
  popularBrands,
}: HeaderContentProps) {
  const [openSidenav, setOpenSidenav] = useState<SidenavView | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const { data: session, status } = useSession();

  const totalCartItems = useCartStore(selectTotalItems);
  const totalWishlistItems = useWishlistStore(selectWishlistTotalItems);

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

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

  const linkTransitionClassNames = 'hover:text-[#53ff5f] transition-all';
  const bottomLinksClassNames = 'py-1 px-2 rounded-md transition-colors';

  return (
    <>
      <div
        className={clsx('flex justify-between px-4 py-1 items-center gap-4', {
          'border-b border-[#6c6c6c]': headerVariant === 'simple',
        })}
      >
        <Link href='/' className='flex-[0_1_220px]'>
          <Image
            src='/images/entro_logo.webp'
            alt='Entro Logo'
            width={125}
            height={50}
          />
        </Link>
        <div className='flex-1 flex justify-center'>
          <HeaderSearchBar
            categories={categories}
            popularBrands={popularBrands}
          />
        </div>

        <div className='flex flex-[0_1_220px] gap-4'>
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
                    <LogoutButton
                      className={`${linkTransitionClassNames} underline`}
                    >
                      Logout
                    </LogoutButton>
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
      {headerVariant === 'full' && (
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
      {openSidenav === 'left' && headerVariant === 'full' && (
        <LeftSidenav
          onClose={handleCloseSidenav}
          isClosing={isClosing}
          sideMenus={sideNavMenu}
        />
      )}
    </>
  );
}
