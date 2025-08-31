'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface MenuItem {
  id: string;
  label: string;
}

interface DashboardSidebarProps {
  activeMenuId: string;
  menuItems: MenuItem[];
}

export default function DashboardSidebar({
  activeMenuId,
  menuItems,
}: DashboardSidebarProps) {
  return (
    <nav>
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
              className='py-3 px-3 w-full text-left block'
              type='button'
              title={`Navigate to ${item.label}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
