'use client';

import { ComponentNames, ComponentSlugNames } from '@/types/components';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import UserIcon from '@/components/icons/ecommerce/UserIcon';
import ArrowLeftIcon from '@/components/icons/ui/ArrowLeftIcon';
import ChevronRightIcon from '@/components/icons/ui/ChevronRightIcon';
import clsx from 'clsx';
import Link from 'next/link';

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
  name: ComponentNames;
  slug: ComponentSlugNames;
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

  const { data: session, status } = useSession();

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

  const headingTwoClassName = 'font-bold text-2xl px-4 py-3';
  const linkBlockClassName = 'py-4';
  const linksClassName =
    'flex justify-between items-center w-full px-4 py-3 text-left hover:bg-green-800 transition-colors';
  const hrClassName = 'border-gray-500';

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
        <div className='flex items-center text-xl bg-green-900 p-4 gap-2 font-bold'>
          <UserIcon />
          <div className='flex gap-2'>
            Hello,
            {status === 'loading' ? (
              <div className='h-8 w-24 animate-pulse bg-green-700 rounded-md'></div>
            ) : (
              <>
                {session && session.user ? (
                  <Link href='/dashboard?tab=home'>{session.user.name}</Link>
                ) : (
                  <Link href='/login'>Sign In</Link>
                )}
              </>
            )}
          </div>
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
              <div className={linkBlockClassName}>
                <h2 className={headingTwoClassName}>Entro - Online Shop</h2>
                <ul className='list-none p-0 m-0'>
                  <li>
                    <Link href='/' className={linksClassName} onClick={onClose}>
                      <span>Homepage</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/search'
                      className={linksClassName}
                      onClick={onClose}
                    >
                      <span>Browse all Products</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <hr className={hrClassName} />
              {sideMenus.map((sideMenu) => (
                <>
                  <div key={sideMenu.heading} className={linkBlockClassName}>
                    <h2 className={headingTwoClassName}>{sideMenu.heading}</h2>
                    <ul className='list-none p-0 m-0 space-y-1'>
                      {sideMenu.categories.map((category) => (
                        <li key={category.slug} className='group'>
                          <button
                            type='button'
                            onClick={() => openSubmenu(category)}
                            className={linksClassName}
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
                  <hr className={hrClassName} />
                </>
              ))}
              <hr className={hrClassName} />
              <div className={linkBlockClassName}>
                <h2 className={headingTwoClassName}>Help & Support</h2>
                <ul className='list-none p-0 m-0 space-y-1'>
                  {session ? (
                    <li>
                      <Link
                        href='/dashboard?tab=home'
                        className={linksClassName}
                        onClick={onClose}
                      >
                        <span>Your Account</span>
                      </Link>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link
                          href='/login'
                          className={linksClassName}
                          onClick={onClose}
                        >
                          <span>Sign In</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href='/register'
                          className={linksClassName}
                          onClick={onClose}
                        >
                          <span>Register</span>
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link
                      href='/impressum'
                      className={linksClassName}
                      onClick={onClose}
                    >
                      <span>Legal Notice</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/datenschutz'
                      className={linksClassName}
                      onClick={onClose}
                    >
                      <span>Privacy Policy</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <hr className={hrClassName} />
              <div className={linkBlockClassName}>
                <h2 className={headingTwoClassName}>About the Project</h2>
                <ul className='list-none p-0 m-0 space-y-1'>
                  <li>
                    <a
                      href='https://stefan-luellmann.com/case-studies/entro-ecommerce-store'
                      className={linksClassName}
                      rel='noreferrer noopener'
                      target='_blank'
                    >
                      <span>Case Study on Entro</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://stefan-luellmann.com/'
                      className={linksClassName}
                      rel='noreferrer noopener'
                      target='_blank'
                    >
                      <span>Website of Stefan Lüllmann</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://github.com/OneDev49'
                      className={linksClassName}
                      rel='noreferrer noopener'
                      target='_blank'
                    >
                      <span>Stefan Lüllmann on GitHub</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://linkedin.com/in/stefan-lüllmann'
                      className={linksClassName}
                      rel='noreferrer noopener'
                      target='_blank'
                    >
                      <span>Stefan Lüllmann on LinkedIn</span>
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
            <h3 className={`${headingTwoClassName} underline`}>
              {activeSubmenu?.titleText}
            </h3>
            <ul className='list-none p-0 m-0'>
              {activeSubmenu && (
                <li className='group'>
                  <Link
                    href={`search?category=${activeSubmenu.brandSlug}`}
                    onClick={onClose}
                    className={`${linksClassName} font-bold`}
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
                    className={linksClassName}
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
