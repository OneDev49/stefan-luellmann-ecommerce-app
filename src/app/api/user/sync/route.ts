/**
 * @file Defines user sync API endpoint
 * @description This file provides the method to sync cart/wishlist in localStorage with the Database.
 * @see CartWishlistSyncProvider.tsx - This provider is used to sync the cart/wishlist data and call this HTTP method.
 */

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { mapToProductCard } from '@/lib/mappers/product';
import { isDemoMode } from '@/config/site';

const syncSchema = z.object({
  cart: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().min(1).max(99),
    })
  ),
  wishlist: z.array(z.string()),
});

export async function POST(req: Request) {
  // DEMO MODE - Disable API endpoint
  if (isDemoMode) {
    return NextResponse.json(
      { message: 'Sync API is disabled in demo mode.' },
      { status: 403 }
    );
  }

  // REAL MODE
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();

    const validation = syncSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: 'Invalid data format',
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { cart, wishlist } = validation.data;

    // Verify all products exist
    const allProductIds = [...cart.map((item) => item.productId), ...wishlist];

    if (allProductIds.length === 0) {
      return NextResponse.json({ message: 'Nothing to sync.' });
    }

    const existingProducts = await prisma.product.findMany({
      where: { id: { in: allProductIds } },
      select: { id: true },
    });

    const validProductIds = new Set(existingProducts.map((p) => p.id));

    // Sync Cart Items
    const validCartItems = cart.filter((item) =>
      validProductIds.has(item.productId)
    );

    if (validCartItems.length > 0) {
      // If product exists update quantity, if not create product
      await Promise.all(
        validCartItems.map((item) =>
          prisma.cartItem.upsert({
            where: {
              userId_productId: {
                userId,
                productId: item.productId,
              },
            },
            update: {
              quantity: item.quantity,
              updatedAt: new Date(),
            },
            create: {
              userId,
              productId: item.productId,
              quantity: item.quantity,
            },
          })
        )
      );
    }

    // Sync Wishlist products
    const validWishlistIds = wishlist.filter((id) => validProductIds.has(id));

    if (validWishlistIds.length > 0) {
      // Create DB data, skip duplicates
      await prisma.wishlistItem.createMany({
        data: validWishlistIds.map((productId) => ({
          userId,
          productId,
        })),
        skipDuplicates: true,
      });
    }

    // Fetch updated data from DB to return to client
    const [updatedCartDB, updatedWishlistDB] = await Promise.all([
      prisma.cartItem.findMany({
        where: { userId },
        include: {
          product: true,
        },
      }),
      prisma.wishlistItem.findMany({
        where: { userId },
        include: {
          product: true,
        },
      }),
    ]);

    const updatedCart = updatedCartDB.map((item) => ({
      ...mapToProductCard(item.product),
      quantity: item.quantity,
    }));

    const updatedWishlist = updatedWishlistDB.map((item) => ({
      ...mapToProductCard(item.product),
    }));

    return NextResponse.json({
      message: 'Sync successful',
      cart: updatedCart,
      wishlist: updatedWishlist,
    });
  } catch (error) {
    console.error('SYNC_ERROR:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred during sync' },
      { status: 500 }
    );
  }
}
