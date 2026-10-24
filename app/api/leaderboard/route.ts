export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getSessionUser, unauthorizedResponse } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const leaderboard = await prisma.user.findMany({
    orderBy: { points: 'desc' },
    take: 10,
    select: { username: true, points: true, streak: true }
  });

  return NextResponse.json({ leaderboard });
}
