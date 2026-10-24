import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const routineName = String(payload.routineName || 'Momentum Routine');
  const durationMinutes = Number(payload.durationMinutes || 30);

  const session = await prisma.workoutSession.create({
    data: {
      userId: user.id,
      routineName,
      durationMinutes,
      pointsEarned: 50,
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      points: { increment: 50 },
      completedWorkouts: { increment: 1 },
      streak: { increment: 1 },
    },
  });

  return NextResponse.json({ ok: true, session });
}
