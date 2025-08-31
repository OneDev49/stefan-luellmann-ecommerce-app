'use client';
import { useSearchParams } from 'next/navigation';
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
        className={'border-r border-[#6c6c6c] min-w-72 min-h-full'}
        activeMenuId={activeTab}
        menuItems={menuItems}
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
