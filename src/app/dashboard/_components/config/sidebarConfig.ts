import HomeIcon from '@/components/icons/ecommerce/HomeIcon';
import CartIcon from '@/components/icons/ecommerce/CartIcon';
import HeartIcon from '@/components/icons/ecommerce/HeartIcon';
import ShippingIcon from '@/components/icons/ecommerce/ShippingIcon';
import AddressCardIcon from '@/components/icons/ecommerce/AddressCardIcon';
import MoneyCheckIcon from '@/components/icons/ecommerce/MoneyCheckIcon';

import { TabId } from '../DashboardClient';

export type SidebarItem = {
  id: TabId;
  label: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const sidebarItems: SidebarItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: HomeIcon,
  },
  {
    id: 'history',
    label: 'Orders',
    icon: ShippingIcon,
  },
  {
    id: 'information',
    label: 'Personal Information',
    icon: AddressCardIcon,
  },
  {
    id: 'wishlist',
    label: 'Wishlist',
    icon: HeartIcon,
  },
  {
    id: 'cart',
    label: 'Shopping Cart',
    icon: CartIcon,
  },
  {
    id: 'payment',
    label: 'Payment',
    icon: MoneyCheckIcon,
  },
];
