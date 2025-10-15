import { useCart } from '@/hooks/useCart';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import CartIcon from '@/components/icons/ecommerce/CartIcon';
import TrashIcon from '@/components/icons/ecommerce/TrashIcon';
import AnglesRightIcon from '@/components/icons/ui/AnglesRightIcon';
import CloseIcon from '@/components/icons/ui/CloseIcon';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderCartProps {
  onClose: () => void;
  className: string;
}

export default function HeaderCart({ onClose, className }: HeaderCartProps) {
  /* Use ONLY the wrapper hook - it handles everything */
  const { data: session, status } = useSession();
  const { items, removeFromCart, clearCart, isLoading } = useCart();

  // Calculate totals from items
  const totalCartValue = useMemo(() => {
    return items.reduce((total, item) => {
      const price = item.reducedPrice || item.price;
      return total + price * item.quantity;
    }, 0);
  }, [items]);

  const totalCartAmount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const handleRemoveFromCart = async (
    e: React.MouseEvent,
    productId: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromCart(productId);
  };

  const handleClearCart = async () => {
    clearCart();
  };

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <div className='h-8 animate-pulse bg-green-700 rounded-md'></div>
        <div className='h-8 animate-pulse bg-green-700 rounded-md'></div>
        <div className='h-8 animate-pulse bg-green-700 rounded-md'></div>
      </div>
    );
  }

  return (
    <>
      {items.length > 0 ? (
        <div className='space-y-5'>
          <div className='border-b border-gray-400'>
            <div className='space-y-1 border-b border-gray-400 pb-6'>
              <strong className='text-lg flex justify-between items-center'>
                <span>Products in Cart: </span>
                <span className='underline text-lg'>{totalCartAmount}</span>
              </strong>
              <strong className='text-lg flex justify-between items-center'>
                <span>Your Cart Value: </span>
                <span className='underline text-lg'>
                  {totalCartValue.toFixed(2)}€
                </span>
              </strong>
            </div>
            <div className='my-4 space-y-4'>
              <div>
                {session && session.user ? (
                  <Link href='/dashboard?tab=cart' onClick={onClose}>
                    <Button
                      as='button'
                      type='button'
                      variant='secondary'
                      position='card'
                      className='w-full justify-center'
                    >
                      Go To your Cart
                      <AnglesRightIcon />
                    </Button>
                  </Link>
                ) : (
                  <Link href='/register' onClick={onClose}>
                    <Button
                      as='button'
                      type='button'
                      variant='secondary'
                      position='card'
                      className='w-full justify-center'
                    >
                      Create a Account to save your Cart
                      <AnglesRightIcon />
                    </Button>
                  </Link>
                )}
              </div>
              <div className='flex justify-between'>
                <Button
                  href='/checkout'
                  onClick={onClose}
                  variant='primary'
                  position='card'
                >
                  <CartIcon height={20} width={20} />
                  To Checkout
                </Button>
                <Button
                  as='button'
                  type='button'
                  onClick={handleClearCart}
                  variant='danger'
                  position='card'
                >
                  <TrashIcon height={20} width={20} />
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
          <ul className='list-none m-0 p-0 space-y-3'>
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/product/${item.slug}`}
                  className='p-2 border border-[#1e9c29] rounded-lg flex gap-2 justify-between bg-[#103d22] hover:bg-[#134929] transition-colors'
                  onClick={onClose}
                >
                  <div className='flex gap-2'>
                    <div className='bg-white min-w-24 h-24 w-24 block rounded-lg overflow-hidden relative'>
                      {item.isOnSale && (
                        <div className='absolute text-sm bg-red-700 h-8 grid place-items-center w-32 top-[8px] right-[-40px] rotate-45 z-50 will-change-transform'>
                          On Sale
                        </div>
                      )}
                      <Image
                        className='object-contain w-full'
                        src={`${process.env.NEXT_PUBLIC_UPLOADTHING_URL}/${item.imageUrl}`}
                        height={90}
                        width={90}
                        alt={item.name}
                        draggable='false'
                        decoding='async'
                        loading='lazy'
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <strong className='line-clamp-1 text-lg'>
                        {item.name}
                      </strong>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm'>In Your Cart:</span>
                        <span>{item.quantity}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        {item.isOnSale && item.reducedPrice ? (
                          <>
                            <span className='text-sm'>Price:</span>
                            <span className='text-red-500 font-bold'>
                              {item.reducedPrice.toFixed(2)}€
                            </span>
                            <span className='text-xs text-red-500 line-through'>
                              {item.price.toFixed(2)}€
                            </span>
                          </>
                        ) : (
                          <>
                            <span className='text-sm'>Price:</span>
                            <span>{item.price.toFixed(2)}€</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='min-w-4'>
                    <Button
                      as='button'
                      variant='danger'
                      position='standalone'
                      onClick={(e) => handleRemoveFromCart(e, item.id)}
                      className='rounded-sm'
                    >
                      <CloseIcon height={20} width={20} />
                    </Button>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={className}>Your shopping cart is empty.</p>
      )}
    </>
  );
}
