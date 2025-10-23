import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { TabOrder } from './_components/config/tabConfig';
import { PaymentMethod, UserProfile } from '@prisma/client';

import DashboardClient from './_components/DashboardClient';

function getDemoOrders(): TabOrder[] {
  return [
    {
      id: '#100299',
      products: [
        {
          id: 'aetherflux-9000',
          name: 'AetherFlux 9000',
          quantity: 2,
          price: 1299,
        },
        {
          id: 'zentheon-x9-9950k',
          name: 'Zentheon X9 9950K',
          quantity: 1,
          price: 699,
        },
      ],
      deliveryDate: '2025-09-01',
      status: 'delivered',
      address: {
        street: 'Main Street 1',
        zip: '12345',
        city: 'Berlin',
        country: 'Germany',
      },
    },
    {
      id: '#100321',
      products: [
        {
          id: 'aegis-prime-ion-zt990i',
          name: 'Aegis Prime Ion ZT990I',
          quantity: 1,
          price: 549,
        },
      ],
      deliveryDate: '2025-09-05',
      status: 'processing',
      address: {
        street: 'Second Street 2',
        zip: '54321',
        city: 'Munich',
        country: 'Germany',
      },
    },
  ];
}

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

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/login');

  const userId = session.user.id;

  try {
    const [user, profile, paymentMethods, orders] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, image: true },
      }),
      prisma.userProfile.findUnique({
        where: { userId: userId },
      }),
      prisma.paymentMethod.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' },
      }),
      Promise.resolve(getDemoOrders()),
    ]);

    if (!user) {
      redirect('/login');
    }

    const pageData: DashboardPageData = {
      user,
      profile,
      paymentMethods,
      orders,
    };

    return <DashboardClient pageData={pageData} />;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    redirect('/login');
  }
}
