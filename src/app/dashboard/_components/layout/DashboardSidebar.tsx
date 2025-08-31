'use client';

import ChevronLeftIcon from '@/components/icons/ui/ChevronLeftIcon';
import clsx from 'clsx';
import Link from 'next/link';

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
}

export default function DashboardSidebar({
  className,
  activeMenuId,
  menuItems,
}: DashboardSidebarProps) {
  return (
    <div className={className}>
      <nav className='flex justify-between flex-col h-full'>
        <ul className='list-none py-4 pl-4 m-0 space-y-4'>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={clsx(
                'border-t border-l border-b  rounded-tl-xl rounded-bl-xl transition-colors',
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
                type='button'
                title={`Navigate to ${item.label}`}
              >
                {item.icon && <item.icon height={20} width={20} />}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className='flex gap-2 items-center p-3 cursor-pointer bg-gray-800/80 border-t border-gray-400'
          type='button'
        >
          <ChevronLeftIcon height={20} width={20} />
          Collapse Sidebar
        </button>
      </nav>
    </div>
  );
}
