/**
 * @file Defines Cart API Routes
 * @description This file provides the API endpoints for the cart
 * @see cartStore.ts - This file uses the POST and GET HTTP methods for the cart
 */

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { mapToProductCard } from '@/lib/mappers/product';
import { isDemoMode } from '@/config/site';

const MAX_QUANTITY = 100;

// GET - Fetch users cart WITH full product data
export async function GET(req: Request) {
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

    // Fetch full cart for user
    const cartItemsDB = await prisma.cartItem.findMany({
      where: { userId: session.user.id },
      include: {
        product: true,
      },
    });

    // Transform fetched cart to match frontend format
    const cartItems = cartItemsDB.map((item) => ({
      ...mapToProductCard(item.product),
      quantity: item.quantity,
    }));

    return NextResponse.json({ items: cartItems });
  } catch (error) {
    console.error('GET_CART_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// POST - Add product to cart
const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1).max(MAX_QUANTITY),
});

export async function POST(req: Request) {
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

    const body = await req.json();
    const validation = addToCartSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: 'Invalid input',
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { productId, quantity } = validation.data;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    // Update product quantity, create product if it doesnt exist in cart
    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        productId,
        quantity,
      },
    });

    // Check if new quantity exceeds max
    if (cartItem.quantity > MAX_QUANTITY) {
      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: MAX_QUANTITY },
      });
    }

    // Return updated cart WITH full product data
    const updatedCartDB = await prisma.cartItem.findMany({
      where: { userId: session.user.id },
      include: {
        product: true,
      },
    });

    // Map the updated cart to frontend format
    const updatedCart = updatedCartDB.map((item) => ({
      ...mapToProductCard(item.product),
      quantity: item.quantity,
    }));

    return NextResponse.json({ items: updatedCart });
  } catch (error) {
    console.error('ADD_TO_CART_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to add to cart' },
      { status: 500 }
    );
  }
}

// PATCH - Update quantity
const updateQuantitySchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1).max(MAX_QUANTITY),
});

export async function PATCH(req: Request) {
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

    const body = await req.json();
    const validation = updateQuantitySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: 'Invalid input',
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { productId, quantity } = validation.data;

    // Update product quantity
    await prisma.cartItem.update({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
      data: {
        quantity,
        updatedAt: new Date(),
      },
    });

    // Return updated cart WITH full product data
    const updatedCartDB = await prisma.cartItem.findMany({
      where: { userId: session.user.id },
      include: {
        product: true,
      },
    });

    const updatedCart = updatedCartDB.map((item) => ({
      ...mapToProductCard(item.product),
      quantity: item.quantity,
    }));

    return NextResponse.json({ items: updatedCart });
  } catch (error) {
    console.error('UPDATE_CART_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to update cart' },
      { status: 500 }
    );
  }
}
