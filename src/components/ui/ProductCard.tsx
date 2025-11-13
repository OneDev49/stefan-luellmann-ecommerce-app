'use client';

import { ProductCardType } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

import Link from 'next/link';
import Image from 'next/image';
import Rating from './Rating';
import Button from './Button';
import CartIcon from '../icons/ecommerce/CartIcon';
import HeartIcon from '../icons/ecommerce/HeartIcon';
import Spinner from './Spinner';

interface ProductCardProps {
  variant?: 'standard' | 'compact';
  product: ProductCardType;
  buttonClassName?: string;
}

export default function ProductCard({
  variant = 'standard',
  product,
  buttonClassName,
}: ProductCardProps) {
  const { addToCart, isAdding } = useCart();
  const { addToWishlist, removeFromWishlist, isProductInWishlist } =
    useWishlist();

  const isCurrentlyAddingToCart = isAdding.has(product.id);
  const isInWishlist = isProductInWishlist(product.id);

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

  const priceClassNames = 'text-3xl font-headings font-bold';

  return (
    <Link
      className='group flex flex-col gap-3 p-4 bg-[linear-gradient(45deg,#051500,#0d3a00)] items-start rounded-2xl border-[#005103] border shadow-[0_4px_15px_3px_rgba(23,113,0,1)] w-[275px]'
      href={`/product/${product.slug}`}
    >
      <div className='border border-white rounded-2xl overflow-hidden relative'>
        {product.isOnSale && (
          <div className='absolute bg-red-700 h-8 grid place-items-center w-32 top-[8px] right-[-40px] rotate-45 z-50 will-change-transform'>
            On Sale
          </div>
        )}
        <Image
          className='group-hover:scale-105 transition-all max-h-64 object-cover'
          src={`${process.env.NEXT_PUBLIC_UPLOADTHING_URL}/${product.imageUrl}`}
          alt={product.name}
          height={239}
          width={239}
        />
      </div>
      <h3 className='underline text-2xl line-clamp-1 font-bold'>
        {product.name}
      </h3>
      {variant === 'standard' && (
        <div className='flex items-center gap-2'>
          <Rating rating={product.averageRating} size='small' />
          <span>({product.totalRatingCount})</span>
        </div>
      )}
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
              ({((product.reducedPrice / product.price - 1) * 100).toFixed(0)}%
              Off)
            </span>
          </div>
        </div>
      ) : (
        <strong className={`${priceClassNames} mb-4`}>
          {product.price.toFixed(2)}€
        </strong>
      )}
      {variant === 'standard' && (
        <div className='flex items-center gap-2'>
          <Button
            onClick={handleAddToCart}
            disabled={isCurrentlyAddingToCart}
            position='card'
            type='button'
            title={`Add ${product.name} to Cart`}
            className={buttonClassName || undefined}
          >
            {isCurrentlyAddingToCart ? <Spinner /> : <CartIcon />}
            Add to Cart
          </Button>
          <Button
            onClick={handleAddToWishlist}
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
      )}
    </Link>
  );
}
