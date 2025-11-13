import { Suspense } from 'react';

import HeaderLayout from '@/components/layout/Header';
import FooterLayout from '@/components/layout/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <HeaderLayout variant='full' />
      </Suspense>
      {children}
      <FooterLayout />
    </>
  );
}
