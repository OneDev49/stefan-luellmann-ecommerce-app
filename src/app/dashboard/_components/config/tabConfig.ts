import DashboardAccountHome from '../tabs/AccountHomeTab';
import DashboardOrderHistory from '../tabs/OrderHistoryTab';
import DashboardAccountInformation from '../tabs/AccountInformationTab';
import DashboardWishlist from '../tabs/WishlistTab';
import DashboardCart from '../tabs/CartTab';
import DashboardPayment from '../tabs/PaymentTab';

import { DashboardPageData, DashboardUser, TabId } from '../DashboardClient';

interface TabItem {
  id: TabId;
  heading: string;
  text?: string;
  Component: React.ComponentType<{
    user: DashboardUser;
    pageData?: DashboardPageData;
  }>;
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
  user: DashboardUser,
  cartSentence: string,
  wishlistSentence: string
): TabItem[] {
  return [
    {
      id: 'home',
      heading: `Welcome ${user.name}`,
      text: 'This is your Entro Account Dashboard. You can manage your Account from here.',
      Component: DashboardAccountHome,
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
      breadcrumbs: {
        secondaryBreadcrumbs: baseCrumbs,
        mainBreadcrumb: 'Payment',
      },
    },
  ];
}
