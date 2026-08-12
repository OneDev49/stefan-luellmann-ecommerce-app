import Link from 'next/link';

export default function NotFound() {
  const anchorClassName =
    'hover:underline text-green-400 hover:text-green-200 transition-colors';

  return (
    <section className='relative'>
      <div className='relative min-h-svh flex flex-col justify-center max-w-7xl mx-auto px-4 pb-32 pt-16 gap-6'>
        <div className='flex items-start md:items-end gap-6 flex-col md:flex-row'>
          <div className='space-y-6'>
            <h1 className='text-5xl font-extrabold'>
              404... We couldn't find this page.
            </h1>
            <div>
              <p>We couldn't find the page you are looking for...</p>
              <p>
                You can navigate to our{' '}
                <Link className={anchorClassName} href='/'>
                  Homepage
                </Link>{' '}
                or find the product you are looking for on our{' '}
                <Link className={anchorClassName} href='/search'>
                  Search Page
                </Link>
                !
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
