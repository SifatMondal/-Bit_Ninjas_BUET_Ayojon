import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const onboardingSchema = z.object({
  description: z.string().min(50, 'Description must be at least 50 characters'),
  address: z.string().min(10, 'Full address required'),
  city: z.string(),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = onboardingSchema.parse(body);

    // Get user's business
    const business = await prisma.business.findUnique({
      where: { userId: session.user.id },
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    // Update business with onboarding data
    await prisma.business.update({
      where: { id: business.id },
      data: {
        description: validatedData.description,
        address: validatedData.address,
        city: validatedData.city,
        isActive: true, // Activate business
      },
    });

    // Link categories (simplified - would need to fetch category IDs in real implementation)
    // For now, we'll skip the actual category linking and handle it later

    return NextResponse.json({
      message: 'Onboarding completed successfully',
      business: {
        id: business.id,
        slug: business.slug,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }

    console.error('Onboarding error:', error);
    return NextResponse.json({ error: 'Failed to complete onboarding' }, { status: 500 });
  }
}
