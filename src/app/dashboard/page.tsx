import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import DashboardClient from './_components/DashboardClient';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const session = await getServerSession(authOptions);
  const userId = session!.user!.id;
  const activeTab = searchParams.tab || 'home';

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, image: true },
  });

  if (!user) {
    toast.error('Error: User Not Found');
    redirect('/login');
  }

  return <DashboardClient user={user!} />;
}
