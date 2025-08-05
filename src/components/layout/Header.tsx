import Link from 'next/link';
import Image from 'next/image';
import UserIcon from '../icons/ecommerce/UserIcon';
import HeartIcon from '../icons/ecommerce/HeartIcon';
import CartIcon from '../icons/ecommerce/CartIcon';
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
          <Link href='/search?category=cpu'>CPU</Link>
          <Link href='/search?category=motherboard'>Motherboard</Link>
          <Link href='/search?category=ram'>RAM</Link>
          <Link href='/search?category=storage'>Storage</Link>
          <Link href='/search?category=gpu'>GPU</Link>
          <Link href='/search?category=power'>Power Supplies</Link>
          <Link href='/search?category=cases'>Cases</Link>
          <Link href='/search?category=cooling'>Cooling</Link>
          <Link href='/search?category=monitor'>Monitors</Link>
          <Link href='/search?category=keyboard'>Keyboard</Link>
          <Link href='/search?category=mouse'>Mice</Link>
          <Link href='/search?category=headset'>Headsets</Link>
          <Link href='/search?category=casefan'>Case Fans</Link>
          <Link href='/search?category=laptop'>Laptops</Link>
          <Link href='/search?category=microphone'>Microphones</Link>
          <Link href='/search?category=webcam'>Webcams</Link>
        </div>
      </div>
    </header>
  );
}
