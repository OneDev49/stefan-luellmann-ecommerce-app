'use client';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardAccountHome from './_components/AccountHome';
import DashboardAccountInformation from './_components/AccountInformation';
import DashboardOrderHistory from './_components/OrderHistory';
import DashboardWishlist from './_components/Wishlist';
import DashboardCart from './_components/Cart';

const menuItems = [
  {
    id: 'home',
    label: 'Account Home',
    Component: DashboardAccountHome,
  },
  {
    id: 'history',
    label: 'Order History',
    Component: DashboardOrderHistory,
  },
  {
    id: 'information',
    label: 'Account Information',
    Component: DashboardAccountInformation,
  },
  {
    id: 'wishlist',
    label: 'My Wishlist',
    Component: DashboardWishlist,
  },
  {
    id: 'cart',
    label: 'My Cart',
    Component: DashboardCart,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeMenuId = searchParams.get('tab') || menuItems[0].id;
  const activeMenuItem = menuItems.find((item) => item.id === activeMenuId);

  const handleMenuClick = (menuId: string) => {
    router.push(`/dashboard?tab=${menuId}`);
  };

  return (
    <div className='flex flex-1'>
      <nav className='border-r border-[#6c6c6c] min-w-72 min-h-full'>
        <ul className='list-none py-4 pl-4 m-0 space-y-4'>
          {menuItems.map((item) => (
            <li
              className={clsx(
                'border-t border-l border-b  rounded-tl-xl rounded-bl-xl transition-colors',
                {
                  'border-[#007014] bg-[#003300]': item.id === activeMenuId,
                  'border-gray-700 hover:bg-[#0b270b] hover:border-[#195c26]':
                    item.id !== activeMenuId,
                }
              )}
            >
              <button
                className='py-3 px-3 w-full text-left'
                type='button'
                title={`Navigate to ${item.label}`}
                onClick={() => handleMenuClick(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <section className='flex-1'>
        {activeMenuItem ? (
          <activeMenuItem.Component />
        ) : (
          <div>Page not found</div>
        )}
      </section>
    </div>
  );
}
