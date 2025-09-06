'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import DashboardSidebar from './layout/DashboardSidebar';

import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { selectTotalItems, useCartStore } from '@/store/cartStore';
import {
  selectWishlistTotalItems,
  useWishlistStore,
} from '@/store/wishlistStore';
import NotFound from '@/components/ui/NotFound';
import { createTabItems } from './config/tabConfig';
import { sidebarItems } from './config/sidebarConfig';

export interface DashboardUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface DashboardPageData {
  orders?: any[];
  user?: DashboardUser;
  wishlistItems?: any[];
}

interface DashboardClientProps {
  user: DashboardUser;
  pageData?: DashboardPageData;
}

export type TabId =
  | 'home'
  | 'history'
  | 'information'
  | 'wishlist'
  | 'cart'
  | 'payment';

const SIDEBAR_STATE_KEY = 'dashboard-sidebar-collapsed';

export default function DashboardPage({
  pageData,
  user,
}: DashboardClientProps) {
  /* SearchParams */
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'home';

  /* Zustand Cart */
  const totalCartAmount = useCartStore(selectTotalItems);
  const cartSentence =
    totalCartAmount === 1
      ? `${totalCartAmount} Product`
      : `${totalCartAmount} Products`;

  /* Zustand Wishlist */
  const totalWishlistAmount = useWishlistStore(selectWishlistTotalItems);
  const wishlistSentence =
    totalWishlistAmount === 1
      ? `${totalWishlistAmount} Product`
      : `${totalWishlistAmount} Products`;

  /* Sidebar Management */
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

  const tabItems = useMemo(
    () => createTabItems(user, cartSentence, wishlistSentence),
    [user, cartSentence, wishlistSentence]
  );

  const currentTab = tabItems.find((item) => item.id === activeTab);

  return (
    <div className='flex flex-1'>
      <DashboardSidebar
        activeMenuId={activeTab}
        menuItems={sidebarItems}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={handleToggleSidebar}
      />

      <section className='flex-1 overflow-y-auto'>
        <div className='pt-10 w-[95%] m-auto space-y-8'>
          {currentTab ? (
            <>
              <div className='border-b border-[#555555] w-[50%] pb-3 space-y-3'>
                <Breadcrumbs
                  secondaryBreadcrumbs={
                    currentTab.breadcrumbs.secondaryBreadcrumbs
                  }
                  mainBreadcrumb={currentTab.breadcrumbs.mainBreadcrumb}
                />
                <h1 className='text-4xl font-bold'>{currentTab.heading}</h1>
                <p>{currentTab.text}</p>
              </div>

              <currentTab.Component user={user} />
            </>
          ) : (
            <NotFound message='This dashboard tab does not exist.' />
          )}
        </div>
      </section>
    </div>
  );
}
