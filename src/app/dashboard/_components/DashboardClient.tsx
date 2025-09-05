'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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

export interface DashboardUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

interface DashboardPageData {
  orders?: any[];
  user?: DashboardUser;
  wishlistItems?: any[];
}

interface DashboardClientProps {
  user: DashboardUser;
  pageData?: DashboardPageData;
}

interface MenuItems {
  id: string;
  label: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  Component: React.FC<{ user: DashboardUser; pageData?: DashboardPageData }>;
}

const SIDEBAR_STATE_KEY = 'dashboard-sidebar-collapsed';

export default function DashboardPage({
  pageData,
  user,
}: DashboardClientProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'home';

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = window.localStorage.getItem(SIDEBAR_STATE_KEY);
      return savedState === 'true';
    }
    return false;
  });

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_STATE_KEY, String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prevState) => !prevState);
  };

  const menuItems: MenuItems[] = [
    {
      id: 'home',
      label: 'Account Home',
      icon: HomeIcon,
      Component: DashboardAccountHome,
    },
    {
      id: 'history',
      label: 'Order History',
      icon: ShippingIcon,
      Component: DashboardOrderHistory,
    },
    {
      id: 'information',
      label: 'Account Information',
      icon: AddressCardIcon,
      Component: DashboardAccountInformation,
    },
    {
      id: 'wishlist',
      label: 'My Wishlist',
      icon: HeartIcon,
      Component: DashboardWishlist,
    },
    {
      id: 'cart',
      label: 'My Cart',
      icon: CartIcon,
      Component: DashboardCart,
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

      <section className='flex-1 overflow-y-auto'>
        {activeMenuItem ? (
          <activeMenuItem.Component user={user} />
        ) : (
          <div className='pt-10 w-[95%] m-auto space-y-8'>
            <h1 className='text-4xl font-bold'>
              We are sorry, {user.name}, but we couldn't find that page.
            </h1>
          </div>
        )}
      </section>
    </div>
  );
}
