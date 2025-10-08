'use client';

import { ProductCardType } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

import Rating from './Rating';
import Button from './Button';
import CartIcon from '../icons/ecommerce/CartIcon';
import HeartIcon from '../icons/ecommerce/HeartIcon';

interface ProductCardProps {
  variant?: 'standard' | 'compact' | 'sideways';
  product: ProductCardType;
  buttonClassName?: string;
}

export default function ProductCard({
  variant = 'standard',
  product,
  buttonClassName,
}: ProductCardProps) {
  /* Store AddToCart */
  const addToCart = useCartStore((state) => state.addToCart);

  /* Wishlist AddToWishlist */
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const isInWishlist = useWishlistStore((state) =>
    state.isProductInWishlist(product.id)
  );

  /* Button Handler */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  /* CSS Classnames */
  const wrapperClassNames = clsx(
    'group flex flex-col gap-3 p-4 bg-[linear-gradient(45deg,#051500,#0d3a00)] items-start rounded-2xl border-[#005103] border shadow-[0_4px_15px_3px_rgba(23,113,0,1)]',
    {
      'w-[275px]': variant === 'compact' || variant === 'standard',
    }
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
            <div className='absolute bg-red-700 h-8 grid place-items-center w-32 top-[8px] right-[-40px] rotate-45 z-10 will-change-transform'>
              On Sale
            </div>
          )}
          <Image
            className={imageClassNames}
            src={`${process.env.NEXT_PUBLIC_UPLOADTHING_URL}/${product.imageUrl}`}
            alt={product.name}
            height={239}
            width={239}
          />
        </div>
        <h3 className={headingClassNames}>{product.name}</h3>
        <div className='flex items-center gap-2'>
          <Rating rating={product.averageRating} size='small' />
          <span>({product.totalRatingCount})</span>
        </div>
        {product.isOnSale && product.reducedPrice !== null ? (
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
            onClick={handleAddToWishlist}
            as='button'
            variant='tertiary'
            position='card'
            type='button'
            title={`Add ${product.name} to Wishlist`}
            className={buttonClassName || undefined}
          >
            <>
              {isInWishlist ? (
                <HeartIcon variant='solid' />
              ) : (
                <HeartIcon variant='regular' />
              )}
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
            src={`${process.env.NEXT_PUBLIC_UPLOADTHING_URL}/${product.imageUrl}`}
            alt={product.name}
            height={239}
            width={239}
          />
        </div>
        <h3 className={headingClassNames}>{product.name}</h3>
        {product.isOnSale && product.reducedPrice !== null ? (
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

  if (variant === 'sideways') {
    return (
      <Link className={wrapperClassNames} href={`/product/${product.slug}`}>
        <div className='flex gap-4'>
          <div className={imageWrapperClassNames}>
            {product.isOnSale && (
              <div className='absolute bg-red-700 h-8 grid place-items-center w-32 top-[8px] right-[-40px] rotate-45 z-50 will-change-transform'>
                On Sale
              </div>
            )}
            <Image
              className={imageClassNames}
              src={`${process.env.NEXT_PUBLIC_UPLOADTHING_URL}/${product.imageUrl}`}
              alt={product.name}
              height={150}
              width={150}
            />
          </div>
          <div className='space-y-2'>
            <h3 className={headingClassNames}>{product.name}</h3>
            <div className='flex items-center gap-2'>
              <Rating rating={product.averageRating} size='small' />
              <span>({product.totalRatingCount})</span>
            </div>
            {product.isOnSale && product.reducedPrice !== null ? (
              <div className='flex flex-col'>
                <span className='text-lg font-headings line-through font-normal'>
                  {product.price}€
                </span>
                <div className='flex gap-3 font-bold text-[#ff4545]'>
                  <strong className={priceClassNames}>
                    {(product.reducedPrice || product.price).toFixed(2)}€
                  </strong>
                  <span className='text-base'>
                    (
                    {((product.reducedPrice / product.price - 1) * 100).toFixed(
                      0
                    )}
                    % Off)
                  </span>
                </div>
              </div>
            ) : (
              <strong className={`${priceClassNames} mb-4`}>
                {product.price.toFixed(2)}€
              </strong>
            )}
          </div>
        </div>

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
            onClick={handleAddToWishlist}
            as='button'
            variant='tertiary'
            position='card'
            type='button'
            title={`Add ${product.name} to Wishlist`}
            className={buttonClassName || undefined}
          >
            <>
              {isInWishlist ? (
                <>
                  <HeartIcon variant='solid' />
                  <span>Remove from Wishlist</span>
                </>
              ) : (
                <HeartIcon variant='regular' />
              )}
            </>
          </Button>
        </div>
      </Link>
    );
  }
}
