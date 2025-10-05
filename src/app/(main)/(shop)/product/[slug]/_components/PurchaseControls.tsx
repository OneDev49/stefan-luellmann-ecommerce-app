'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { ProductCardType } from '@/types/product';

import QuantitySelector from '@/components/ui/ProductQuantitySelector';
import Button from '@/components/ui/Button';
import HeartIcon from '@/components/icons/ecommerce/HeartIcon';
import CartIcon from '@/components/icons/ecommerce/CartIcon';

interface PurchaseControlsProps {
  product: ProductCardType;
}

export default function PurchaseControls({ product }: PurchaseControlsProps) {
  /* Quantity State for Quantity Input field */
  const [quantity, setQuantity] = useState(1);

  /* Zustand Cart and Wishlist State Management */
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const isInWishlist = useWishlistStore((state) =>
    state.isProductInWishlist(product.id)
  );

  /* Maximum Amount for the Quantity Input field */
  const DEFAULT_MAX_QUANTITY = 10;

  /* Handlers for PurchaseButtons */
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

  return (
    <div className='flex flex-col gap-4 items-start'>
      <div className='flex flex-col sm:flex-row gap-4'>
        <QuantitySelector
          maxQuantity={DEFAULT_MAX_QUANTITY}
          onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
        />
        <Button
          as='button'
          type='button'
          onClick={handleAddToCart}
          variant='primary'
          className='text-lg py-1 px-2 rounded-lg'
          position='standalone'
          children={
            <>
              <CartIcon />
              <span>Add to Cart</span>
            </>
          }
        />
      </div>

      <Button
        as='button'
        type='button'
        onClick={handleAddToWishlist}
        variant='tertiary'
        className='text-lg py-1 px-2 rounded-lg'
        position='standalone'
        children={
          <>
            {isInWishlist ? (
              <HeartIcon variant='solid' />
            ) : (
              <HeartIcon variant='regular' />
            )}
            <span>Add to Wishlist</span>
          </>
        }
      />
    </div>
  );
}
