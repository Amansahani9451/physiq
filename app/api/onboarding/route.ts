export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSessionUser, unauthorizedResponse } from '@/lib/auth';
import { prisma } from '@/lib/db';

const onboardingSchema = z.object({
  fitnessSetup: z.enum(['HOME', 'GYM', 'HOME_GYM']),
  fitnessGoal: z.enum(['GENERAL', 'STRENGTH', 'MUSCLE', 'ENDURANCE', 'ROUTINE']),
  trainingDays: z.number().int().min(2).max(7),
  experience: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  equipment: z.string().min(1).max(200),
  scheduleType: z.enum(['STUDENT', 'WORKING', 'OTHER']),
  schoolTiming: z.string().max(80).optional(),
  bio: z.string().max(220).optional(),
});

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const body = await request.json();
  const parsed = onboardingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid onboarding details.' }, { status: 400 });
  }

  const data = parsed.data;
  await prisma.profile.upsert({
    where: { userId: user.id },
    update: {
      ...data,
      updatedAt: new Date(),
    },
    create: {
      userId: user.id,
      ...data,
    }
  });

  return NextResponse.json({ ok: true });
}
