import Button from '@/components/ui/Button';
import {
  selectWishlistValue,
  selectWishlistTotalItems,
  useWishlistStore,
} from '@/store/wishlistStore';
import { DashboardUser } from '../DashboardClient';
import Image from 'next/image';
import Link from 'next/link';
import ChevronLeftIcon from '@/components/icons/ui/ChevronLeftIcon';
import CloseIcon from '@/components/icons/ui/CloseIcon';
import Rating from '@/components/ui/Rating';
import { useCartStore } from '@/store/cartStore';
import CartIcon from '@/components/icons/ecommerce/CartIcon';

interface DashboardWishlistProps {
  user: DashboardUser;
}

export default function DashboardWishlist({ user }: DashboardWishlistProps) {
  /* Zustand Cart Store */
  const addToCart = useCartStore((state) => state.addToCart);

  /* Zustand Wishlist Store */
  const wishlistItems = useWishlistStore((state) => state.items);
  const totalWishlistValue = useWishlistStore(selectWishlistValue);
  const totalWishlistAmount = useWishlistStore(selectWishlistTotalItems);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  const handleRemoveFromWishlist = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromWishlist(productId);
  };

  return (
    <div className='py-12 max-w-5xl w-[95%] space-y-6'>
      {wishlistItems.length > 0 ? (
        <>
          <div>
            <div className='grid grid-cols-[1fr_16fr_4fr_2fr] px-4 gap-4'>
              <div></div>
              <strong>Product</strong>
              <strong>Subtotal</strong>
              <div></div>
            </div>
            <ol className='p-0 m-0 list-none border-y border-[#3a3a3a]'>
              {wishlistItems.map((item, index) => {
                return (
                  <li
                    key={index}
                    className='grid grid-cols-[1fr_16fr_4fr_2fr] gap-4 px-4 py-4 items-center hover:bg-green-950 transition-colors rounded-md select-none'
                  >
                    <div>
                      <Button
                        as='button'
                        type='button'
                        onClick={(e) => handleRemoveFromWishlist(e, item.id)}
                        className='bg-red-500 rounded-sm'
                        title={`Remove ${item.name} from your Cart`}
                        variant='danger'
                        position='standalone'
                      >
                        <CloseIcon height={20} width={20} />
                      </Button>
                    </div>

                    <Link
                      href={`/product/${item.slug}`}
                      className='flex gap-4 group'
                    >
                      <div className='max-w-28 h-full rounded-xl overflow-hidden relative'>
                        {item.isOnSale && (
                          <div className='absolute select-none bg-red-700 h-6 grid place-items-center w-40 top-[20px] right-[-40px] rotate-45 z-50 will-change-transform text-sm'>
                            On Sale
                          </div>
                        )}
                        <Image
                          className='object-contain w-full group-hover:scale-105 transition-all'
                          src={`https://utfs.io/a/5sfnefg5kv/${item.imageUrl}`}
                          height={115}
                          width={115}
                          alt={item.name}
                          draggable='false'
                          loading='eager'
                        />
                      </div>
                      <div className='flex flex-col justify-center gap-2'>
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
                        as='button'
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
      <div className='flex justify-between items-start'>
        <Button variant='secondary' href='/search'>
          <ChevronLeftIcon height={20} />
          {totalWishlistAmount > 0 ? 'Continue Shopping' : 'Browse our Store'}
        </Button>
        {wishlistItems.length > 0 && (
          <div className='space-y-6'>
            <p className='space-x-20'>
              <span>Subtotal:</span>
              <strong>{totalWishlistValue.toFixed(2)}€</strong>
            </p>
            <Button
              as='button'
              type='button'
              variant='primary'
              className='w-full justify-center'
              onClick={() => {
                wishlistItems.forEach((item) => {
                  addToCart(item, 1);
                  removeFromWishlist(item.id);
                });
              }}
            >
              Add all to Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
