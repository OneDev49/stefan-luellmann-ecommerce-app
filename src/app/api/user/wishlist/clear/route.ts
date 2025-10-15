/**
 * @file Defines Wishlist DELETE HTTP method API endpoint to clear entire wishlist
 * @description This file provides the DELETE HTTP method for the wishlist to delete all products from the entire wishlist
 * @see wishlistStore.ts - This file uses the DELETE HTTP methods for the wishlist
 */

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // DELETE the entire user wishlist on DB
    await prisma.wishlistItem.deleteMany({
      where: { userId: session.user.id },
    });

    return NextResponse.json({
      message: 'Wishlist cleared successfully',
      items: [],
    });
  } catch (error) {
    console.error('CLEAR_WISHLIST_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to clear wishlist' },
      { status: 500 }
    );
  }
}
