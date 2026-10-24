import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { loginSchema, createSessionToken, getSessionUser, setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  const existingUser = await getSessionUser();
  if (existingUser) {
    return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.redirect(new URL('/login?error=invalid', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.redirect(new URL('/login?error=invalid', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.redirect(new URL('/login?error=invalid', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  const token = await createSessionToken({ id: user.id, name: user.name, username: user.username, email: user.email });
  await setSessionCookie(token);

  return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
}
