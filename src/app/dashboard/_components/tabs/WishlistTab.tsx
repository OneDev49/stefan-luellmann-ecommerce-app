import TrashIcon from '@/components/icons/ecommerce/TrashIcon';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ui/ProductCard';
import {
  selectWishlistTotalItems,
  useWishlistStore,
} from '@/store/wishlistStore';

interface DashboardWishlistProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
}

export default function DashboardWishlist({ user }: DashboardWishlistProps) {
  /* Zustand Wishlist Store */
  const wishlistItems = useWishlistStore((state) => state.items);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const totalWishlistAmount = useWishlistStore(selectWishlistTotalItems);

  const wishlistSentence =
    totalWishlistAmount === 1
      ? `${totalWishlistAmount} Product`
      : `${totalWishlistAmount} Products`;

  return (
    <div className='pt-10 w-[95%] m-auto space-y-8'>
      <div className='border-b border-[#555555] w-[50%] pb-3 space-y-1'>
        <h1 className='text-4xl font-bold'>
          This is your Wishlist, {user.name}
        </h1>
        <p>
          Manage your current Wishlist, remove Products or add Products to your
          Cart.
        </p>
      </div>
      {wishlistItems && (
        <div className='max-w-5xl w-[95%] space-y-8'>
          <div className='flex justify-between'>
            <h2 className='text-2xl font-bold'>
              You have {wishlistSentence} inside your Wishlist.
            </h2>
            {totalWishlistAmount > 0 && (
              <Button
                as='button'
                type='button'
                variant='danger'
                onClick={clearWishlist}
                position='card'
              >
                <TrashIcon />
                Clear Wishlist
              </Button>
            )}
          </div>
          <ul className='p-0 m-0 list-none grid grid-cols-2 gap-12'>
            {wishlistItems.map((item) => (
              <li key={item.name}>
                <ProductCard product={item} variant='sideways' />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
