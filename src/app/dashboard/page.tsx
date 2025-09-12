import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import DashboardClient from './_components/DashboardClient';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { TabOrder } from './_components/config/tabConfig';

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

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) redirect('/login');

  const userId = session.user.id;

  let user;
  try {
    user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, image: true },
    });
  } catch (err) {
    console.error('Prisma fetch error:', err);
    redirect('/login');
  }

  if (!user) {
    redirect('/login');
  }

  const demoOrders: TabOrder[] = getDemoOrders();

  return <DashboardClient user={user!} pageData={{ orders: demoOrders }} />;
}
