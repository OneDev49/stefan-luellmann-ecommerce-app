import { DashboardUser } from '../DashboardClient';

interface DashboardAccountInformationProps {
  user: DashboardUser;
}

export default function DashboardAccountInformation({
  user,
}: DashboardAccountInformationProps) {
  return (
    <div>
      Account Information {user.name} {user.email}
    </div>
  );
}
