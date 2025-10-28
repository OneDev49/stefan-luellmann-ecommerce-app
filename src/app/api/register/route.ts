/**
 * @file Defines user registration API endpoint
 * @description This file provides the registration API for user to create an account.
 * @see /app/(auth)/register/_component/RegisterForm.tsx - The client-side form that consumes this endpoint.
 */

import { isDemoMode } from '@/config/site';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import bcrypt from 'bcrypt';

const userRegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(30, { message: 'Name can not be longer than 30 characters.' }),
  email: z.email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(32, { message: 'Password can not be longer than 32 characters.' }),
  cart: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().min(1).max(99),
      })
    )
    .optional(),
  wishlist: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  // DEMO MODE - Disable API endpoint
  if (isDemoMode) {
    return NextResponse.json(
      { message: 'User Registration is disabled in demo mode.' },
      { status: 403 }
    );
  }

  // REAL MODE
  try {
    const body = await req.json();

    const validation = userRegisterSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: 'Invalid input data',
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, password, cart = [], wishlist = [] } = validation.data;

    // Check if identical email exists in DB
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: 'A user with this email already exists.' },
        { status: 409 }
      );
    }

    // Hash password
    const costFactor = parseInt(process.env.HASHING_COST_FACTOR || '12', 10);
    const hashedPassword = await bcrypt.hash(password, costFactor);

    // Create user with cart/wishlist in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: { name, email, hashedPassword },
      });

      const cartProductIds = cart.map((item) => item.productId);
      const allUniqueProductIds = Array.from(
        new Set([...cartProductIds, ...wishlist])
      );

      if (allUniqueProductIds.length > 0) {
        const existingProducts = await tx.product.findMany({
          where: { id: { in: allUniqueProductIds } },
          select: { id: true },
        });
        const validProductIds = new Set(existingProducts.map((p) => p.id));

        const validCartItems = cart.filter((item) =>
          validProductIds.has(item.productId)
        );
        if (validCartItems.length > 0) {
          await tx.cartItem.createMany({
            data: validCartItems.map((item) => ({
              userId: newUser.id,
              productId: item.productId,
              quantity: item.quantity,
            })),
          });
        }

        const validWishlistIds = wishlist.filter((id) =>
          validProductIds.has(id)
        );
        if (validWishlistIds.length > 0) {
          await tx.wishlistItem.createMany({
            data: validWishlistIds.map((productId) => ({
              userId: newUser.id,
              productId,
            })),
          });
        }
      }

      return newUser;
    });

    return NextResponse.json(
      {
        id: result.id,
        name: result.name,
        email: result.email,
        message: 'Registration successful',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('REGISTRATION_ERROR:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
