'use client';

import { useState } from 'react';
import { Product } from '@prisma/client';
import { addToCart, addToWishlist } from '@/lib/cart-actions';
import QuantitySelector from '@/components/ui/QuantitySelector';
import Button from '@/components/ui/Button';
import HeartIcon from '@/components/icons/ecommerce/HeartIcon';
import CartIcon from '@/components/icons/ecommerce/CartIcon';

interface PurchaseControlsProps {
  product: Product;
}

export default function PurchaseControls({ product }: PurchaseControlsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of ${product.name} to Cart`);
    // TODO: Add Zustand add to cart later
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  return (
    <div className='flex flex-col gap-4 items-start'>
      <div className='flex gap-4'>
        <QuantitySelector
          maxQuantity={10}
          onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
        />
        <Button
          as='button'
          type='button'
          onClick={handleAddToCart}
          variant='primary'
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
        children={
          <>
            <HeartIcon />
            <span>Add to Wishlist</span>
          </>
        }
      />
    </div>
  );
}
