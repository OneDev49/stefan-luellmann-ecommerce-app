/**
 * @file Defines User Account Information Methods GET/PATCH API endpoints
 * @description This file provides the GET and PATCH HTTP Methods to update and create Account Information for the User Account.
 * @see /dashboard/_components/tabs/AccountInformationTab.tsx - This file uses the provided HTTP methods of this file for the User Dashboard.
 */

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { profileApiSchema } from '@/lib/validations/profile';
import { isDemoMode } from '@/config/site';

export async function GET(req: Request) {
  // DEMO MODE - Disable API endpoint
  if (isDemoMode) {
    return NextResponse.json(
      { message: 'User API is disabled in demo mode.' },
      { status: 403 }
    );
  }

  // REAL MODE
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Fetch relevant user information
    const [userProfile, user] = await Promise.all([
      prisma.userProfile.findUnique({
        where: { userId: session.user.id },
      }),
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: { name: true, email: true },
      }),
    ]);

    // If no user profile exists, populate with empty information
    if (!userProfile) {
      return NextResponse.json({
        firstName: user?.name?.split(' ')[0] || null,
        lastName: user?.name?.split(' ')[1] || null,
        email: user?.email || null,
        phoneNumber: null,
        birthDate: null,
        gender: null,
        street: null,
        zipCode: null,
        city: null,
        country: null,
      });
    }

    return NextResponse.json({ ...userProfile, email: user?.email });
  } catch (error) {
    console.error('GET_USER_PROFILE_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to fetch user profile ' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  // DEMO MODE - Disable API endpoint
  if (isDemoMode) {
    return NextResponse.json(
      { message: 'User API is disabled in demo mode.' },
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
    const validation = profileApiSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Update or create user information
    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId: session.user.id },
      update: validation.data,
      create: {
        userId: session.user.id,
        ...validation.data,
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('UPDATE_USER_PROFILE_ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}
