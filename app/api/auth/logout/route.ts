export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { clearSessionCookie, getSessionUser } from '@/lib/auth';

export async function POST() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: 'No active session.' }, { status: 401 });
  }

  clearSessionCookie();
  return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
}
