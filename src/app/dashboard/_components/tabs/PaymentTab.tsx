'use client';

import { useEffect, useRef, useState } from 'react';
import { TabPaymentMethod, TabUser } from '../config/tabConfig';
import PayPalIcon from '@/components/icons/brands/PayPalIcon';
import MasterCardIcon from '@/components/icons/brands/MasterCardIcon';
import EllipsisVerticalIcon from '@/components/icons/ui/EllipsisVerticalIcon';
import PlusIcon from '@/components/icons/ui/PlusIcon';
import clsx from 'clsx';
import Button from '@/components/ui/Button';

interface DashboardPaymentProps {
  user: TabUser;
  paymentMethods: TabPaymentMethod[];
}

export default function DashboardPayment({
  user,
  paymentMethods,
}: DashboardPaymentProps) {
  const [addMethod, setAddMethod] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(
    paymentMethods[0]?.method ?? null
  );
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (addMethod && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [addMethod]);

  const inputClassNames = clsx(
    'peer block w-full rounded-lg border border-[#606060] bg-transparent p-2 text-white shadow-sm focus-visible:outline-[#00b700] focus-visible:outline-1 focus-visible:outline'
  );

  return (
    <div className='py-12 max-w-4xl w-[95%] space-y-24'>
      {paymentMethods.length > 0 ? (
        <>
          <div className='grid grid-cols-2 gap-12'>
            {paymentMethods.map((method, index) => {
              const isSelected = selectedMethod === method.method;

              return (
                <div
                  key={index}
                  onClick={() => setSelectedMethod(method.method)}
                  className={clsx(
                    ' border-2 rounded-xl p-6  transition-colors',
                    selectedMethod === method.method
                      ? 'border-[#00b700]'
                      : 'border-[#4a4a4a] hover:border-[#a7a7a7]'
                  )}
                >
                  <div className='flex justify-between'>
                    <div className='flex items-center gap-3'>
                      <input
                        type='radio'
                        id={method.method}
                        name='payment-method'
                        value={method.method}
                        checked={isSelected}
                        onChange={() => setSelectedMethod(method.method)}
                        className='appearance-none rounded-full border border-[#4a4a4a] w-4 h-4 relative grid place-items-center before:absolute before:bg-white before:rounded-full before:h-0 before:w-0 transition-all before:border-0 checked:before:border-4 before:border-white'
                      />
                      <label htmlFor={method.method}>
                        {method.method.charAt(0).toUpperCase() +
                          method.method.slice(1)}
                      </label>
                    </div>
                    <div className='flex items-center gap-6'>
                      <div className='italic text-[#999999] font-bold flex items-center text-lg gap-2'>
                        {method.method === 'paypal' ? (
                          <>
                            <PayPalIcon height={28} width={23} />
                            PayPal
                          </>
                        ) : (
                          <MasterCardIcon height={28} width={36} />
                        )}
                      </div>
                      <div>
                        <EllipsisVerticalIcon className='cursor-pointer' />
                      </div>
                    </div>
                  </div>
                  <div className='tracking-widest mt-4 mb-10'>
                    <strong>{method.cardNumber}</strong>
                  </div>

                  <div className='grid grid-cols-[2fr_1fr] leading-tight'>
                    <div className='flex flex-col'>
                      <span className='text-gray-400 text-sm'>
                        Card Holder Name
                      </span>
                      <span>{method.cardHolder}</span>
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-gray-400 text-sm'>Expiry Date</span>
                      <span>{method.expiryDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className='border-[#4a4a4a] border-2 rounded-xl p-6 hover:border-[#a7a7a7] transition-colors cursor-pointer group'
              onClick={() => setAddMethod(true)}
            >
              <div className='flex items-center flex-col gap-3'>
                <div className='bg-[#2d2d2d] w-16 h-16 grid place-items-center rounded-full'>
                  <PlusIcon className='group-hover:text-[#fff] text-[#707070] transition-colors' />
                </div>
                <strong>Add New Card</strong>
              </div>
            </div>
          </div>
          {addMethod && (
            <form ref={formRef} className='space-y-16'>
              <div className='grid grid-cols-2 gap-8'>
                <div>
                  <label htmlFor='cardnumber' className='text-lg font-bold'>
                    Card Number
                  </label>
                  <input
                    id='cardnumber'
                    type='text'
                    className={inputClassNames}
                    placeholder='12345 6789 0987 6543'
                  />
                </div>
                <div>
                  <label htmlFor='cardholdername' className='text-lg font-bold'>
                    Card Holder Name
                  </label>
                  <input
                    id='cardholdername'
                    type='text'
                    className={inputClassNames}
                    placeholder='Stefan Lüllmann'
                  />
                </div>
                <div>
                  <label htmlFor='expirydate' className='text-lg font-bold'>
                    Expiry Date
                  </label>
                  <input
                    id='expirydate'
                    type='month'
                    className={inputClassNames}
                    placeholder='MM/YY'
                  />
                </div>
                <div>
                  <label htmlFor='cvc' className='text-lg font-bold'>
                    CVC/CVV
                  </label>
                  <input
                    id='cvc'
                    type='number'
                    className={inputClassNames}
                    placeholder='1234'
                  />
                </div>
              </div>

              <Button
                as='button'
                variant='secondary'
                className='w-full justify-center'
              >
                <PlusIcon />
                Apply Changes
              </Button>
            </form>
          )}
        </>
      ) : (
        <div>Nothing</div>
      )}
    </div>
  );
}
