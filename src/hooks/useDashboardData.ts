/**
 * @file Defines the useDashboardData hook for easy dashboard data fetching
 * @description Provides a easy way to handle both REALMODE and DEMOMODE dashboard data fetching.
 * @see /dashboard/_components/DashboardClient.tsx - Uses the hook to simplify dashboard data fetching.
 */

'use client';

import { TabOrder } from '@/app/dashboard/_components/config/tabConfig';
import { isDemoMode } from '@/config/site';
import { mockDashboardDB } from '@/lib/data/mockDashboardDB';
import { PaymentMethod, UserProfile } from '@prisma/client';
import { useSession } from 'next-auth/react';

import useSWR from 'swr';

const realFetcher = (url: string) => fetch(url).then((res) => res.json());

export interface DashboardUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface DashboardPageData {
  user: DashboardUser;
  profile: UserProfile | null;
  paymentMethods: PaymentMethod[];
  orders?: TabOrder[] | null;
}

export function useDashboardData() {
  const { data: session, status: sessionStatus } = useSession();

  const profileKey = session ? '/api/user/profile' : null;
  const paymentKey = session ? '/api/user/payment' : null;
  const ordersKey = session ? '/api/user/orders' : null;

  // useSWR fetch logic
  const { data: profile, isLoading: isProfileLoading } =
    useSWR<UserProfile | null>(
      profileKey,
      isDemoMode ? () => mockDashboardDB.profile.get() : realFetcher
    );
  const { data: paymentMethods, isLoading: arePaymentsLoading } = useSWR<
    PaymentMethod[]
  >(
    paymentKey,
    isDemoMode ? () => mockDashboardDB.paymentMethods.get() : realFetcher
  );
  const { data: orders, isLoading: areOrdersLoading } = useSWR<
    TabOrder[] | null
  >(ordersKey, () => mockDashboardDB.orders.get());

  const isLoading =
    sessionStatus === 'loading' ||
    isProfileLoading ||
    arePaymentsLoading ||
    areOrdersLoading;

  if (
    isLoading ||
    !session?.user ||
    profile === undefined ||
    paymentMethods === undefined ||
    orders === undefined
  ) {
    return { isLoading: true, pageData: null };
  }

  const currentUser: DashboardUser = {
    id: session.user.id,
    name: session.user.name ?? null,
    email: session.user.email ?? null,
    image: session.user.image ?? null,
  };

  const pageData: DashboardPageData = {
    user: currentUser,
    profile: profile,
    paymentMethods: paymentMethods,
    orders: [],
  };

  return { isLoading: false, pageData };
}
