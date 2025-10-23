/**
 * @file Defines User Payment Methods GET/POST API endpoints
 * @description This file provides the GET and POST HTTP Methods to get and create Payment Methods for the User Account.
 * @see /dashboard/_components/tabs/PaymentTab.tsx - This file uses the provided HTTP methods of this file for the User Dashboard.
 */

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

import z from 'zod';

// GET - fetch all payment methods from user in DB
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const paymentMethods = await prisma.paymentMethod.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(paymentMethods);
  } catch (error) {
    console.error('GET_PAYMENT_METHOD_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to fetch payment methods ' },
      { status: 500 }
    );
  }
}

const createPaymentMethodSchema = z
  .object({
    type: z.enum(['CREDIT_CARD', 'PAYPAL']),
    provider: z.string().min(1, 'Provider is required').max(48),
    cardHolderName: z.string().min(1, 'Card holder name is required').max(48),
    last4: z.string().length(4, 'Last 4 digits must be exactly 4 characters'),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/),
  })
  .transform((data) => {
    const [month, yearSuffix] = data.expiryDate.split('/');
    return {
      ...data,
      expiryMonth: parseInt(month, 10),
      expiryYear: parseInt(`20${yearSuffix}`, 20),
    };
  });

// POST - Add new Payment method to user account in DB
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = createPaymentMethodSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { type, provider, cardHolderName, last4, expiryMonth, expiryYear } =
      validation.data;

    // Check if user already has payment method
    const userHasPaymentMethods = await prisma.paymentMethod.findFirst({
      where: { userId: session.user.id },
    });

    // Create new payment method for user in DB
    const newPaymentMethod = await prisma.paymentMethod.create({
      data: {
        userId: session.user.id,
        type,
        provider,
        cardHolderName,
        last4,
        expiryMonth,
        expiryYear,
        isDefault: !userHasPaymentMethods,
      },
    });

    return NextResponse.json(newPaymentMethod, { status: 201 });
  } catch (error) {
    console.error('CREATE_PAYMENT_METHOD_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to create payment method ' },
      { status: 500 }
    );
  }
}
