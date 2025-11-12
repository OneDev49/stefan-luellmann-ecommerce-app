'use client';

import {
  selectWishlistValue,
  selectWishlistTotalItems,
  useWishlistStore,
} from '@/store/wishlistStore';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

import Image from 'next/image';
import Link from 'next/link';
import ChevronLeftIcon from '@/components/icons/ui/ChevronLeftIcon';
import CloseIcon from '@/components/icons/ui/CloseIcon';
import Rating from '@/components/ui/Rating';
import Button from '@/components/ui/Button';
import CartIcon from '@/components/icons/ecommerce/CartIcon';

export default function DashboardWishlist() {
  const { addToCart } = useCart();
  const { items, removeFromWishlist } = useWishlist();
  const totalWishlistValue = useWishlistStore(selectWishlistValue);
  const totalWishlistAmount = useWishlistStore(selectWishlistTotalItems);

  const handleRemoveFromWishlist = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromWishlist(productId);
  };

  return (
    <div className='pt-12 pb-32 max-w-5xl space-y-6'>
      {items.length > 0 ? (
        <>
          <div>
            <div className='grid grid-cols-[1fr_16fr_4fr_2fr] px-4 gap-4'>
              <div></div>
              <strong>Product</strong>
              <strong>Subtotal</strong>
              <div></div>
            </div>
            <ol className='p-0 m-0 list-none border-y border-[#3a3a3a]'>
              {items.map((item, index) => {
                return (
                  <li
                    key={index}
                    className='grid grid-cols-[1fr_16fr_4fr_2fr] gap-4 px-2 sm:px-4 py-4 items-center hover:bg-green-950 transition-colors border-b border-green-900 last:border-0 select-none '
                  >
                    <div>
                      <Button
                        type='button'
                        onClick={(e) => handleRemoveFromWishlist(e, item.id)}
                        className='bg-red-500 rounded-sm'
                        title={`Remove ${item.name} from your Cart`}
                        aria-label={`Remove ${item.name} from your Cart`}
                        variant='danger'
                        position='standalone'
                      >
                        <CloseIcon height={20} width={20} />
                      </Button>
                    </div>

                    <Link
                      href={`/product/${item.slug}`}
                      className='flex flex-col sm:flex-row gap-4 group'
                    >
                      <div className='max-w-28 h-full rounded-xl overflow-hidden relative'>
                        {item.isOnSale && (
                          <div className='absolute select-none bg-red-700 h-4 md:h-6 grid place-items-center w-32 md:w-40 top-3 md:top-5 -right-10 rotate-45 z-10 will-change-transform text-xs md:text-sm'>
                            On Sale
                          </div>
                        )}
                        <Image
                          unoptimized
                          className='object-contain w-full group-hover:scale-105 transition-all'
                          src={`${process.env.NEXT_PUBLIC_UPLOADTHING_URL}/${item.imageUrl}`}
                          height={115}
                          width={115}
                          alt={item.name}
                          draggable='false'
                          loading='eager'
                        />
                      </div>
                      <div className='flex flex-col justify-center gap-0 sm:gap-2'>
                        <h3 className='flex items-center gap-3'>
                          <span className='text-lg font-bold line-clamp-1 group-hover:underline'>
                            {item.name}
                          </span>
                        </h3>
                        <div className='flex items-center gap-1'>
                          <Rating rating={item.averageRating} size='small' />
                          <span>({item.totalRatingCount})</span>
                        </div>
                      </div>
                    </Link>
                    <div>
                      {item.reducedPrice &&
                      item.isOnSale &&
                      item.reducedPrice !== null ? (
                        <div>
                          <span className='text-sm font-headings line-through font-normal'>
                            {item.price.toFixed(2)}€
                          </span>
                          <div className='flex items-start gap-2 text-[#ff4545] font-bold font-headings'>
                            <strong className='text-xl font-headings'>
                              {item.reducedPrice.toFixed(2)}€
                            </strong>
                          </div>
                        </div>
                      ) : (
                        <div className='flex flex-col gap-2'>
                          <strong className='text-xl font-bold font-headings'>
                            {item.price.toFixed(2)}€
                          </strong>
                        </div>
                      )}
                    </div>
                    <div className='flex justify-center'>
                      <Button
                        type='button'
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          addToCart(item, 1);
                          removeFromWishlist(item.id);
                        }}
                        className='bg-[#022200] rounded-lg border border-[#006900] hover:bg-[#1c6632] transition-colors p-[8px_12px]'
                        title={`Add ${item.name} to your Cart`}
                        variant='free'
                      >
                        <CartIcon className='text-white' />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </>
      ) : (
        <div>Your Wishlist is empty</div>
      )}
      <div className='flex flex-col space-y-8'>
        {items.length > 0 && (
          <div className='space-y-6 flex justify-end items-end'>
            <div className='space-y-6'>
              <p className='space-x-5 sm:space-x-20'>
                <span>Subtotal:</span>
                <strong>{totalWishlistValue.toFixed(2)}€</strong>
              </p>
              <Button
                type='button'
                variant='primary'
                position='standalone'
                className='w-full justify-center px-4 py-2 rounded-md'
                onClick={() => {
                  items.forEach((item) => {
                    addToCart(item, 1);
                    removeFromWishlist(item.id);
                  });
                }}
              >
                <CartIcon />
                Add all to Cart
              </Button>
            </div>
          </div>
        )}
        <div className='flex'>
          <Button
            as={Link}
            variant='secondary'
            href='/search'
            position='standalone'
            className='py-2 px-4 rounded-md'
          >
            <ChevronLeftIcon height={20} />
            {totalWishlistAmount > 0 ? 'Continue Shopping' : 'Browse our Store'}
          </Button>
        </div>
      </div>
    </div>
  );
}
