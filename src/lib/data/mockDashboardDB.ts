/**
 * @file Defines the mock dashboard database for the demo mode user dashboard.
 * @description Enables the usage of localStorage for user profile, payment methods and orders similar to how a database would act.
 * @see /dashboard/AccountInformationTab - Uses the profile mock dashboard database.
 * @see /dashboard/paymentTab - Uses the paymentMethods mock dashboard database.
 * @see /hooks/useDashboardData - Uses the complete mockDashboardDB to get/set the localStorage for the demoMode.
 */

import { PaymentMethod, UserProfile } from '@prisma/client';
import {
  demoOrders,
  demoPaymentMethods,
  demoUserProfile,
} from './mockUserData';
import { TabOrder } from '@/app/dashboard/_components/config/tabConfig';

const PROFILE_KEY = 'demo_user_profile';
const PAYMENT_KEY = 'demo_user_payments';
const ORDER_KEY = 'demo_user_orders';

function initialize<T>(key: string, defaultData: T): T {
  if (typeof window === 'undefined') return defaultData;
  const storedData = window.localStorage.getItem(key);
  if (storedData) {
    return JSON.parse(storedData);
  }

  window.localStorage.setItem(key, JSON.stringify(defaultData));
  return defaultData;
}

export const mockDashboardDB = {
  profile: {
    get: (): UserProfile => initialize(PROFILE_KEY, demoUserProfile),
    set: (data: UserProfile) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
      }
    },
  },
  paymentMethods: {
    get: (): PaymentMethod[] => initialize(PAYMENT_KEY, demoPaymentMethods),
    set: (data: PaymentMethod[]) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(PAYMENT_KEY, JSON.stringify(data));
      }
    },
  },
  orders: {
    get: (): TabOrder[] => initialize(ORDER_KEY, demoOrders),
    set: (data: TabOrder[]) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(ORDER_KEY, JSON.stringify(data));
      }
    },
  },
};
