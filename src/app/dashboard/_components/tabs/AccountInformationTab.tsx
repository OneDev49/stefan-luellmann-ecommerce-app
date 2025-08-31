interface DashboardAccountInformationProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
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
