'use client';

import ChevronLeftIcon from '@/components/icons/ui/ChevronLeftIcon';
import clsx from 'clsx';
import Link from 'next/link';
import ChevronRightIcon from '@/components/icons/ui/ChevronRightIcon';
import { signOut } from 'next-auth/react';
import LogoutIcon from '@/components/icons/ui/LogoutIcon';
import UserIcon from '@/components/icons/ecommerce/UserIcon';

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

interface MenuItem {
  id: string;
  label: string;
  icon?: IconComponent;
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

interface DashboardSidebarProps {
  className?: string;
  user: User;
  activeMenuId: string;
  menuItems: MenuItem[];
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function DashboardSidebar({
  className,
  user,
  activeMenuId,
  menuItems,
  isCollapsed,
  toggleSidebar,
}: DashboardSidebarProps) {
  const mainContainerClassName = clsx(
    'border-r border-[#6c6c6c] h-full transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0',
    isCollapsed ? 'min-w-20 w-20' : 'min-w-72 w-72'
  );

  const userIconDimensions = isCollapsed ? 20 : 30;

  return (
    <div className={mainContainerClassName}>
      <div className='h-full flex flex-col'>
        <div className='flex items-center flex-col gap-1 py-4 border-b border-gray-400 mx-4'>
          <Link
            href='/dashboard?tab=home'
            className={clsx(
              'rounded-full bg-gray-700 grid place-items-center',
              isCollapsed ? 'h-12 w-12' : 'h-16 w-16'
            )}
          >
            {user.image ? (
              <UserIcon
                height={userIconDimensions}
                width={userIconDimensions}
              />
            ) : (
              <UserIcon
                height={userIconDimensions}
                width={userIconDimensions}
              />
            )}
          </Link>
          <div
            className={clsx(
              'flex flex-col text-center whitespace-nowrap',
              isCollapsed && 'hidden'
            )}
          >
            <strong>{user.name}</strong>
            <span className='text-sm text-gray-400'>{user.email}</span>
          </div>
        </div>
        <nav className='flex justify-between flex-col flex-1'>
          <ul
            className={clsx(
              'list-none py-4 space-y-4 m-0',
              isCollapsed ? 'px-4' : 'pl-4'
            )}
          >
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.id}
                  className={clsx(
                    'transition-all ease-in-out duration-300',
                    isCollapsed
                      ? 'rounded-xl border'
                      : 'rounded-tl-xl rounded-bl-xl border-t border-l border-b',
                    {
                      'border-[#007014] bg-[#003300]': item.id === activeMenuId,
                      'border-gray-700 hover:bg-[#0b270b] hover:border-[#195c26]':
                        item.id !== activeMenuId,
                    }
                  )}
                >
                  <Link
                    href={`/dashboard?tab=${item.id}`}
                    className='p-3 w-full text-left flex gap-2 items-center'
                    scroll={false}
                    title={`Navigate to ${item.label}`}
                  >
                    {Icon && (
                      <Icon height={20} width={20} className='flex-shrink-0' />
                    )}
                    <span
                      className={clsx(
                        'transition-opacity duration-300 ease-in-out whitespace-nowrap',
                        isCollapsed ? 'sr-only' : 'opacity-100'
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div>
            <button
              className='w-full flex gap-2 items-center justify-center p-3 cursor-pointer bg-gray-900/80 border-t border-gray-400 hover:bg-gray-800'
              type='button'
              onClick={toggleSidebar}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRightIcon
                  height={20}
                  width={20}
                  className='flex-shrink-0'
                />
              ) : (
                <ChevronLeftIcon
                  height={20}
                  width={20}
                  className='flex-shrink-0'
                />
              )}
              <span
                className={clsx(
                  'transition-opacity duration-300 ease-in-out whitespace-nowrap',
                  isCollapsed ? 'sr-only' : 'opacity-100'
                )}
              >
                Collapse Sidebar
              </span>
            </button>
            <button
              className='w-full flex gap-2 items-center justify-center p-3 cursor-pointer bg-black border-t border-gray-400 hover:bg-[#1f5100]'
              type='button'
              onClick={() => signOut({ callbackUrl: '/' })}
              title='Logout of your Entro Account'
              aria-label='Logout of your Entro Account'
            >
              {isCollapsed ? (
                <LogoutIcon height={20} width={20} className='flex-shrink-0' />
              ) : (
                <LogoutIcon height={20} width={20} className='flex-shrink-0' />
              )}
              <span
                className={clsx(
                  'transition-opacity duration-300 ease-in-out whitespace-nowrap',
                  isCollapsed ? 'sr-only' : 'opacity-100'
                )}
              >
                Logout
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
