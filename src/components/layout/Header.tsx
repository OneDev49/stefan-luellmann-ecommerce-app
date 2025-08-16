'use client';

import Link from 'next/link';
import Image from 'next/image';
import UserIcon from '../icons/ecommerce/UserIcon';
import HeartIcon from '../icons/ecommerce/HeartIcon';
import CartIcon from '../icons/ecommerce/CartIcon';
import MenuIcon from '../icons/ui/MenuIcon';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { useState } from 'react';
import RightSidenav from './_components/RightSidenav';
import LeftSidenav from './_components/LeftSidenav';
import { useCartStore } from '@/store/cartStore';

export default function HeaderLayout() {
  /* Zustand Store for Header */
  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /* Embla Carousel for Bottom Header Navigation */
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  /* Categories of Bottom Header Navigation */
  const categories = [
    { name: 'CPU', slug: 'cpu' },
    { name: 'Motherboard', slug: 'motherboard' },
    { name: 'RAM', slug: 'ram' },
    { name: 'Storage', slug: 'storage' },
    { name: 'GPU', slug: 'gpu' },
    { name: 'Power Supply', slug: 'power' },
    { name: 'Cases', slug: 'case' },
    { name: 'Cooling', slug: 'cooling' },
    { name: 'Monitor', slug: 'monitor' },
    { name: 'Keyboard', slug: 'keyboard' },
    { name: 'Mouse', slug: 'mouse' },
    { name: 'Headset', slug: 'headset' },
    { name: 'Case Fan', slug: 'casefan' },
    { name: 'Laptop', slug: 'laptop' },
    { name: 'Microphone', slug: 'microphone' },
    { name: 'Webcam', slug: 'webcam' },
  ];

  /* Content of the LeftSidenav */
  const leftSidenavSideMenus = [
    {
      heading: 'Computer Components',
      categories: [
        {
          name: 'CPU',
          slug: 'cpu',
          brands: ['Axion', 'CoreForge', 'Helion', 'QuantumLeap', 'Zentheon'],
        },
        {
          name: 'GPU',
          slug: 'gpu',
          brands: [
            'AetherFlux',
            'ChronoShift',
            'Geode',
            'NoveCore',
            'Pixelis',
            'Singularity',
            'Vexel',
          ],
        },
        {
          name: 'RAM',
          slug: 'ram',
          brands: [
            'Aethelred',
            'Hypercore',
            'Momentum Storage',
            'Synapse Memory',
            'Veritas Digital',
          ],
        },
        {
          name: 'SSD',
          slug: 'ssd',
          brands: [
            'Hypercore',
            'Momentum Storage',
            'Quicksilicon',
            'Synapse Memory',
            'Veritas Digital',
          ],
        },
        {
          name: 'HDD',
          slug: 'hdd',
          brands: ['Momentum Storage', 'TerraVault', 'Veritas Digital'],
        },
        {
          name: 'Motherboard',
          slug: 'motherboard',
          brands: [
            'Aegis Prime',
            'Apex Boards',
            'Foundation Logic',
            'Tectonic Systems',
          ],
        },
        {
          name: 'Power Supply',
          slug: 'power',
          brands: ['Example'],
        },
        {
          name: 'Case',
          slug: 'case',
          brands: ['Example'],
        },
        {
          name: 'Cooling',
          slug: 'cooling',
          brands: ['Example'],
        },
        {
          name: 'Case Fan',
          slug: 'casefan',
          brands: ['Example'],
        },
      ],
    },
    {
      heading: 'Computer Extras',
      categories: [
        {
          name: 'Monitor',
          slug: 'monitor',
          brands: ['Example'],
        },
        {
          name: 'Keyboard',
          slug: 'keyboard',
          brands: ['Example'],
        },
        {
          name: 'Mouse',
          slug: 'mouse',
          brands: ['Example'],
        },
        {
          name: 'Headset',
          slug: 'headset',
          brands: ['Example'],
        },
        {
          name: 'Microphone',
          slug: 'microphone',
          brands: ['Example'],
        },
        {
          name: 'Webcam',
          slug: 'webcam',
          brands: ['Example'],
        },
      ],
    },
    {
      heading: 'Other Electronics',
      categories: [
        {
          name: 'Laptop',
          slug: 'laptop',
          brands: ['Example'],
        },
      ],
    },
  ];

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

  const linkTransitionClassNames = clsx('hover:text-[#53ff5f] transition-all');
  const bottomLinksClassNames = clsx('py-1 px-2 rounded-md transition-colors');

  return (
    <header className='sticky top-0 z-[999] left-0 right-0 bg-black'>
      <div className='flex justify-between px-4 py-1 items-center'>
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
            {totalItems > 0 && (
              <div className='absolute bg-[#0c4800] h-5 w-5 text-sm grid place-items-center top-0 -right-2 rounded-full text-[#53ff5f]'>
                {totalItems}
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
            <HeartIcon
              className={linkTransitionClassNames}
              width={35}
              height='100%'
            />
          </div>
          <div className='flex gap-1'>
            <Link href='/dashboard'>
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
          </div>
        </div>
      </div>
      <div className='border-white border-t border-b flex items-center whitespace-nowrap text-lg py-1'>
        <div
          className='border-r sm:border-0'
          onClick={() => handleOpenSidenav('left')}
        >
          <MenuIcon
            height='100%'
            width={40}
            className={`mx-1 cursor-pointer hover:bg-gray-700 ${bottomLinksClassNames}`}
          />
        </div>
        <div className='border-x'>
          <Link
            className={`hidden sm:block mx-1 hover:bg-gray-700 hover:text-white ${bottomLinksClassNames}`}
            href='/pc-builder'
          >
            PC Builder
          </Link>
        </div>
        <nav className='overflow-hidden w-full select-none mx-1' ref={emblaRef}>
          <div className='flex gap-2'>
            {categories.map((category) => (
              <Link
                className={clsx(
                  `block whitespace-nowrap ${bottomLinksClassNames}`,
                  {
                    'bg-[#1f7414] text-white': activeCategory === category.slug,
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
      {openSidenav === 'left' && (
        <LeftSidenav
          onClose={handleCloseSidenav}
          isClosing={isClosing}
          sideMenus={leftSidenavSideMenus}
        />
      )}
    </header>
  );
}
