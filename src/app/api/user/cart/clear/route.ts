/**
 * @file Defines Cart DELETE HTTP method API endpoint to clear entire cart
 * @description This file provides the DELETE HTTP method for the cart to delete all products from the entire shopping cart
 * @see cartStore.ts - This file uses the DELETE HTTP methods for the cart
 */

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';
import { isDemoMode } from '@/config/site';

export async function DELETE() {
  // DEMO MODE - Disable API endpoint
  if (isDemoMode) {
    return NextResponse.json(
      { message: 'Cart API is disabled in demo mode.' },
      { status: 403 }
    );
  }

  // REAL MODE
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // DELETE the entire user cart on DB
    await prisma.cartItem.deleteMany({
      where: { userId: session.user.id },
    });

    return NextResponse.json({
      message: 'Cart cleared successfully',
      items: [],
    });
  } catch (error) {
    console.error('CLEAR_CART_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to clear cart' },
      { status: 500 }
    );
  }
}
