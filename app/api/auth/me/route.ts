export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ user: null });

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, username: true, email: true, points: true, streak: true, completedWorkouts: true }
  });

  return NextResponse.json({ user: dbUser });
}
