'use client';

import ChevronLeftIcon from '@/components/icons/ui/ChevronLeftIcon';
import clsx from 'clsx';
import Link from 'next/link';
import ChevronRightIcon from '@/components/icons/ui/ChevronRightIcon';
import { signOut } from 'next-auth/react';
import LogoutIcon from '@/components/icons/ui/LogoutIcon';

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

interface MenuItem {
  id: string;
  label: string;
  icon?: IconComponent;
}

interface DashboardSidebarProps {
  className?: string;
  activeMenuId: string;
  menuItems: MenuItem[];
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function DashboardSidebar({
  className,
  activeMenuId,
  menuItems,
  isCollapsed,
  toggleSidebar,
}: DashboardSidebarProps) {
  const mainContainerClassName = clsx(
    'border-r border-[#6c6c6c] h-full transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0',
    isCollapsed ? 'min-w-20 w-20' : 'min-w-72 w-72'
  );

  return (
    <div className={mainContainerClassName}>
      <nav className='flex justify-between flex-col h-full'>
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
  );
}
