export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSessionUser, unauthorizedResponse } from '@/lib/auth';
import { prisma } from '@/lib/db';

const postSchema = z.object({
  caption: z.string().trim().min(1).max(220),
  imageUrl: z.string().optional().nullable()
});

export async function GET() {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true, likes: true, comments: { include: { user: true } } }
  });

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const body = await request.json();
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid post data.' }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      caption: parsed.data.caption,
      imageUrl: parsed.data.imageUrl || null,
      userId: user.id,
    },
    include: { user: true, likes: true, comments: true }
  });

  return NextResponse.json({ ok: true, post });
}
