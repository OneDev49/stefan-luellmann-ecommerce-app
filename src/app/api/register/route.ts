import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { z } from 'zod';

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
    .max(32, { message: 'Password can not be longer than 32 character long' }),
});

export async function POST(req: Request) {
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

    const { name, email, password } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'A user with this email already exists.' },
        { status: 409 }
      );
    }

    const costFactor = parseInt(process.env.HASHING_COST_FACTOR || '12', 10);
    const hashedPassword = await bcrypt.hash(password, costFactor);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log('REGISTRATION_ERROR:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
