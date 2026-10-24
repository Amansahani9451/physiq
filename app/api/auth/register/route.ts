export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { signupSchema, unauthorizedResponse } from '@/lib/auth';
import { getSessionUser, setSessionCookie, createSessionToken } from '@/lib/auth';

export async function POST(request: Request) {
  const sessionUser = await getSessionUser();
  if (sessionUser) return NextResponse.json({ error: 'Already authenticated.' }, { status: 400 });

  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  const parsed = signupSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid signup details.' }, { status: 400 });
  }

  const { name, username, email, password } = parsed.data;

  const exists = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] }
  });

  if (exists) {
    return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
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
          bio: 'New to Physiq and building better habits.',
          fitnessSetup: 'HOME',
          fitnessGoal: 'GENERAL',
          trainingDays: 3,
          experience: 'BEGINNER',
          equipment: 'Bodyweight and basic accessories',
          scheduleType: 'WORKING'
        }
      }
    }
  });

  const authUser = { id: user.id, email: user.email, username: user.username, name: user.name };
  const token = await createSessionToken(authUser);
  await setSessionCookie(token);

  return NextResponse.json({ ok: true, user: authUser });
}
