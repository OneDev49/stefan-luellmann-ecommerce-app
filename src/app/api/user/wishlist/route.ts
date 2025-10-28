/**
 * @file Defines Wishlist API Routes
 * @description This file provides the API endpoints for the wishlist
 * @see wishlistStore.ts - This file uses the POST and GET HTTP methods for the wishlist
 */

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { mapToProductCard } from '@/lib/mappers/product';
import { isDemoMode } from '@/config/site';

export async function GET(req: Request) {
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

    // Fetch full wishlist for user
    const wishlistItemsDB = await prisma.wishlistItem.findMany({
      where: { userId: session.user.id },
      include: {
        product: true,
      },
    });

    // Transform fetched wishlist to match frontend format
    const wishlistItems = wishlistItemsDB.map((item) => ({
      ...mapToProductCard(item.product),
    }));
    return NextResponse.json({ items: wishlistItems });
  } catch (error) {
    console.error('GET_WISHLIST_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}

// POST - Add product to wishlist
const addToWishlistSchema = z.object({
  productId: z.string(),
});

export async function POST(req: Request) {
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

    const body = await req.json();
    const validation = addToWishlistSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: 'Invalid input',
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { productId } = validation.data;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if product is already inside the wishlist
    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
    });

    if (existingItem) {
      return NextResponse.json(
        { message: 'Item already in wishlist' },
        { status: 409 }
      );
    }

    // Add the product to the wishlist
    await prisma.wishlistItem.create({
      data: {
        userId: session.user.id,
        productId,
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
    console.error('ADD_TO_WISHLIST_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}
