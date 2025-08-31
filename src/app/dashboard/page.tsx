import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import DashboardClient from './_components/DashboardClient';
import { authOptions } from '../api/auth/[...nextauth]/route';

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
    select: { name: true, email: true, image: true },
  });

  return <DashboardClient user={user} />;
}
