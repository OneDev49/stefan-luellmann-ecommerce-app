'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import DashboardClient from './_components/DashboardClient';

export default function DashboardPage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  if (status === 'loading') {
    return <div>Loading your Dashboard...</div>;
  }

  return <DashboardClient />;
}
