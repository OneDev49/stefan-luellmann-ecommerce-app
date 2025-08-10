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

export default function HeaderLayout() {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

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

  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

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
          <div className='cursor-pointer'>
            <CartIcon
              className={linkTransitionClassNames}
              width={38}
              height='100%'
            />
          </div>
          <div className='relative cursor-pointer'>
            <div className='absolute bg-[#0c4800] h-5 w-5 text-sm grid place-items-center top-0 -right-2 rounded-full text-[#53ff5f]'>
              0
            </div>
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
        <div className='border-r sm:border-0'>
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
    </header>
  );
}
