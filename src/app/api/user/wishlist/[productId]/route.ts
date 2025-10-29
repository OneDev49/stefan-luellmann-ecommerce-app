/**
 * @file Defines productId based Wishlist DELETE API endpoint
 * @description This file provides the DELETE HTTP method for the wishlist to delete a specific products from the wishlist.
 * @see wishlistStore.ts - This file uses the DELETE HTTP method to remove one product from the wishlist.
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
      { message: 'Wishlist API is disabled in demo mode.' },
      { status: 403 }
    );
  }

  // REAL MODE
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // DELETE specific product from Wishlist in DB
    await prisma.wishlistItem.delete({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId: params.productId,
        },
      },
    });

    // Return the updated wishlist
    const updatedWishlistDB = await prisma.wishlistItem.findMany({
      where: { userId: session.user.id },
      include: {
        product: true,
      },
    });

    // Map the updated wishlist to frontend format
    const updatedWishlist = updatedWishlistDB.map((item) => ({
      ...mapToProductCard(item.product),
    }));
    return NextResponse.json({ items: updatedWishlist });
  } catch (error) {
    console.error('DELETE_WISHLIST_ITEM_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to remove from wishlist' },
      { status: 500 }
    );
  }
}
