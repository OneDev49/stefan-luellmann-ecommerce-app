/**
 * @file Defines User Payment Methods DELETE/PATCH API endpoints
 * @description This file provides the DELETE and PATCH HTTP Methods to delte and update Payment Methods for the User Account.
 * @see /dashboard/_components/tabs/PaymentTab.tsx - This file uses the provided HTTP methods of this file for the User Dashboard.
 */

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import z from 'zod';

// Security function to verify ownership of user
async function verifyOwnerShip(userId: string, methodId: string) {
  const method = await prisma.paymentMethod.findUnique({
    where: { id: methodId },
  });
  if (!method || method.userId !== userId) {
    return null;
  }
  return method;
}

const updatePaymentMethodSchema = z.object({
  isDefault: z.boolean(),
});

// PATCH - Update existing payment method
export async function PATCH(
  req: Request,
  { params }: { params: { methodId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const methodToUpdate = await verifyOwnerShip(
      session.user.id,
      params.methodId
    );
    if (!methodToUpdate) {
      return NextResponse.json(
        { message: 'Payment method not found or access denied' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const validation = updatePaymentMethodSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { isDefault } = validation.data;

    // set payment method to default for user in DB
    if (isDefault) {
      await prisma.$transaction([
        prisma.paymentMethod.updateMany({
          where: { userId: session.user.id },
          data: { isDefault: false },
        }),
        prisma.paymentMethod.update({
          where: { id: params.methodId },
          data: { isDefault: true },
        }),
      ]);
    }

    return NextResponse.json({
      message: 'Payment method updated successfully',
    });
  } catch (error) {
    console.error('UPDATE_PAYMENT_METHOD_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to update payment method' },
      { status: 500 }
    );
  }
}

// DELETE - Remove PaymentMethod from User Account in DB
export async function DELETE(
  req: Request,
  { params }: { params: { methodId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const methodToDelete = await verifyOwnerShip(
      session.user.id,
      params.methodId
    );
    if (!methodToDelete) {
      return NextResponse.json(
        { message: 'Payment method not found or access denied' },
        { status: 404 }
      );
    }

    // Remove payment method from user account in DB
    await prisma.paymentMethod.delete({
      where: { id: params.methodId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('DELETE_PAYMENT_METHOD_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to delete payment method' },
      { status: 500 }
    );
  }
}
