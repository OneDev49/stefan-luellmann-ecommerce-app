'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { selectTotalItems, useCartStore } from '@/store/cartStore';
import {
  selectWishlistTotalItems,
  useWishlistStore,
} from '@/store/wishlistStore';
import { createTabItems } from './config/tabConfig';
import { sidebarItems } from './config/sidebarConfig';
import { DashboardPageData } from '../page';

import DashboardSidebar from './layout/DashboardSidebar';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import NotFound from '@/components/ui/NotFound';
import MenuIcon from '@/components/icons/ui/MenuIcon';
import clsx from 'clsx';
import ChevronLeftIcon from '@/components/icons/ui/ChevronLeftIcon';

interface DashboardClientProps {
  pageData: DashboardPageData;
}

export type TabId =
  | 'home'
  | 'history'
  | 'information'
  | 'wishlist'
  | 'cart'
  | 'payment';

const SIDEBAR_STATE_KEY = 'dashboard-sidebar-collapsed';

export default function DashboardClient({ pageData }: DashboardClientProps) {
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

  // Cart/Wishlist Stores
  const totalCartAmount = useCartStore(selectTotalItems);
  const totalWishlistAmount = useWishlistStore(selectWishlistTotalItems);

  /* Sidebar Management */
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
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

    return createTabItems(cartSentence, wishlistSentence, pageData);
  }, [totalCartAmount, totalWishlistAmount, pageData]);

  const currentTab = tabItems.find((item) => item.id === activeTab);

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const contentClassName = clsx(
    'flex-1 transition-all duration-300',
    isSidebarCollapsed ? 'lg:ml-[79px]' : 'lg:ml-[288px]'
  );

  return (
    <div className='flex flex-1'>
      <div className='hidden lg:block fixed h-[calc(100vh-53.42px)]'>
        <DashboardSidebar
          user={pageData.user}
          activeMenuId={activeTab}
          menuItems={sidebarItems}
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={handleToggleSidebar}
        />
      </div>

      <div className='lg:hidden'>
        {isMobileSidebarOpen && (
          <div
            className='fixed inset-0 bg-black/70 z-30'
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
        <div
          className={clsx(
            'fixed top-0 left-0 h-full z-50 transform transition-all duration-300 flex',
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <DashboardSidebar
            user={pageData.user}
            activeMenuId={activeTab}
            menuItems={sidebarItems}
            isCollapsed={true}
            toggleSidebar={() => setIsMobileSidebarOpen(false)}
          />
          <button
            title={isMobileSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
            aria-label={
              isMobileSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'
            }
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className='absolute bottom-11 right-[-41px] p-2 bg-[#001b03] border border-[#6c6c6c] rounded-tr-lg rounded-br-lg z-50'
          >
            <span>
              {isMobileSidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </span>
          </button>
        </div>
      </div>
      <section className={contentClassName}>
        <div className='pt-10 w-[95%] m-auto space-y-8'>
          {currentTab ? (
            <>
              <div className='border-b border-[#555555] pb-3 space-y-3'>
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
