/**
 * @file Defines the PaymentMethod Zod Schema
 * @description This file provides a zod schema for the payment method for uniform and secure user input.
 * @see /dashboard/_components/tabs/PaymentTab.tsx - This file consumes the zod schema and works with it.
 */

import z from 'zod';

export const addPaymentMethodSchema = z
  .object({
    type: z.enum(['CREDIT_CARD', 'PAYPAL'], 'Payment type is required.'),
    provider: z.string().min(1, 'Provider is required'),
    cardHolderName: z.string().min(1, 'Card holder name is required'),
    last4: z
      .string()
      .regex(/^\d{4}$/, 'Please enter the last 4 digits of the card.'),
    expiryDate: z
      .string()
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please use MM/YY format.'),
  })
  .refine(
    (data) => {
      const [monthStr, yearSuffixStr] = data.expiryDate.split('/');
      const month = parseInt(monthStr, 10);
      const year = parseInt(`20${yearSuffixStr}`, 10);

      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      return (
        year > currentYear || (year === currentYear && month >= currentMonth)
      );
    },
    {
      message: 'Card has expired.',
      path: ['expiryDate'],
    }
  );

export type TAddPaymentMethodSchema = z.infer<typeof addPaymentMethodSchema>;
