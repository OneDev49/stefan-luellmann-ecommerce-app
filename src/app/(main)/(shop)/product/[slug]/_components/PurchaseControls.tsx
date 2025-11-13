'use client';

import { useState } from 'react';
import { ProductCardType } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

import QuantitySelector from '@/components/ui/ProductQuantitySelector';
import Button from '@/components/ui/Button';
import HeartIcon from '@/components/icons/ecommerce/HeartIcon';
import CartIcon from '@/components/icons/ecommerce/CartIcon';
import Spinner from '@/components/ui/Spinner';

interface PurchaseControlsProps {
  product: ProductCardType;
}

const DEFAULT_MAX_QUANTITY = 10;

export default function PurchaseControls({ product }: PurchaseControlsProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart, isAdding } = useCart();
  const { addToWishlist, removeFromWishlist, isProductInWishlist } =
    useWishlist();

  const isCurrentlyAddingToCart = isAdding.has(product.id);
  const isInWishlist: boolean = isProductInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  const handleAddToWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const buttonClassName = 'text-lg py-1 px-2 rounded-lg';

  return (
    <div className='flex flex-col gap-4 items-start'>
      <div className='flex gap-4'>
        <QuantitySelector
          maxQuantity={DEFAULT_MAX_QUANTITY}
          onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
        />
        <Button
          type='button'
          onClick={handleAddToCart}
          variant='primary'
          className={buttonClassName}
          position='standalone'
        >
          {isCurrentlyAddingToCart ? <Spinner /> : <CartIcon />}
          <span>Add to Cart</span>
        </Button>
      </div>
      <Button
        type='button'
        onClick={handleAddToWishlist}
        variant='tertiary'
        className={buttonClassName}
        position='standalone'
      >
        {isInWishlist ? (
          <HeartIcon variant='solid' />
        ) : (
          <HeartIcon variant='regular' />
        )}
        <span>Add to Wishlist</span>
      </Button>
    </div>
  );
}
