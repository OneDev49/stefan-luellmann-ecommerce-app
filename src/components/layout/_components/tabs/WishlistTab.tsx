import TrashIcon from '@/components/icons/ecommerce/TrashIcon';
import CloseIcon from '@/components/icons/ui/CloseIcon';
import Button from '@/components/ui/Button';
import {
  selectWishlistTotalItems,
  useWishlistStore,
} from '@/store/wishlistStore';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderWishlistProps {
  onClose: () => void;
  className: string;
}

export default function HeaderWishlist({
  onClose,
  className,
}: HeaderWishlistProps) {
  const wishlistItems = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const totalWishlistAmount = useWishlistStore(selectWishlistTotalItems);

  const handleRemoveFromWishlist = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromWishlist(productId);
  };

  return (
    <>
      {wishlistItems.length > 0 ? (
        <div className='space-y-5'>
          <div className='border-b border-gray-400'>
            <div className='space-y-1 border-b border-gray-400 pb-6'>
              <strong className='text-lg flex justify-between items-center'>
                <span>Products in Wishlist: </span>
                <span className='underline text-lg'>{totalWishlistAmount}</span>
              </strong>
            </div>
            <div className='flex justify-end my-4'>
              <Button
                as='button'
                type='button'
                onClick={clearWishlist}
                variant='danger'
                position='card'
              >
                <TrashIcon height={20} width={20} />
                Clear Cart
              </Button>
            </div>
          </div>
          <ul className='list-none m-0 p-0 space-y-3'>
            {wishlistItems.map((item) => (
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
                        src={`https://utfs.io/a/5sfnefg5kv/${item.imageUrl}`}
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
                      <div className='text-sm flex gap-2'>
                        <p
                          className={clsx({
                            ['text-[#00ff55]']: item.stockCount >= 100,
                            ['text-[#ffe100]']: item.stockCount < 100,
                            ['text-[#ff0000]']: item.stockCount === 0,
                          })}
                        >
                          {item.stockCount === 0
                            ? `Out of Stock`
                            : item.stockCount < 10 && item.stockCount > 0
                            ? `Limited Stock`
                            : `In Stock`}
                        </p>
                        <p>
                          |{' '}
                          {item.stockCount > 10 ? `>10` : `${item.stockCount}`}{' '}
                          in Storage
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='min-w-4'>
                    <Button
                      as='button'
                      type='button'
                      variant='danger'
                      position='standalone'
                      onClick={(e) => handleRemoveFromWishlist(e, item.id)}
                      className='bg-red-500 rounded-sm'
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
        <div>
          <p className={className}>Your wishlist is empty.</p>
        </div>
      )}
    </>
  );
}
