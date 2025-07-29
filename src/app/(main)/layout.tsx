import HeaderLayout from '@/components/layout/Header';
import FooterLayout from '@/components/layout/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderLayout />
      {children}
      <FooterLayout />
    </>
  );
}
