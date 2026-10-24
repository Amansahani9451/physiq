import { NextResponse } from 'next/server';
import { getSessionUser, unauthorizedResponse } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { profile: true }
  });

  return NextResponse.json({ user: dbUser });
}
