'use client';

import Link from 'next/link';
import Image from 'next/image';
import Rating from './Rating';
import Button from './Button';
import CartIcon from '../icons/ecommerce/CartIcon';
import HeartIcon from '../icons/ecommerce/HeartIcon';
import clsx from 'clsx';
import { Product } from '@prisma/client';
import { calculateAverageRating } from '@/lib/calculateRating';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  variant?: 'standard' | 'compact' | 'sale';
  product: Product;
  buttonClassName?: string;
}

export default function ProductCard({
  variant = 'standard',
  product,
  buttonClassName,
}: ProductCardProps) {
  const { average, totalCount } = calculateAverageRating(product);

  /* Store AddToCart */
  const addToCart = useCartStore((state) => state.addToCart);

  /* Button Handler */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    console.log('Added to Cart!');
  };

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
    'overflow-hidden',
    'relative'
  );

  const imageClassNames = clsx(
    'group-hover:scale-105',
    'transition-all',
    'max-h-64',
    'object-cover'
  );

  const headingClassNames = clsx('underline text-2xl line-clamp-1 font-bold');

  const priceClassNames = clsx('text-3xl font-headings font-bold');

  if (variant === 'standard') {
    return (
      <Link className={wrapperClassNames} href={`/product/${product.slug}`}>
        <div className={imageWrapperClassNames}>
          {product.isOnSale && (
            <div className='absolute bg-red-700 h-8 grid place-items-center w-32 top-[8px] right-[-40px] rotate-45 z-50 will-change-transform'>
              On Sale
            </div>
          )}
          <Image
            className={imageClassNames}
            src={`https://utfs.io/a/5sfnefg5kv/${product.imageUrl}`}
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
        {product.isOnSale && product.reducedPrice ? (
          <div className='flex flex-col'>
            <span className='text-lg font-headings line-through font-normal'>
              {product.price}€
            </span>
            <div className='flex gap-3 font-bold text-[#ff4545]'>
              <strong className={priceClassNames}>
                {(product.reducedPrice || product.price).toFixed(2)}€
              </strong>
              <span className='text-base'>
                ({((product.reducedPrice / product.price - 1) * 100).toFixed(0)}
                % Off)
              </span>
            </div>
          </div>
        ) : (
          <strong className={`${priceClassNames} mb-4`}>
            {product.price.toFixed(2)}€
          </strong>
        )}
        <div className='flex items-center gap-2'>
          <Button
            onClick={handleAddToCart}
            as='button'
            position='card'
            type='button'
            title={`Add ${product.name} to Cart`}
            className={buttonClassName || undefined}
          >
            <>
              <CartIcon />
              Add to Cart
            </>
          </Button>
          <Button
            as='button'
            variant='tertiary'
            position='card'
            type='button'
            title={`Add ${product.name} to Wishlist`}
            className={buttonClassName || undefined}
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
          {product.isOnSale && (
            <div className='absolute bg-red-700 h-8 grid place-items-center w-32 top-[8px] right-[-40px] rotate-45 z-50 will-change-transform'>
              On Sale
            </div>
          )}
          <Image
            className={imageClassNames}
            src={`https://utfs.io/a/5sfnefg5kv/${product.imageUrl}`}
            alt={product.name}
            height={239}
            width={239}
          />
        </div>
        <h3 className={headingClassNames}>{product.name}</h3>
        {product.isOnSale && product.reducedPrice ? (
          <div className='flex flex-col'>
            <span className='text-lg font-headings line-through font-normal'>
              {product.price}€
            </span>
            <div className='flex gap-3 font-bold text-[#ff4545]'>
              <strong className={priceClassNames}>
                {(product.reducedPrice || product.price).toFixed(2)}€
              </strong>
              <span className='text-base'>
                ({((product.reducedPrice / product.price - 1) * 100).toFixed(0)}
                % Off)
              </span>
            </div>
          </div>
        ) : (
          <strong className={`${priceClassNames} mb-4`}>
            {product.price.toFixed(2)}€
          </strong>
        )}
      </Link>
    );
  }
}
