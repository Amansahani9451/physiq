import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  await prisma.profile.upsert({
    where: { userId: user.id },
    update: {
      fitnessSetup: String(payload.fitnessSetup || 'HOME'),
      fitnessGoal: String(payload.fitnessGoal || 'GENERAL'),
      trainingDays: Number(payload.trainingDays || 3),
      experience: String(payload.experience || 'BEGINNER'),
      equipment: String(payload.equipment || 'Bodyweight'),
      scheduleType: String(payload.scheduleType || 'WORKING'),
      schoolTiming: String(payload.schoolTiming || '08:00 AM - 02:00 PM'),
      bio: String(payload.bio || ''),
    },
    create: {
      userId: user.id,
      fitnessSetup: String(payload.fitnessSetup || 'HOME'),
      fitnessGoal: String(payload.fitnessGoal || 'GENERAL'),
      trainingDays: Number(payload.trainingDays || 3),
      experience: String(payload.experience || 'BEGINNER'),
      equipment: String(payload.equipment || 'Bodyweight'),
      scheduleType: String(payload.scheduleType || 'WORKING'),
      schoolTiming: String(payload.schoolTiming || '08:00 AM - 02:00 PM'),
      bio: String(payload.bio || ''),
    },
  });

  return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
}
