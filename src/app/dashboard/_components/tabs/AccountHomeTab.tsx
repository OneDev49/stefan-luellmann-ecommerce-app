import AddressCardIcon from '@/components/icons/ecommerce/AddressCardIcon';
import HeartIcon from '@/components/icons/ecommerce/HeartIcon';
import ShippingIcon from '@/components/icons/ecommerce/ShippingIcon';
import clsx from 'clsx';
import Link from 'next/link';
import { TabUser } from '../config/tabConfig';
import MoneyCheckIcon from '@/components/icons/ecommerce/MoneyCheckIcon';

interface DashboardAccountHomeProps {
  user: TabUser;
}

/* Grid Items */
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
    heading: 'Account Information',
    text: 'Manage your Profile Information and your Shipping Addresses.',
    href: '/dashboard?tab=information',
    link: 'Go to Profile Information',
    image: <AddressCardIcon height={30} width={30} />,
  },
  {
    heading: 'Payment Information',
    text: 'Manage your Payment Methods, edit existing ones or add new ones to your Account.',
    href: '/dashboard?tab=payment',
    link: 'Go to Payment Information',
    image: <MoneyCheckIcon height={30} width={30} />,
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
    <ul className='list-none px-0 pt-4 pb-16 m-0 md:grid-cols-2 grid max-w-4xl gap-6 md:gap-12'>
      {listItems.map((item, index) => (
        <li key={index} className={listItem}>
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
  );
}
