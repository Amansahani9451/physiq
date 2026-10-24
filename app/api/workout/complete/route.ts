import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  const formData = await request.formData();
  const caption = String(formData.get('caption') || '').trim();
  const imageUrl = String(formData.get('imageUrl') || '').trim();

  if (!caption) {
    return NextResponse.redirect(new URL('/feed?error=caption', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  await prisma.post.create({
    data: {
      userId: user.id,
      caption,
      imageUrl: imageUrl || null,
    },
  });

  return NextResponse.redirect(new URL('/feed', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
}
