'use client';

import { useCartStore } from '@/store/cartStore';

import toast from 'react-hot-toast';
import CaretDownIcon from '../icons/ui/CaretDownIcon';
import CaretUpIcon from '../icons/ui/CaretUpIcon';

interface CartQuantityInputProps {
  productId: string;
  productName: string;
  quantity: number;
}

export default function CartQuantityInput({
  productId,
  productName,
  quantity,
}: CartQuantityInputProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      updateQuantity(productId, productName, value);
      value <= 100 && toast.success(`Updated ${productName} quantity.`);
    }
  };

  const increaseQuantity = () => {
    updateQuantity(productId, productName, quantity + 1);
    quantity < 100 && toast.success(`1 ${productName} added to your Cart.`);
  };
  const decreaseQuantity = () => {
    updateQuantity(productId, productName, Math.max(1, quantity - 1));
    quantity > 1 && toast.error(`1 ${productName} removed from your Cart.`);
  };

  return (
    <>
      <input
        type='number'
        min={1}
        max={100}
        value={quantity}
        onChange={handleChange}
        className='bg-transparent w-8 no-spinner text-center focus:bg-[#1a5e3c] focus:outline-none'
      />
      <div className='flex flex-col gap-1'>
        <button
          type='button'
          onClick={increaseQuantity}
          aria-label='Increase Quantity'
          className='bg-[#00520c] rounded-sm'
        >
          <CaretUpIcon height={15} />
        </button>
        <button
          type='button'
          onClick={decreaseQuantity}
          aria-label='Decrease Quantity'
          className='bg-[#00520c] rounded-sm'
        >
          <CaretDownIcon height={15} />
        </button>
      </div>
    </>
  );
}
