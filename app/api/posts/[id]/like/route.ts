export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getSessionUser, unauthorizedResponse } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { postId } = await request.json();
  if (!postId) return NextResponse.json({ error: 'Missing postId.' }, { status: 400 });

  const existing = await prisma.like.findUnique({
    where: { postId_userId: { postId, userId: user.id } }
  });

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
    return NextResponse.json({ ok: true, liked: false });
  }

  await prisma.like.create({
    data: { postId, userId: user.id }
  });

  return NextResponse.json({ ok: true, liked: true });
}
