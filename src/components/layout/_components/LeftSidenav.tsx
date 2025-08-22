'use client';

import UserIcon from '@/components/icons/ecommerce/UserIcon';
import AnglesRightIcon from '@/components/icons/ui/AnglesRightIcon';
import ArrowLeftIcon from '@/components/icons/ui/ArrowLeftIcon';
import ChevronRightIcon from '@/components/icons/ui/ChevronRightIcon';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

interface LeftSidenavProps {
  onClose: () => void;
  isClosing: boolean;
  sideMenus: SideMenu[];
}

type SideMenu = {
  heading: string;
  categories: Categories[];
};

type Categories = {
  name: string;
  slug: string;
  brands: string[];
};

type ActiveSubmenu = {
  titleName: string;
  titleText: string;
  brandSlug: string;
  items: { name: string; href: string }[];
};

export default function LeftSidenav({
  onClose,
  isClosing,
  sideMenus,
}: LeftSidenavProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<ActiveSubmenu | null>(
    null
  );

  const openSubmenu = (category: Categories) => {
    setActiveSubmenu({
      titleName: `${category.name}`,
      titleText: `${category.name} Brands`,
      brandSlug: `${category.slug}`,
      items: category.brands.map((brand) => ({
        name: brand,
        href: `search?category=${category.slug}&brand=${encodeURIComponent(
          brand
        )}`,
      })),
    });
  };

  const closeSubmenu = () => {
    setActiveSubmenu(null);
  };

  const submenuLinksClassNames = clsx(
    'px-3 py-2 text-white hover:bg-green-900 flex items-center justify-between'
  );
  const headingTwoClassNames = clsx('font-bold text-2xl px-4 py-3');
  const linkBlockClassNames = clsx('py-4');
  const linksClassNames = clsx(
    'flex justify-between items-center w-full px-4 py-3 text-lg text-left hover:bg-green-800 transition-colors'
  );
  const hrClassNames = clsx('border-gray-500');

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[1000] bg-black/60',
        isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
      )}
    >
      <div
        className={clsx(
          'absolute top-0 left-0 h-full w-full max-w-sm bg-[#002107] border-r border-[#004810] shadow-xl flex flex-col overflow-hidden',
          isClosing ? 'animate-slideOutToLeft' : 'animate-slideInFromLeft'
        )}
      >
        <div className='flex text-xl bg-green-900 p-4 gap-2 font-bold'>
          <UserIcon />
          <span>
            Hello, <Link href='/login'>Sign In</Link>
          </span>
        </div>
        <div
          className={clsx(
            'absolute inset-0 transition-transform duration-300 ease-in-out flex flex-col mt-16',
            {
              'translate-x-0': !activeSubmenu,
              '-translate-x-full': activeSubmenu,
            }
          )}
        >
          <div className='overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-green-500'>
            <nav className='flex-1 overflow-y-auto'>
              <div className={linkBlockClassNames}>
                <h2 className={headingTwoClassNames}>Entro - Online Shop</h2>
                <ul className='list-none p-0 m-0'>
                  <li>
                    <Link
                      href='/'
                      className={linksClassNames}
                      onClick={onClose}
                    >
                      <span>Homepage</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/search'
                      className={linksClassNames}
                      onClick={onClose}
                    >
                      <span>Browse all Products</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <hr className={hrClassNames} />
              {sideMenus.map((sideMenu) => (
                <>
                  <div key={sideMenu.heading} className={linkBlockClassNames}>
                    <h2 className={headingTwoClassNames}>{sideMenu.heading}</h2>
                    <ul className='list-none p-0 m-0 space-y-1'>
                      {sideMenu.categories.map((category) => (
                        <li key={category.slug} className='group'>
                          <button
                            type='button'
                            onClick={() => openSubmenu(category)}
                            className={linksClassNames}
                          >
                            <span>{category.name}</span>
                            <ChevronRightIcon
                              height={15}
                              width={20}
                              className='group-hover:translate-x-1 transition-transform'
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr className={hrClassNames} />
                </>
              ))}
              <hr className={hrClassNames} />
              <div className={linkBlockClassNames}>
                <h2 className={headingTwoClassNames}>Help & Support</h2>
                <ul className='list-none p-0 m-0 space-y-1'>
                  <li>
                    <Link
                      href='/dashboard'
                      className={linksClassNames}
                      onClick={onClose}
                    >
                      <span>Your Account</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/login'
                      className={linksClassNames}
                      onClick={onClose}
                    >
                      <span>Sign In</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/impressum'
                      className={linksClassNames}
                      onClick={onClose}
                    >
                      <span>Legal Notice</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/datenschutz'
                      className={linksClassNames}
                      onClick={onClose}
                    >
                      <span>Privacy Policy</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <hr className={hrClassNames} />
              <div className={linkBlockClassNames}>
                <h2 className={headingTwoClassNames}>About the Project</h2>
                <ul className='list-none p-0 m-0 space-y-1'>
                  <li>
                    <a
                      href='https://stefan-luellmann.com/projects/entro-online-shop'
                      className={linksClassNames}
                      rel='noreferrer noopener'
                    >
                      <span>Case Study on Entro</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://github.com/OneDev49'
                      className={linksClassNames}
                      rel='noreferrer noopener'
                    >
                      <span>Stefan Lüllmann GitHub</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://linkedin.com/in/stefan-lüllmann'
                      className={linksClassNames}
                      rel='noreferrer noopener'
                    >
                      <span>Stefan Lüllmann LinkedIn</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div
          className={clsx(
            'absolute inset-0 transition-transform duration-300 ease-in-out flex flex-col  mt-16',
            {
              'translate-x-full': !activeSubmenu,
              'translate-x-0': activeSubmenu,
            }
          )}
        >
          <div className='flex-shrink-0 border-b border-gray-700'>
            <button
              type='button'
              onClick={closeSubmenu}
              className='flex items-center w-full px-4 py-3 text-lg text-left hover:bg-green-800 transition-colors gap-4 font-bold my-2'
            >
              <ArrowLeftIcon height={25} />
              <span>Main Menu</span>
            </button>
          </div>

          <nav className='flex-1 overflow-y-auto'>
            <h3 className={`${headingTwoClassNames} underline`}>
              {activeSubmenu?.titleText}
            </h3>
            <ul className='list-none p-0 m-0'>
              {activeSubmenu && (
                <li className='group'>
                  <Link
                    href={`search?category=${activeSubmenu.brandSlug}`}
                    onClick={onClose}
                    className={`${linksClassNames} font-bold`}
                  >
                    <span>To {activeSubmenu.titleName} Category</span>
                  </Link>
                </li>
              )}
              {activeSubmenu?.items.map((item) => (
                <li key={item.name} className='group'>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={linksClassNames}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div onClick={onClose} className='absolute inset-0 -z-10' />
    </div>
  );
}
