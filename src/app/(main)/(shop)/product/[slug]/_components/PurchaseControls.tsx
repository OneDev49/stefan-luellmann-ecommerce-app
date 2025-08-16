'use client';

import { useState } from 'react';
import { Product } from '@prisma/client';
import { addToWishlist } from '@/lib/cart-actions';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import QuantitySelector from '@/components/ui/QuantitySelector';
import Button from '@/components/ui/Button';
import HeartIcon from '@/components/icons/ecommerce/HeartIcon';
import CartIcon from '@/components/icons/ecommerce/CartIcon';

interface PurchaseControlsProps {
  product: Product;
}

export default function PurchaseControls({ product }: PurchaseControlsProps) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  return (
    <div className='flex flex-col gap-4 items-center sm:items-start'>
      <div className='flex flex-col sm:flex-row gap-4'>
        <QuantitySelector
          maxQuantity={10}
          onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
        />
        <Button
          as='button'
          type='button'
          onClick={handleAddToCart}
          variant='primary'
          className='text-lg'
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
        className='text-lg'
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
