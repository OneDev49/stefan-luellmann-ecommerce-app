import Link from 'next/link';
import Image from 'next/image';
import GitHubIcon from '../icons/brands/GitHubIcon';
import LinkedInIcon from '../icons/brands/LinkedInIcon';
import clsx from 'clsx';

export default function FooterLayout() {
  const hoverClassNames = clsx('hover:text-[#53ff5f] transition-all');

  return (
    <footer className='bg-[linear-gradient(180deg,rgb(2,47,0,0)_0%,#022800_10%)] pt-32 pb-4 px-4'>
      <div className='max-w-7xl m-auto flex flex-col gap-12'>
        <div className='border-red-600 border-4 rounded-2xl p-4 bg-black'>
          <strong>Disclaimer:</strong>
          <p>
            This is not a real E-Commerce Store. It does not sell any sort of
            products. Every product is purely fictional and has no affiliation
            to any real brand. <br /> This Website is completely non-commercial
            and only serves as a demonstration of the Development Skills of
            Stefan Lüllmann, the Developer of this Store. <br /> Visit my{' '}
            <a
              className='underline text-white'
              href='https://github.com/onedev49'
              rel='noreferrer noopener'
            >
              GitHub Page
            </a>{' '}
            or my{' '}
            <a
              className='underline text-white'
              href='https://linkedin.com/in/stefan-lüllmann/'
              rel='noreferrer noopener'
            >
              LinkedIn Page
            </a>{' '}
            to learn more about me or to get in contact with me.
          </p>
        </div>

        <div className='flex flex-col gap-8 justify-between md:flex-row md:gap-6'>
          <div className='flex flex-col items-center text-center gap-4 md:flex-row md:text-left md:gap-6 md:items-start'>
            <div>
              <Link href='/'>
                <Image
                  src='/images/entro_logo.webp'
                  width={280}
                  height={100}
                  alt='Entro - Your Computer Store'
                ></Image>
              </Link>
              <div className='pt-4'>
                <strong className='text-lg'>General Information:</strong>
                <p>
                  This Store is purely fictional. <br />
                  It has no affiliation with any real brand.
                </p>
              </div>
            </div>
            <div>
              <strong className='underline text-lg'>More of Entro</strong>
              <ul className='list-none p-0 m-0 underline text-white pt-1 flex flex-col gap-1'>
                <li>
                  <Link className={hoverClassNames} href='/legal-notice'>
                    Legal Notice
                  </Link>
                </li>
                <li>
                  <Link className={hoverClassNames} href='/privacy-policy'>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className={hoverClassNames} href='/about-us'>
                    About us
                  </Link>
                </li>
                <li>
                  <Link className={hoverClassNames} href='/help-center'>
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link className={hoverClassNames} href='/career'>
                    Career
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='flex flex-col items-center gap-8 text-center md:text-left sm:grid sm:grid-cols-2 sm:items-start'>
            <div>
              <strong className='underline text-lg'>Quick Navigation</strong>
              <ul className='list-none p-0 m-0 underline text-white pt-1 flex flex-col gap-1'>
                <li>
                  <Link className={hoverClassNames} href='/'>
                    Main Page
                  </Link>
                </li>
                <li>
                  <Link className={hoverClassNames} href='/login'>
                    Login
                  </Link>
                </li>
                <li>
                  <Link className={hoverClassNames} href='/register'>
                    Register
                  </Link>
                </li>
                <li>
                  <Link className={hoverClassNames} href='/pc-builder'>
                    PC-Builder
                  </Link>
                </li>
                <li>
                  <Link className={hoverClassNames} href='/search'>
                    Search Page
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <strong className='underline text-lg'>Categories</strong>
              <ul className='list-none p-0 m-0 underline text-white pt-1 flex flex-col gap-1'>
                <li>
                  <Link className={hoverClassNames} href='/search?category=cpu'>
                    CPU
                  </Link>
                </li>
                <li>
                  <Link className={hoverClassNames} href='/search?category=gpu'>
                    GPU
                  </Link>
                </li>
                <li>
                  <Link className={hoverClassNames} href='/search?category=ram'>
                    RAM
                  </Link>
                </li>
                <li>
                  <Link
                    className={hoverClassNames}
                    href='/search?category=storage'
                  >
                    Storage
                  </Link>
                </li>
                <li>
                  <Link
                    className={hoverClassNames}
                    href='/search?category=motherboard'
                  >
                    Motherboard
                  </Link>
                </li>
                <li>
                  <Link
                    className={hoverClassNames}
                    href='/search?category=power'
                  >
                    Power Supply
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <div className='flex flex-col gap-1 items-center md:items-start'>
            <strong className='underline text-lg'>Get to Know us:</strong>
            <div className='flex gap-2 items-center'>
              <Link
                className={hoverClassNames}
                href='https://github.com/onedev49'
              >
                <GitHubIcon height={25} width={25} />
              </Link>
              <Link
                className={hoverClassNames}
                href='https://linkedin.com/in/stefan-lüllmann'
              >
                <LinkedInIcon height={25} width={25} />
              </Link>
            </div>
          </div>
          <div className='border-t-2 border-white font-bold flex justify-center text-sm mt-2 pt-2 text-center'>
            <p>
              Complete Concept, Design and Code made and written by Stefan
              Lüllmann
              <br />
              Check the GitHub Repository for the full Licensing and the Source
              Code.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
