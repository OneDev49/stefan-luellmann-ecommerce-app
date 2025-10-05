import type { Metadata } from 'next';
import './globals.css';
import { ImprovedToaster } from '@/components/ui/ImprovedToaster';
import AuthProvider from '@/components/providers/AuthProvider';
import { metadataConfig } from './(main)/_components/config/metadataConfig';

export const metadata: Metadata = metadataConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='font-texts text-white bg-[#001B03]'>
        <AuthProvider>
          {children}
          <ImprovedToaster
            position='bottom-right'
            reverseOrder={false}
            toastOptions={{
              className: 'bg-gray-800 text-white border border-gray-700',
              duration: 2000,
            }}
            max={5}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
