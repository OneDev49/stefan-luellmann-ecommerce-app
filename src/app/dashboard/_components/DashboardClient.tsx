'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import DashboardSidebar from './layout/DashboardSidebar';

import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { selectTotalItems, useCartStore } from '@/store/cartStore';
import {
  selectWishlistTotalItems,
  useWishlistStore,
} from '@/store/wishlistStore';
import NotFound from '@/components/ui/NotFound';
import { createTabItems, TabPageData, TabUser } from './config/tabConfig';
import { sidebarItems } from './config/sidebarConfig';

interface DashboardClientProps {
  user: TabUser;
  pageData?: TabPageData;
}

export type TabId =
  | 'home'
  | 'history'
  | 'information'
  | 'wishlist'
  | 'cart'
  | 'payment';

const SIDEBAR_STATE_KEY = 'dashboard-sidebar-collapsed';

export default function DashboardClient({
  pageData,
  user,
}: DashboardClientProps) {
  /* SearchParams */
  const searchParams = useSearchParams();
  const rawTab = searchParams.get('tab');
  const validTabs: TabId[] = [
    'home',
    'history',
    'information',
    'wishlist',
    'cart',
    'payment',
  ];
  const activeTab: TabId = validTabs.includes(rawTab as TabId)
    ? (rawTab as TabId)
    : 'home';

  /* Zustand Cart */
  const totalCartAmount = useCartStore(selectTotalItems);

  /* Zustand Wishlist */
  const totalWishlistAmount = useWishlistStore(selectWishlistTotalItems);

  /* Sidebar Management */
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  useLayoutEffect(() => {
    const savedState =
      typeof window !== 'undefined'
        ? localStorage.getItem(SIDEBAR_STATE_KEY)
        : null;
    setIsSidebarCollapsed(savedState === 'true');
  }, []);
  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_STATE_KEY, String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);
  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prevState) => !prevState);
  };

  const tabItems = useMemo(() => {
    const cartSentence =
      totalCartAmount === 1
        ? `${totalCartAmount} Product`
        : `${totalCartAmount} Products`;

    const wishlistSentence =
      totalWishlistAmount === 1
        ? `${totalWishlistAmount} Product`
        : `${totalWishlistAmount} Products`;

    return createTabItems(cartSentence, wishlistSentence, user, pageData);
  }, [user, totalCartAmount, totalWishlistAmount, pageData]);

  const currentTab = tabItems.find((item) => item.id === activeTab);

  return (
    <div className='flex flex-1'>
      <DashboardSidebar
        user={user}
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
              {<currentTab.Component {...(currentTab.props ?? {})} />}
            </>
          ) : (
            <>
              <NotFound message='This dashboard Tab does not exist.' />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
