'use client';

import { PaymentMethod } from '@prisma/client';

import MasterCardIcon from '@/components/icons/brands/MasterCardIcon';
import PayPalIcon from '@/components/icons/brands/PayPalIcon';
import EllipsisVerticalIcon from '@/components/icons/ui/EllipsisVerticalIcon';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onDelete: () => void;
  onSetDefault: () => void;
}

export default function PaymentMethodCard({
  method,
  onDelete,
  onSetDefault,
}: PaymentMethodCardProps) {
  const cardNumberDisplay = `**** **** **** ${method.last4}`;
  const expiryDateDisplay = `${String(method.expiryMonth).padStart(
    2,
    '0'
  )}/${String(method.expiryYear).slice(-2)}`;

  return (
    <div
      className={`border-2 rounded-xl p-6 ${
        method.isDefault ? `border-[#00b700]` : 'border-[#4a4a4a]'
      }`}
    >
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          <div className='italic text-[#999999] flex items-center text-lg gap-2'>
            {method.type === 'PAYPAL' ? (
              <PayPalIcon height={28} width={23} />
            ) : (
              <MasterCardIcon height={28} width={36} />
            )}
            <span className='font-bold'>{method.provider}</span>
          </div>
          {method.isDefault && (
            <span className='text-xs text-[#00b700]'>Default</span>
          )}
        </div>
        <div className='relative group cursor-pointer'>
          <EllipsisVerticalIcon />
          <div className='absolute right-0 top-full w-48 bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 group-hover:block hidden'>
            {!method.isDefault && (
              <button
                onClick={onSetDefault}
                className='block w-full text-left px-4 py-2 text-sm text-gray-200 rounded-md hover:bg-gray-700'
              >
                Set as Default
              </button>
            )}
            <button
              onClick={onDelete}
              className='block w-full text-left px-4 py-2 text-sm text-red-400 rounded-md hover:bg-gray-700'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className='tracking-widest mt-4 mb-10'>
        <strong>{cardNumberDisplay}</strong>
      </div>
      <div className='grid grid-cols-[2fr_1fr] leading-tight'>
        <div className='flex flex-col'>
          <span className='text-gray-400 text-sm'>Card Holder Name</span>
          <span>{method.cardHolderName}</span>
        </div>
        <div className='flex flex-col'>
          <span className='text-gray-400 text-sm'>Expiry Date</span>
          <span>{expiryDateDisplay}</span>
        </div>
      </div>
    </div>
  );
}
