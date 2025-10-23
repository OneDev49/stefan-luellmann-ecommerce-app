import { useState } from 'react';
import { PaymentMethod } from '@prisma/client';
import { DashboardUser } from '../../page';
import useSWR, { useSWRConfig } from 'swr';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addPaymentMethodSchema,
  TAddPaymentMethodSchema,
} from '@/lib/validations/payment';

import PlusIcon from '@/components/icons/ui/PlusIcon';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import PaymentMethodCard from '../PaymentMethodCard';

interface DashboardPaymentProps {
  user: DashboardUser;
  initialPaymentMethods: PaymentMethod[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPayment({
  user,
  initialPaymentMethods,
}: DashboardPaymentProps) {
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  const {
    data: paymentMethods,
    error,
    isLoading,
  } = useSWR<PaymentMethod[]>('/api/user/payment', fetcher, {
    fallbackData: initialPaymentMethods,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TAddPaymentMethodSchema>({
    resolver: zodResolver(addPaymentMethodSchema),
  });

  // Add payment method
  const handleAddMethod = async (formData: TAddPaymentMethodSchema) => {
    const [expiryMonth, expiryYearSuffix] = formData.expiryDate.split('/');
    const expiryYear = parseInt(`20${expiryYearSuffix}`, 10);

    try {
      const response = await fetch('/api/user/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          expiryMonth: parseInt(expiryMonth, 10),
          expiryYear,
        }),
      });

      if (!response.ok) throw new Error('Failed to add payment method.');

      toast.success('Payment method added!');
      reset();
      setIsAddingNew(false);
      mutate('/api/user/payment');
    } catch (error) {
      toast.error('Could not add payment method.');
    }
  };

  // Delete payment method
  const handleDeleteMethod = async (methodId: string) => {
    if (!confirm('Are you sure you want to delete this payment method?'))
      return;

    try {
      const response = await fetch(`/api/user/payment/${methodId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete.');

      toast.success('Payment method deleted.');
      mutate('/api/user/payment');
    } catch (error) {
      toast.error('Could not delete payment method.');
    }
  };

  // Set default payment method
  const handleSetDefault = async (methodId: string) => {
    try {
      const response = await fetch(`/api/user/payment/${methodId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDefault: true }),
      });
      if (!response.ok) throw new Error('Failed to set default.');

      toast.success('Default payment method updated.');
      mutate('/api/user/payment');
    } catch (error) {
      toast.error('Could not set default method.');
    }
  };

  // Wait for fetcher to finish or show error
  if (isLoading) return <div>Loading payment methods...</div>;
  if (error || !paymentMethods)
    return <div>Failed to load payment methods.</div>;

  const inputClassNames =
    'peer block w-full rounded-lg border border-[#606060] bg-[#001b03] p-2 text-white shadow-sm focus-visible:outline-[#00b700] focus-visible:outline-1 focus-visible:outline';

  return (
    <div className='py-12 max-w-4xl space-y-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            onDelete={() => handleDeleteMethod(method.id)}
            onSetDefault={() => handleSetDefault(method.id)}
          />
        ))}
        <div
          className='border-[#4a4a4a] border-2 rounded-xl p-6 flex items-center justify-center hover:border-[#a7a7a7] transition-colors cursor-pointer group'
          onClick={() => setIsAddingNew(true)}
        >
          <div className='flex items-center flex-col gap-3'>
            <div className='bg-[#2d2d2d] w-16 h-16 grid place-items-center rounded-full'>
              <PlusIcon className='group-hover:text-[#fff] text-[#707070] transition-colors' />
            </div>
            <strong>Add new Card</strong>
          </div>
        </div>
      </div>

      {isAddingNew && (
        <form onSubmit={handleSubmit(handleAddMethod)} className='space-y-8'>
          <h2 className='text-2xl font-bold'>Add new Payment Method</h2>
          <div className='grid grid-cols-2 gap-8'>
            <div>
              <label htmlFor='cardHolderName' className='text-lg font-bold'>
                Card Holder Name
              </label>
              <input
                id='cardHolderName'
                type='text'
                className={inputClassNames}
                {...register('cardHolderName')}
              />
              {errors.cardHolderName && (
                <p className='text-red-500'>{errors.cardHolderName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='expiryDate' className='text-lg font-bold'>
                Expiry Date
              </label>
              <input
                id='expiryDate'
                type='text'
                placeholder='MM/YY'
                className={inputClassNames}
                {...register('expiryDate')}
              />
              {errors.expiryDate && (
                <p className='text-red-500'>{errors.expiryDate.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='last4' className='text-lg font-bold'>
                Last 4 Digits
              </label>
              <input
                id='last4'
                type='text'
                inputMode='numeric'
                pattern='\d{4}'
                maxLength={4}
                className={inputClassNames}
                {...register('last4')}
              />
              {errors.last4 && (
                <p className='text-red-500'>{errors.last4.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='provider' className='text-lg font-bold'>
                Payment Provider
              </label>
              <input
                id='provider'
                type='text'
                className={inputClassNames}
                {...register('provider')}
              />
              {errors.provider && (
                <p className='text-red-500'>{errors.provider.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='type' className='text-lg font-bold'>
                Payment Type
              </label>
              <select
                id='type'
                className={inputClassNames}
                {...register('type')}
              >
                <option selected>Select Type...</option>
                <option value='CREDIT_CARD'>Credit Card</option>
                <option value='PAYPAL'>PayPal</option>
              </select>
              {errors.type && (
                <p className='text-red-500'>{errors.type.message}</p>
              )}
            </div>
          </div>
          <div className='flex gap-4'>
            <Button
              as='button'
              type='submit'
              variant='primary'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Payment Method'}
            </Button>
            <Button
              as='button'
              type='button'
              variant='secondary'
              onClick={() => setIsAddingNew(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
