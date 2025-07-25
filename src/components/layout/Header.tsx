import Link from 'next/link';
import Image from 'next/image';
import UserIcon from '../icons/ecommerce/UserIcon';
import HeartIcon from '../icons/ecommerce/HeartIcon';
import CartIcon from '../icons/ecommerce/CartIcon';
import SearchBar from '../ui/SearchBar';
import MenuIcon from '../icons/ui/MenuIcon';

export default function HeaderLayout() {
  return (
    <header className='sticky top-0 z-[999] left-0 right-0 bg-black'>
      <div className='flex justify-between px-4 py-1 items-center'>
        <Link href='/'>
          <Image
            src='/images/logo/entro_logo.webp'
            alt='Entro Logo'
            width={130}
            height={50}
          />
        </Link>
        <SearchBar />
        <div className='flex gap-4'>
          <div className='cursor-pointer'>
            <CartIcon width={48} height='100%' />
          </div>
          <div className='relative cursor-pointer'>
            <div className='absolute bg-[#0c4800] h-6 w-6 grid place-items-center top-0 -right-2 rounded-full text-[#53ff5f]'>
              0
            </div>
            <HeartIcon width={45} height='100%' />
          </div>
          <div className='flex gap-1'>
            <Link href='/dashboard'>
              <UserIcon
                height='100%'
                width={37}
                className='hover:text-[#53ff5f] transition-all'
              />
            </Link>
            <div className='underline flex flex-col'>
              <Link
                className='hover:text-[#53ff5f] transition-all'
                href='/login'
              >
                Login
              </Link>
              <Link
                className='hover:text-[#53ff5f] transition-all'
                href='/register'
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='border-white border-t border-b flex items-center text-lg'>
        <div>
          <MenuIcon
            height='100%'
            width={50}
            className='cursor-pointer py-2 px-3'
          />
        </div>
        <div className='border-x '>
          <Link className='px-3 py-2' href='/pc-builder'>
            PC Builder
          </Link>
        </div>
        <div className='px-3 flex gap-3'>
          <Link href='/search?=cpu'>CPU</Link>
          <Link href='/search?=ram'>RAM</Link>
          <Link href='/search?=motherboard'>Motherboard</Link>
          <Link href='/search?=power'>Power Supply</Link>
          <Link href='/search?=cooling'>Cooling Systems</Link>
          <Link href='/search?=cases'>Cases</Link>
          <Link href='/search?=sound'>Sound Cards</Link>
          <Link href='/search?=storage'>Storage</Link>
          <Link href='/search?=printer'>Printer</Link>
          <Link href='/search?=optical_drives'>Optical Drive</Link>
          <Link href='/search?=network_cards'>Network Cards</Link>
        </div>
      </div>
    </header>
  );
}
