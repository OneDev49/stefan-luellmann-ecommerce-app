'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import DashboardAccountHome from './tabs/AccountHomeTab';
import DashboardOrderHistory from './tabs/OrderHistoryTab';
import DashboardAccountInformation from './tabs/AccountInformationTab';
import DashboardWishlist from './tabs/WishlistTab';
import DashboardCart from './tabs/CartTab';
import DashboardSidebar from './layout/DashboardSidebar';
import HomeIcon from '@/components/icons/ecommerce/HomeIcon';
import CartIcon from '@/components/icons/ecommerce/CartIcon';
import HeartIcon from '@/components/icons/ecommerce/HeartIcon';
import ShippingIcon from '@/components/icons/ecommerce/ShippingIcon';
import AddressCardIcon from '@/components/icons/ecommerce/AddressCardIcon';

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

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prevState) => !prevState);
  };

  const menuItems = [
    {
      id: 'home',
      label: 'Account Home',
      icon: HomeIcon,
      Component: () => <DashboardAccountHome />,
    },
    {
      id: 'history',
      label: 'Order History',
      icon: ShippingIcon,
      Component: () => <DashboardOrderHistory />,
    },
    {
      id: 'information',
      label: 'Account Information',
      icon: AddressCardIcon,
      Component: () => <DashboardAccountInformation user={user} />,
    },
    {
      id: 'wishlist',
      label: 'My Wishlist',
      icon: HeartIcon,
      Component: () => <DashboardWishlist />,
    },
    {
      id: 'cart',
      label: 'My Cart',
      icon: CartIcon,
      Component: () => <DashboardCart />,
    },
  ];
  const activeMenuItem = menuItems.find((item) => item.id === activeTab);

  return (
    <div className='flex flex-1'>
      <DashboardSidebar
        activeMenuId={activeTab}
        menuItems={menuItems}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={handleToggleSidebar}
      />

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
