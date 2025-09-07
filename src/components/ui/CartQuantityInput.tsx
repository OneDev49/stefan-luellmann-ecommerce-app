'use client';

import { useCartStore } from '@/store/cartStore';

interface CartQuantityInputProps {
  productId: string;
  quantity: number;
}

export default function CartQuantityInput({
  productId,
  quantity,
}: CartQuantityInputProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      updateQuantity(productId, value);
    }
  };

  const increaseQuantity = () => {
    updateQuantity(productId, quantity + 1);
  };
  const decreaseQuantity = () => {
    updateQuantity(productId, Math.max(1, quantity - 1));
  };

  return (
    <div className='flex items-center gap-1'>
      <button
        type='button'
        onClick={decreaseQuantity}
        className='px-2 py-1 border rounded'
      >
        -
      </button>
      <input
        type='number'
        min={1}
        value={quantity}
        onChange={handleChange}
        className='w-12 text-center border rounded'
      />
      <button
        type='button'
        onClick={increaseQuantity}
        className='px-2 py-1 border rounded'
      >
        +
      </button>
    </div>
  );
}
