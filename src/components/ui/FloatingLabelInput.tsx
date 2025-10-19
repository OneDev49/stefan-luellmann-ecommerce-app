'use client';

import React, { useState, useEffect } from 'react';

import EyeIcon from '../icons/ui/EyeIcon';
import EyeSlashIcon from '../icons/ui/EyeSlashIcon';
import clsx from 'clsx';

interface FloatingLabelInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  label: string;
  initialValue?: string;
}

export default function FloatingLabelInput({
  label,
  id,
  type,
  initialValue = '',
  onChange,
  ...restProps
}: FloatingLabelInputProps) {
  if (!id) {
    throw new Error('FloatingLabelInput UI Component requires a "id" prop.');
  }

  const [value, setValue] = useState<string>(initialValue);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const shouldShowToggleButton = type === 'password' && value.length > 0;

  return (
    <div className='relative'>
      <input
        id={id}
        type={inputType}
        placeholder={label}
        className={clsx(
          'peer block w-full rounded-md border border-[#0c6600] bg-[#002f00] p-4 text-white shadow-sm placeholder-transparent focus-visible:outline-[#00b700] focus-visible:outline-1 focus-visible:outline',
          {
            ['pr-10']: type === 'password',
          }
        )}
        {...restProps}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className='absolute left-3 -top-2.5 origin-0 bg-[#002f00] rounded-lg border border-transparent px-3 text-sm text-gray-400 transition-all duration-300 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:scale-90 peer-focus:border-[#0c6600] cursor-text'
      >
        {label}
      </label>

      {shouldShowToggleButton && (
        <button
          type='button'
          onClick={toggleShowPassword}
          className='absolute top-4 right-3 text-gray-400 hover:text-white cursor-pointer'
        >
          {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
        </button>
      )}
    </div>
  );
}
