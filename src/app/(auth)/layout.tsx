import Image from 'next/image';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='grid min-h-screen grid-cols-1 md:grid-cols-2'>
      <div className='p-4 bg-[linear-gradient(180deg,#004505,#000)] grid gap-4 place-items-center'>
        <Link href='/' className='block md:hidden'>
          <Image
            loading='eager'
            src='/images/logo/entro_logo.webp'
            height={99}
            width={281}
            alt='The Entro Logo'
          />
        </Link>
        {children}
      </div>
      <div className='min-h-full relative border-l border-[#868686] hidden md:block'>
        <div className='absolute inset-0'>
          <Image
            loading='eager'
            src='/images/RAM_Stick.webp'
            height={996}
            width={1826}
            alt='A Entro RAM Stick'
            className='h-full object-cover opacity-50'
          />
        </div>
        <div className='relative bg-[rgba(16,39,17,0.5)] flex flex-col items-center p-8 mt-[20vh] gap-4'>
          <Link href='/'>
            <Image
              loading='eager'
              src='/images/logo/entro_logo.webp'
              height={99}
              width={281}
              alt='The Entro Logo'
            />
          </Link>

          <p className='text-center text-[#00ff1e] underline text-3xl font-headings'>
            Next Generation
            <br />
            Computer Components
          </p>
        </div>
        <div className='absolute bottom-4 right-4 w-80 border-4 border-red-600 rounded-3xl py-2 px-4 flex flex-col gap-2'>
          <strong>Disclaimer:</strong>
          <p>
            This is not a real E-Commerce Store. Every Product is purely
            fictional. This is simply a Project Showcase.
          </p>
        </div>
      </div>
    </main>
  );
}
