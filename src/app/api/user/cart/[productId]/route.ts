/**
 * @file Defines productId based Cart DELETE API endpoint
 * @description This file provides the DELETE HTTP method for the cart to delete a specific products from the shopping cart.
 * @see cartStore.ts - This file uses the DELETE HTTP method to remove one product from the cart.
 */

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { mapToProductCard } from '@/lib/mappers/product';
import { isDemoMode } from '@/config/site';

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
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

    // DELETE specific product from Cart in DB
    await prisma.cartItem.delete({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId: params.productId,
        },
      },
    });

    // Return the updated cart
    const updatedCartDB = await prisma.cartItem.findMany({
      where: { userId: session.user.id },
      include: {
        product: true,
      },
    });

    // Map updated cart to frontend format
    const updatedCart = updatedCartDB.map((item) => ({
      ...mapToProductCard(item.product),
      quantity: item.quantity,
    }));

    return NextResponse.json({ items: updatedCart });
  } catch (error) {
    console.error('DELETE_CART_ITEM_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to remove from cart' },
      { status: 500 }
    );
  }
}
