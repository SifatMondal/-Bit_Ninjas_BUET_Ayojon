import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { Role } from '@prisma/client';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number required'),
  businessName: z.string().min(2, 'Business name required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user with business role
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        password: hashedPassword,
        role: Role.BUSINESS,
      },
    });

    // Create business profile (minimal, will be completed in onboarding)
    await prisma.business.create({
      data: {
        userId: user.id,
        businessName: validatedData.businessName,
        slug: validatedData.businessName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
        description: '', // To be filled in onboarding
        phone: validatedData.phone,
        email: validatedData.email,
        address: '', // To be filled in onboarding
        city: '', // To be filled in onboarding
        geoPoint: { lat: 0, lng: 0 }, // To be filled in onboarding
        isActive: false, // Inactive until onboarding complete
      },
    });

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        message: 'Business account created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }

    console.error('Business registration error:', error);
    return NextResponse.json({ error: 'Failed to create business account' }, { status: 500 });
  }
}
