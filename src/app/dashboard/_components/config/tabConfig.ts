import { TabId } from '../DashboardClient';

import DashboardAccountHome from '../tabs/AccountHomeTab';
import DashboardOrderHistory from '../tabs/OrderHistoryTab';
import DashboardAccountInformation from '../tabs/AccountInformationTab';
import DashboardWishlist from '../tabs/WishlistTab';
import DashboardCart from '../tabs/CartTab';
import DashboardPayment from '../tabs/PaymentTab';
import { DashboardPageData } from '../../page';

// Mock Interface for TabOrder
export interface TabOrder {
  id: string;
  products: { id: string; name: string; quantity: number; price: number }[];
  deliveryDate: string;
  status: 'delivered' | 'processing' | 'canceled';
  address: { street: string; zip: string; city: string; country: string };
}

interface TabItem<P = {}> {
  id: TabId;
  heading: string;
  text?: string;
  Component: React.ComponentType<P>;
  props: P;
  breadcrumbs: BreadcrumbData;
}

interface BreadcrumbData {
  secondaryBreadcrumbs: {
    text: string;
    link: string;
  }[];
  mainBreadcrumb: string;
}

const baseCrumbs = [
  { text: 'Homepage', link: '/' },
  { text: 'Dashboard', link: '/dashboard?tab=home' },
];

export function createTabItems(
  cartSentence: string,
  wishlistSentence: string,
  dashboardPageData: DashboardPageData
): TabItem<any>[] {
  return [
    {
      id: 'home',
      heading: dashboardPageData.user
        ? `Welcome ${dashboardPageData.user.name}`
        : `Welcome!`,
      text: 'This is your Entro Account Dashboard. You can manage your Account from here.',
      Component: DashboardAccountHome,
      props: { user: dashboardPageData.user },
      breadcrumbs: {
        secondaryBreadcrumbs: baseCrumbs,
        mainBreadcrumb: 'Account',
      },
    },
    {
      id: 'history',
      heading: 'Orders',
      text: 'You are currently viewing all of your Orders.',
      Component: DashboardOrderHistory,
      props: { orders: dashboardPageData.orders },
      breadcrumbs: {
        secondaryBreadcrumbs: baseCrumbs,
        mainBreadcrumb: 'Order History',
      },
    },
    {
      id: 'information',
      heading: 'Account',
      text: 'You are viewing your Account Information.',
      Component: DashboardAccountInformation,
      props: {
        user: dashboardPageData.user,
        initialUserProfile: dashboardPageData.profile,
      },
      breadcrumbs: {
        secondaryBreadcrumbs: baseCrumbs,
        mainBreadcrumb: 'Account Information',
      },
    },
    {
      id: 'wishlist',
      heading: 'Wishlist',
      text: `You currently have ${wishlistSentence} in your Wishlist.`,
      Component: DashboardWishlist,
      props: {},
      breadcrumbs: {
        secondaryBreadcrumbs: baseCrumbs,
        mainBreadcrumb: 'Wishlist',
      },
    },
    {
      id: 'cart',
      heading: 'Shopping Cart',
      text: `You currently have ${cartSentence} in your Shopping Cart.`,
      Component: DashboardCart,
      props: {},
      breadcrumbs: {
        secondaryBreadcrumbs: baseCrumbs,
        mainBreadcrumb: 'Shopping Cart',
      },
    },
    {
      id: 'payment',
      heading: 'Payment Information',
      text: 'Update, Edit or Remove your current Payment Information.',
      Component: DashboardPayment,
      props: {
        user: dashboardPageData.user,
        paymentMethods: dashboardPageData.paymentMethods,
      },
      breadcrumbs: {
        secondaryBreadcrumbs: baseCrumbs,
        mainBreadcrumb: 'Payment',
      },
    },
  ];
}
