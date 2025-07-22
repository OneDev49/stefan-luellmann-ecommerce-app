import Link from 'next/link';
import Image from 'next/image';
import Rating from './Rating';
import Button from './Button';
import CartIcon from '../icons/ecommerce/CartIcon';
import HeartIcon from '../icons/ecommerce/HeartIcon';
import clsx from 'clsx';
import { Product } from '@prisma/client';

interface ProductCardProps {
  variant?: 'standard' | 'compact' | 'sale';
  product: Product;
}

export default function ProductCard({
  variant = 'standard',
  product,
}: ProductCardProps) {
  // General Helper
  const createActionHandler = (action: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    action();
  };

  // Placeholder for now when clicking Add-To-Cart
  const handleAddToCartClick = () => {
    console.log(`Add to Cart clicked for: ${product.name}`);
    // TODO: Implement Zustand store logic here later.
  };

  // Placeholder for now when clicking Wishlist
  const handleAddToWishlistClick = () => {
    console.log(`Add to Wishlist clicked for: ${product.name}`);
    // TODO: Implement wishlist logic here later.
  };

  // Handlers
  const handleAddToCart = createActionHandler(handleAddToCartClick);
  const handleAddToWishlist = createActionHandler(handleAddToWishlistClick);

  if (variant === 'standard') {
    const wrapperClassNames = clsx(
      'group',
      'flex',
      'flex-col',
      'gap-3',
      'p-4',
      'bg-[linear-gradient(45deg,#051500,#0d3a00)]',
      'items-start',
      'w-[300px]',
      'rounded-2xl',
      'border-[#005103]',
      'border',
      'shadow-[0_4px_15px_3px_rgba(23,113,0,1)]'
    );

    return (
      <Link className={wrapperClassNames} href={product.slug}>
        <div className='border border-white rounded-2xl overflow-hidden'>
          <Image
            className='group-hover:scale-105 transition-all'
            src={product.imageUrl}
            alt={product.name}
            height={153}
            width={277}
          />
        </div>
        <h3 className='underline text-2xl font-normal'>{product.name}</h3>
        <div className='flex items-center gap-2'>
          <Rating rating={product.rating} size='small' />
          <span>({product.reviewCount})</span>
        </div>
        <strong className='text-3xl font-headings'>{product.price}€</strong>
        <div className='flex items-center gap-2'>
          <Button onClick={handleAddToCart} as='button' position='card'>
            <>
              <CartIcon />
              Add to Cart
            </>
          </Button>
          <Button
            onClick={handleAddToWishlist}
            as='button'
            variant='tertiary'
            position='card'
          >
            <>
              <HeartIcon />
            </>
          </Button>
        </div>
      </Link>
    );
  }
}
