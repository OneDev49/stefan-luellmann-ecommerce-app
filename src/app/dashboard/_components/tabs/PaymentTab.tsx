import { useState } from 'react';
import { PaymentMethod } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addPaymentMethodSchema,
  TAddPaymentMethodSchema,
} from '@/lib/validations/payment';
import { mockDashboardDB } from '@/lib/data/mockDashboardDB';
import { DEMO_SENTENCE_PREFIX, isDemoMode } from '@/config/site';
import { DashboardUser } from '@/hooks/useDashboardData';

import PlusIcon from '@/components/icons/ui/PlusIcon';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import PaymentMethodCard from '../PaymentMethodCard';
import useSWR from 'swr';
import FloppyDiskIcon from '@/components/icons/ecommerce/FloppyDiskIcon';
import LogoutIcon from '@/components/icons/ui/LogoutIcon';

interface DashboardPaymentProps {
  user: DashboardUser;
  initialPaymentMethods: PaymentMethod[];
}

// Fetcher Definitions
const realFetcher = (url: string) => fetch(url).then((res) => res.json());
const demoFetcher = () => {
  console.log(
    `%c${DEMO_SENTENCE_PREFIX} Fetching profile from localStorage.`,
    'color: #7c3aed'
  );
  return mockDashboardDB.paymentMethods.get();
};

export default function DashboardPayment({
  user,
  initialPaymentMethods,
}: DashboardPaymentProps) {
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  const {
    data: paymentMethods,
    error,
    isLoading,
    mutate,
  } = useSWR<PaymentMethod[]>(
    '/api/user/payment',
    isDemoMode ? demoFetcher : realFetcher,
    {
      fallbackData: initialPaymentMethods,
    }
  );

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

    // DEMO MODE
    if (isDemoMode) {
      console.log(
        `%c${DEMO_SENTENCE_PREFIX} "Adding" payment method to localStorage.`,
        'color: #7c3aed'
      );
      const currentMethods = mockDashboardDB.paymentMethods.get();

      const newMethod: PaymentMethod = {
        id: `pm-demo-${Date.now()}`,
        userId: user.id,
        isDefault: currentMethods.length === 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        type: formData.type,
        provider: formData.provider,
        cardHolderName: formData.cardHolderName,
        last4: formData.last4,
        expiryMonth: parseInt(expiryMonth, 10),
        expiryYear: expiryYear,
      };

      const updatedMethods = [...currentMethods, newMethod];
      mockDashboardDB.paymentMethods.set(updatedMethods);

      mutate(updatedMethods, false);
      toast.success(`${DEMO_SENTENCE_PREFIX} Payment method added!`);
      reset();
      setIsAddingNew(false);
      return;
    }

    // REAL MODE
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
      mutate();
    } catch (error) {
      console.error('ADD_PAYMENT_METHOD_ERROR:', error);
      toast.error('Could not add payment method.');
    }
  };

  // Delete payment method
  const handleDeleteMethod = async (methodId: string) => {
    if (!confirm('Are you sure you want to delete this payment method?'))
      return;

    // DEMO MODE
    if (isDemoMode) {
      console.log(
        `%c${DEMO_SENTENCE_PREFIX} "Deleting" payment method ${methodId} from localStorage.`,
        'color: #7c3aed'
      );
      const currentMethods = mockDashboardDB.paymentMethods.get();
      const updatedMethods = currentMethods.filter((m) => m.id !== methodId);

      const deletedMethod = currentMethods.find((m) => m.id === methodId);
      if (deletedMethod?.isDefault && updatedMethods.length > 0) {
        updatedMethods[0].isDefault = true;
      }

      mockDashboardDB.paymentMethods.set(updatedMethods);
      mutate(updatedMethods, false);
      toast.success(`${DEMO_SENTENCE_PREFIX} Payment method deleted!`);
      return;
    }

    // REAL MODE
    try {
      const response = await fetch(`/api/user/payment/${methodId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete.');

      toast.success('Payment method deleted.');
      mutate();
    } catch (error) {
      console.error('DELETE_PAYMENT_METHOD_ERROR:', error);
      toast.error('Could not delete payment method.');
    }
  };

  // Set default payment method
  const handleSetDefault = async (methodId: string) => {
    // DEMO MODE
    if (isDemoMode) {
      console.log(
        `%c${DEMO_SENTENCE_PREFIX} Setting default payment method ${methodId} in localStorage.`,
        'color: #7c3aed'
      );
      const currentMethods = mockDashboardDB.paymentMethods.get();
      const updatedMethods = currentMethods.map((method) => ({
        ...method,
        isDefault: method.id === methodId,
      }));

      mockDashboardDB.paymentMethods.set(updatedMethods);
      mutate(updatedMethods, false);
      toast.success(`${DEMO_SENTENCE_PREFIX} Default payment method updated!`);
      return;
    }

    // REAL MODE
    try {
      const response = await fetch(`/api/user/payment/${methodId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDefault: true }),
      });
      if (!response.ok) throw new Error('Failed to set default.');

      toast.success('Default payment method updated.');
      mutate();
    } catch (error) {
      console.error('SET_DEFAULT_PAYMENT_METHOD_ERROR:', error);
      toast.error('Could not set default method.');
    }
  };

  // Wait for fetcher to finish or show error
  if (isLoading) return <div>Loading payment methods...</div>;
  if (error || !paymentMethods)
    return <div>Failed to load payment methods.</div>;

  const inputClassName =
    'peer block w-full rounded-lg border border-[#606060] bg-[#001b03] p-2 text-white shadow-sm focus-visible:outline-[#00b700] focus-visible:outline-1 focus-visible:outline';

  const labelClassName = 'font-bold';

  return (
    <div className='pt-12 pb-32 max-w-4xl space-y-12'>
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
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8'>
            <div>
              <label htmlFor='cardHolderName' className={labelClassName}>
                Card Holder Name
              </label>
              <input
                id='cardHolderName'
                type='text'
                className={inputClassName}
                {...register('cardHolderName')}
              />
              {errors.cardHolderName && (
                <p className='text-red-500'>{errors.cardHolderName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='expiryDate' className={labelClassName}>
                Expiry Date
              </label>
              <input
                id='expiryDate'
                type='text'
                placeholder='MM/YY'
                className={inputClassName}
                {...register('expiryDate')}
              />
              {errors.expiryDate && (
                <p className='text-red-500'>{errors.expiryDate.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='last4' className={labelClassName}>
                Last 4 Digits
              </label>
              <input
                id='last4'
                type='text'
                inputMode='numeric'
                pattern='\d{4}'
                maxLength={4}
                className={inputClassName}
                {...register('last4')}
              />
              {errors.last4 && (
                <p className='text-red-500'>{errors.last4.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='provider' className={labelClassName}>
                Payment Provider
              </label>
              <input
                id='provider'
                type='text'
                className={inputClassName}
                {...register('provider')}
              />
              {errors.provider && (
                <p className='text-red-500'>{errors.provider.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='type' className={labelClassName}>
                Payment Type
              </label>
              <select
                id='type'
                className={inputClassName}
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
          <div className='flex gap-4 justify-between'>
            <Button
              type='submit'
              variant='primary'
              position='standalone'
              className='py-2 px-4 rounded-md'
              disabled={isSubmitting}
            >
              <FloppyDiskIcon />
              {isSubmitting ? 'Saving...' : 'Save Payment Method'}
            </Button>
            <Button
              type='button'
              variant='danger'
              position='standalone'
              className='py-2 px-4 rounded-md'
              onClick={() => setIsAddingNew(false)}
            >
              <LogoutIcon />
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
