import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { signupSchema, createSessionToken, getSessionUser, setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  const existingUser = await getSessionUser();
  if (existingUser) {
    return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  const parsed = signupSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.redirect(new URL('/signup?error=invalid', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  const { name, username, email, password } = parsed.data;

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existing) {
    return NextResponse.redirect(new URL('/signup?error=exists', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      passwordHash,
      profile: {
        create: {
          bio: 'New to Physiq and building consistent habits.',
          fitnessSetup: 'HOME',
          fitnessGoal: 'GENERAL',
          trainingDays: 3,
          experience: 'BEGINNER',
          equipment: 'Bodyweight + basic equipment',
          scheduleType: 'WORKING',
        },
      },
    },
  });

  const token = await createSessionToken({ id: user.id, name: user.name, username: user.username, email: user.email });
  await setSessionCookie(token);

  return NextResponse.redirect(new URL('/onboarding', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
}
