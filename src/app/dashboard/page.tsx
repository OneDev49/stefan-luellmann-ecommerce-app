import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import DashboardClient from './_components/DashboardClient';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { TabOrder } from './_components/config/tabConfig';

function getDemoOrders(): TabOrder[] {
  return [
    {
      id: 'order1',
      products: [
        { id: 'p1', name: 'Product A', quantity: 2, price: 20 },
        { id: 'p2', name: 'Product B', quantity: 1, price: 15 },
      ],
      deliveryDate: '2025-09-01',
      totalPrice: 55,
      status: 'delivered',
      address: {
        street: 'Main Street 1',
        zip: '12345',
        city: 'Berlin',
        country: 'Germany',
      },
    },
    {
      id: 'order2',
      products: [{ id: 'p3', name: 'Product C', quantity: 1, price: 100 }],
      deliveryDate: '2025-09-05',
      totalPrice: 100,
      status: 'to_process',
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
