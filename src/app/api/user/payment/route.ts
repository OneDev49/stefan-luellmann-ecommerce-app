/**
 * @file Defines User Payment Methods GET/POST API endpoints
 * @description This file provides the GET and POST HTTP Methods to get and create Payment Methods for the User Account.
 * @see /dashboard/_components/tabs/PaymentTab.tsx - This file uses the provided HTTP methods of this file for the User Dashboard.
 */

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';
import { createPaymentMethodApiSchema } from '@/lib/validations/payment';
import { isDemoMode } from '@/config/site';

// GET - fetch all payment methods from user in DB
export async function GET() {
  // DEMO MODE - Disable API endpoint
  if (isDemoMode) {
    return NextResponse.json(
      { message: 'Payment API is disabled in demo mode.' },
      { status: 403 }
    );
  }

  // REAL MODE
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

// POST - Add new Payment method to user account in DB
export async function POST(req: Request) {
  // DEMO MODE - Disable API endpoint
  if (isDemoMode) {
    return NextResponse.json(
      { message: 'Payment API is disabled in demo mode.' },
      { status: 403 }
    );
  }

  // REAL MODE
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = createPaymentMethodApiSchema.safeParse(body);

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
