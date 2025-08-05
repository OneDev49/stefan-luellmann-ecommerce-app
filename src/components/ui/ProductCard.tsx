import Link from 'next/link';
import Image from 'next/image';
import Rating from './Rating';
import Button from './Button';
import CartIcon from '../icons/ecommerce/CartIcon';
import HeartIcon from '../icons/ecommerce/HeartIcon';
import clsx from 'clsx';
import { Product } from '@prisma/client';
import { addToCart, addToWishlist } from '@/lib/cart-actions';
import { calculateAverageRating } from '@/lib/calculateRating';

interface ProductCardProps {
  variant?: 'standard' | 'compact' | 'sale';
  product: Product;
}

export default function ProductCard({
  variant = 'standard',
  product,
}: ProductCardProps) {
  const { average, totalCount } = calculateAverageRating(product);

  // General Helper
  const createActionHandler =
    (action: (product: any) => void) => (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      action(product);
    };

  // Handlers
  const handleAddToCart = createActionHandler(addToCart);
  const handleAddToWishlist = createActionHandler(addToWishlist);

  const wrapperClassNames = clsx(
    'group',
    'flex',
    'flex-col',
    'gap-3',
    'p-4',
    'bg-[linear-gradient(45deg,#051500,#0d3a00)]',
    'items-start',
    'w-[275px]',
    'rounded-2xl',
    'border-[#005103]',
    'border',
    'shadow-[0_4px_15px_3px_rgba(23,113,0,1)]'
  );

  const imageWrapperClassNames = clsx(
    'border',
    'border-white',
    'rounded-2xl',
    'overflow-hidden'
  );

  const imageClassNames = clsx(
    'group-hover:scale-105',
    'transition-all',
    'max-h-64',
    'object-cover'
  );

  const headingClassNames = clsx('underline text-2xl line-clamp-1 font-bold');

  const priceClassNames = clsx('text-3xl font-headings font-normal');

  if (variant === 'standard') {
    return (
      <Link className={wrapperClassNames} href={`/product/${product.slug}`}>
        <div className={imageWrapperClassNames}>
          <Image
            className={imageClassNames}
            src={product.imageUrl}
            alt={product.name}
            height={239}
            width={239}
          />
        </div>
        <h3 className={headingClassNames}>{product.name}</h3>
        <div className='flex items-center gap-2'>
          <Rating rating={average} size='small' />
          <span>({totalCount})</span>
        </div>
        <strong className={`${priceClassNames} mb-4`}>{product.price}€</strong>
        <div className='flex items-center gap-2'>
          <Button
            onClick={handleAddToCart}
            as='button'
            position='card'
            type='button'
            title={`Add ${product.name} to Cart`}
          >
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
            type='button'
            title={`Add ${product.name} to Wishlist`}
          >
            <>
              <HeartIcon />
            </>
          </Button>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link className={wrapperClassNames} href={`/product/${product.slug}`}>
        <div className={imageWrapperClassNames}>
          <Image
            className={imageClassNames}
            src={product.imageUrl}
            alt={product.name}
            height={239}
            width={239}
          />
        </div>
        <h3 className={headingClassNames}>{product.name}</h3>
        <strong className={`${priceClassNames} mb-4`}>{product.price}€</strong>
      </Link>
    );
  }

  if (variant === 'sale') {
    return (
      <Link className={wrapperClassNames} href={`/product/${product.slug}`}>
        <div className={`${imageWrapperClassNames} relative`}>
          <div className='absolute bg-red-700 h-8 grid place-items-center w-32 top-[8px] right-[-40px] rotate-45 z-50 will-change-transform'>
            On Sale
          </div>
          <Image
            className={imageClassNames}
            src={product.imageUrl}
            alt={product.name}
            height={239}
            width={239}
          />
        </div>
        <h3 className={headingClassNames}>{product.name}</h3>
        <div className='flex items-center gap-2'>
          <Rating rating={average} size='small' />
          <span>({totalCount})</span>
        </div>
        <div className='flex items-center gap-3 mb-4'>
          <span className='text-sm font-headings line-through font-normal'>
            {product.price}€
          </span>
          <strong className={`${priceClassNames} text-[#ff4545]`}>
            {product.reducedPrice || product.price}€
          </strong>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            onClick={handleAddToCart}
            as='button'
            position='card'
            type='button'
            title={`Add ${product.name} to Cart`}
          >
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
            type='button'
            title={`Add ${product.name} to Wishlist`}
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
