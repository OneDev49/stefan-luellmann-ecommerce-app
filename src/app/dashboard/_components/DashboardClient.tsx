'use client';
import { useSearchParams } from 'next/navigation';
import DashboardAccountHome from './tabs/AccountHomeTab';
import DashboardOrderHistory from './tabs/OrderHistoryTab';
import DashboardAccountInformation from './tabs/AccountInformationTab';
import DashboardWishlist from './tabs/WishlistTab';
import DashboardCart from './tabs/CartTab';
import DashboardSidebar from './layout/DashboardSidebar';

interface DashboardClientProps {
  user: any;
  pageData?: {
    orders?: any[];
    user?: any;
    wishlistItems?: any[];
  };
}

export default function DashboardPage({
  pageData,
  user,
}: DashboardClientProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'home';

  const menuItems = [
    {
      id: 'home',
      label: 'Account Home',
      Component: () => <DashboardAccountHome />,
    },
    {
      id: 'history',
      label: 'Order History',
      Component: () => <DashboardOrderHistory />,
    },
    {
      id: 'information',
      label: 'Account Information',
      Component: () => <DashboardAccountInformation user={user} />,
    },
    {
      id: 'wishlist',
      label: 'My Wishlist',
      Component: () => <DashboardWishlist />,
    },
    {
      id: 'cart',
      label: 'My Cart',
      Component: () => <DashboardCart />,
    },
  ];
  const activeMenuItem = menuItems.find((item) => item.id === activeTab);

  return (
    <div className='flex flex-1'>
      <div className='border-r border-[#6c6c6c] min-w-72 min-h-full'>
        <DashboardSidebar activeMenuId={activeTab} menuItems={menuItems} />
      </div>

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
