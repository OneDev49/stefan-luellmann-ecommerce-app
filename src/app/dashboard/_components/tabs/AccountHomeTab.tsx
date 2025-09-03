import AddressCardIcon from '@/components/icons/ecommerce/AddressCardIcon';
import HeartIcon from '@/components/icons/ecommerce/HeartIcon';
import MapPinIcon from '@/components/icons/ecommerce/MapPinIcon';
import ShippingIcon from '@/components/icons/ecommerce/ShippingIcon';
import clsx from 'clsx';
import Link from 'next/link';

interface DashboardAccountHomeProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
}

const listItems = [
  {
    heading: 'Latest Orders',
    text: 'Checkout the last orders you made on Entro, including when they arrive and when you placed the order.',
    href: '/dashboard?tab=history',
    link: 'Go to Order History',
    image: <ShippingIcon height={30} width={30} />,
  },
  {
    heading: 'Your Wishlist',
    text: 'See the Products you currently have inside your Wishlist. Add them to your Cart or remove Products from your Wishlist.',
    href: '/dashboard?tab=wishlist',
    link: 'Go to your Wishlist',
    image: <HeartIcon height={30} width={30} />,
  },
  {
    heading: 'Shipping Address',
    text: 'Manage your saved addresses, edit them or update the existing ones.',
    href: '/dashboard?tab=history',
    link: 'Go to Shipping Addresses',
    image: <MapPinIcon height={30} width={30} />,
  },
  {
    heading: 'Profile Information',
    text: 'Manage the profile information of your account. Edit your Name and E-Mail or your Password',
    href: '/dashboard?tab=information',
    link: 'Go to Profile Information',
    image: <AddressCardIcon height={30} width={30} />,
  },
];

export default function DashboardAccountHome({
  user,
}: DashboardAccountHomeProps) {
  const listItem = clsx(
    'rounded-2xl hover:shadow-[0_4px_15px_3px_rgba(23,113,0,1)] transition-all'
  );
  const listHeadingClassName = clsx('text-3xl font-bold');
  const listItemClassName = clsx(
    'relative bg-[linear-gradient(210deg,#002104_24%,#003606_37%,#002104_61%)] pt-4 px-6 pb-6 border border-[#006103] rounded-2xl flex flex-col gap-4 overflow-hidden'
  );
  const listAbsoluteClassName = clsx(
    '-top-2 -right-2 w-16 h-16 absolute rounded-full border-[#006103] border shadow-[0_4px_15px_3px_rgba(23,113,0,1)] grid place-items-center'
  );
  const listLinkClassName = clsx(
    'underline hover:text-[#53ff5f] transition-all'
  );

  return (
    <div className='pt-10 w-[95%] m-auto space-y-8'>
      <div className='border-b border-[#555555] w-[50%] pb-3 space-y-1'>
        <h1 className='text-4xl font-bold'>Welcome {user.name}</h1>
        <p>
          This is your Account Dashboard. You can manage your Account from here.
        </p>
      </div>
      <ul className='list-none px-0 py-4 m-0 grid-cols-2 grid max-w-4xl w-[95%] gap-12'>
        {listItems.map((item) => (
          <li key={item.heading} className={listItem}>
            <div className={listItemClassName}>
              <div className={listAbsoluteClassName}>{item.image}</div>
              <h2 className={listHeadingClassName}>{item.heading}</h2>
              <p>{item.text}</p>
              <Link className={listLinkClassName} href={item.href}>
                {item.link}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
