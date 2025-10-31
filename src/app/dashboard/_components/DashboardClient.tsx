'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { selectTotalItems, useCartStore } from '@/store/cartStore';
import {
  selectWishlistTotalItems,
  useWishlistStore,
} from '@/store/wishlistStore';
import { createTabItems } from './config/tabConfig';
import { sidebarItems } from './config/sidebarConfig';
import { DEMO_SENTENCE_PREFIX, isDemoMode } from '@/config/site';
import { useDashboardData } from '@/hooks/useDashboardData';

import DashboardSidebar from './layout/DashboardSidebar';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import NotFound from '@/components/ui/NotFound';
import MenuIcon from '@/components/icons/ui/MenuIcon';
import clsx from 'clsx';
import ChevronLeftIcon from '@/components/icons/ui/ChevronLeftIcon';

export type TabId =
  | 'home'
  | 'history'
  | 'information'
  | 'wishlist'
  | 'cart'
  | 'payment';

const SIDEBAR_STATE_KEY = 'dashboard-sidebar-collapsed';

export default function DashboardClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoading, pageData } = useDashboardData();

  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const initialTab = searchParams.get('tab') as TabId;
    const validTabs: TabId[] = [
      'home',
      'history',
      'information',
      'wishlist',
      'cart',
      'payment',
    ];
    return validTabs.includes(initialTab) ? initialTab : 'home';
  });

  useEffect(() => {
    const newCurrentTab = (searchParams.get('tab') as TabId) || 'home';
    setActiveTab(newCurrentTab);
  }, [searchParams]);

  const handleTabChange = (tabId: TabId) => {
    if (!isDemoMode) return;
    if (tabId === activeTab) return;

    console.log(
      `%c${DEMO_SENTENCE_PREFIX} Switching User Dashboard Tab.`,
      'color: #7c3aed'
    );
    setActiveTab(tabId);
    const newUrl = `${pathname}?tab=${tabId}`;
    window.history.pushState({}, '', newUrl);
  };

  useEffect(() => {
    const handlePopState = () => {
      const newSearchParams = new URLSearchParams(window.location.search);
      const newUrlTab = (newSearchParams.get('tab') as TabId) || 'home';
      setActiveTab(newUrlTab);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Cart/Wishlist Stores
  const totalCartAmount = useCartStore(selectTotalItems);
  const totalWishlistAmount = useWishlistStore(selectWishlistTotalItems);

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
    if (!pageData) return [];

    const cartSentence =
      totalCartAmount === 1
        ? `${totalCartAmount} Product`
        : `${totalCartAmount} Products`;

    const wishlistSentence =
      totalWishlistAmount === 1
        ? `${totalWishlistAmount} Product`
        : `${totalWishlistAmount} Products`;

    return createTabItems(
      cartSentence,
      wishlistSentence,
      pageData,
      handleTabChange
    );
  }, [totalCartAmount, totalWishlistAmount, pageData]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);
  const currentTab = tabItems.find((item) => item.id === activeTab);

  const contentClassName = clsx(
    'flex-1 transition-all duration-300',
    isSidebarCollapsed ? 'lg:ml-[79px]' : 'lg:ml-[288px]'
  );

  if (isLoading || !pageData) {
    return <div>Loading your Dashboard...</div>;
  }

  return (
    <div className='flex flex-1'>
      <div className='hidden lg:block fixed top-0 bottom-0'>
        <DashboardSidebar
          user={pageData.user}
          activeMenuId={activeTab}
          menuItems={sidebarItems}
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={handleToggleSidebar}
          onTabChange={handleTabChange}
          className={`pt-[53.42px]`}
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
            'fixed bottom-0 top-0 left-0 z-50 transform transition-all duration-300 flex',
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <DashboardSidebar
            user={pageData.user}
            activeMenuId={activeTab}
            menuItems={sidebarItems}
            isCollapsed={true}
            toggleSidebar={() => setIsMobileSidebarOpen(false)}
            onTabChange={handleTabChange}
            className={`pt-[53.53px]`}
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
