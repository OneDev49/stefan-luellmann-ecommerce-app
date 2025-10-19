import { Metadata } from 'next';

import CheckoutContent from './_components/CheckoutContent';

export const metadata: Metadata = {
  title: 'Checkout',
  description:
    'Finish your Order or check on your current Shopping Cart content.',

  openGraph: {
    title: 'Checkout',
    description:
      'Finish your Order or check on your current Shopping Cart content.',
  },

  twitter: {
    title: 'Checkout',
    description:
      'Finish your Order or check on your current Shopping Cart content.',
  },
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
