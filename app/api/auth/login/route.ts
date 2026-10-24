export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { loginSchema, getSessionUser, setSessionCookie, createSessionToken } from '@/lib/auth';

export async function POST(request: Request) {
  const sessionUser = await getSessionUser();
  if (sessionUser) {
    return NextResponse.json({ error: 'Already authenticated.' }, { status: 400 });
  }

  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid login credentials.' }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  const token = await createSessionToken({
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
  });

  await setSessionCookie(token);
  return NextResponse.json({ ok: true, user: { id: user.id, name: user.name, username: user.username, email: user.email } });
}
