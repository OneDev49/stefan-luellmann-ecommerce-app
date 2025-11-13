import { TabId } from '../DashboardClient';
import { DashboardPageData, DashboardUser } from '@/hooks/useDashboardData';

import DashboardAccountHome from '../tabs/AccountHomeTab';
import DashboardOrderHistory from '../tabs/OrderHistoryTab';
import DashboardAccountInformation, {
  ProfileData,
} from '../tabs/AccountInformationTab';
import DashboardWishlist from '../tabs/WishlistTab';
import DashboardCart from '../tabs/CartTab';
import DashboardPayment from '../tabs/PaymentTab';
import { PaymentMethod } from '@prisma/client';

// Mock Interface for TabOrder
export interface TabOrder {
  id: string;
  products: { id: string; name: string; quantity: number; price: number }[];
  deliveryDate: string;
  status: 'delivered' | 'processing' | 'canceled';
  address: { street: string; zip: string; city: string; country: string };
}

interface BreadcrumbData {
  secondaryBreadcrumbs: {
    text: string;
    link: string;
  }[];
  mainBreadcrumb: string;
}

interface AccountHomeProps {
  onTabChange: (tabId: TabId) => void;
}
interface OrderHistoryProps {
  orders?: TabOrder[] | null;
}
interface AccountInfoProps {
  user: DashboardUser;
  initialUserProfile: ProfileData;
}
interface PaymentProps {
  user: DashboardUser;
  initialPaymentMethods: PaymentMethod[];
}
interface BaseTabItem {
  id: TabId;
  heading: string;
  text?: string;
  breadcrumbs: BreadcrumbData;
}

type HomeTabItem = BaseTabItem & {
  id: 'home';
  Component: React.ComponentType<AccountHomeProps>;
  props: AccountHomeProps;
};
type HistoryTabItem = BaseTabItem & {
  id: 'history';
  Component: React.ComponentType<OrderHistoryProps>;
  props: OrderHistoryProps;
};
type InfoTabItem = BaseTabItem & {
  id: 'information';
  Component: React.ComponentType<AccountInfoProps>;
  props: AccountInfoProps;
};
type PaymentTabItem = BaseTabItem & {
  id: 'payment';
  Component: React.ComponentType<PaymentProps>;
  props: PaymentProps;
};
type WishlistTabItem = BaseTabItem & {
  id: 'wishlist';
  Component: React.ComponentType;
  props?: never;
};
type CartTabItem = BaseTabItem & {
  id: 'cart';
  Component: React.ComponentType;
  props?: never;
};

type TabItem =
  | HomeTabItem
  | HistoryTabItem
  | InfoTabItem
  | PaymentTabItem
  | WishlistTabItem
  | CartTabItem;

const baseCrumbs = [
  { text: 'Homepage', link: '/' },
  { text: 'Dashboard', link: '/dashboard?tab=home' },
];

export function createTabItems(
  cartSentence: string,
  wishlistSentence: string,
  dashboardPageData: DashboardPageData,
  onTabChange: (tabId: TabId) => void
): TabItem[] {
  return [
    {
      id: 'home',
      heading: dashboardPageData.user
        ? `Welcome ${dashboardPageData.user.name}`
        : `Welcome!`,
      text: 'This is your Entro Account Dashboard. You can manage your Account from here.',
      Component: DashboardAccountHome,
      props: { onTabChange },
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
      props: {
        user: dashboardPageData.user,
        initialPaymentMethods: dashboardPageData.paymentMethods,
      },
      breadcrumbs: {
        secondaryBreadcrumbs: baseCrumbs,
        mainBreadcrumb: 'Payment',
      },
    },
  ];
}
