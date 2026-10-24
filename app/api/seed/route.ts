import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { points: 'desc' },
    take: 5,
    select: { username: true, points: true, streak: true }
  });

  return NextResponse.json({ users });
}
