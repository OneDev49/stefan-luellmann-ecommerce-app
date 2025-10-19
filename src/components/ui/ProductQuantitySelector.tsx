'use client';

import { useState, useEffect } from 'react';

import PlusIcon from '../icons/ui/PlusIcon';
import MinusIcon from '../icons/ui/MinusIcon';

interface QuantitySelectorProps {
  initialQuantity?: number;
  maxQuantity?: number;
  onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({
  initialQuantity = 1,
  maxQuantity = 10,
  onQuantityChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [inputValue, setInputValue] = useState<string>(String(initialQuantity));

  useEffect(() => {
    setQuantity(initialQuantity);
    setInputValue(String(initialQuantity));
  }, [initialQuantity]);

  const updateQuantity = (newQuantity: number) => {
    const validQuantity = Math.max(1, Math.min(newQuantity, maxQuantity));
    setQuantity(validQuantity);
    setInputValue(String(validQuantity));
    onQuantityChange(validQuantity);
  };

  const handleDecrement = () => {
    updateQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    updateQuantity(quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsedValue = parseInt(inputValue, 10);

    if (isNaN(parsedValue)) {
      setInputValue(String(quantity));
    } else {
      updateQuantity(parsedValue);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const buttonClassNames =
    'bg-green-700 py-1 px-2 cursor-pointer hover:bg-green-800 transition-all';

  return (
    <div className='flex justify-start'>
      <button
        type='button'
        onClick={handleDecrement}
        disabled={quantity <= 1}
        aria-label='Decrease Quantity'
        className={`${buttonClassNames} rounded-l-xl`}
      >
        <MinusIcon height={15} width={15} />
      </button>
      <input
        name='current_quantity'
        type='text'
        inputMode='numeric'
        className='text-center bg-green-900 text-lg max-w-12'
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        aria-label='Current Quantity'
      />
      <button
        type='button'
        onClick={handleIncrement}
        disabled={quantity >= maxQuantity}
        aria-label='Increase Quantity'
        className={`${buttonClassNames} rounded-r-xl`}
      >
        <PlusIcon height={15} width={15} />
      </button>
    </div>
  );
}
