export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getSessionUser, unauthorizedResponse } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const body = await request.json();
  const durationMinutes = Number(body.durationMinutes || 30);

  const session = await prisma.workoutSession.create({
    data: {
      userId: user.id,
      routineName: body.routineName || 'Momentum Routine',
      durationMinutes,
      pointsEarned: 50,
    }
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      points: { increment: 50 },
      completedWorkouts: { increment: 1 },
      streak: { increment: 1 }
    }
  });

  return NextResponse.json({ ok: true, session });
}
