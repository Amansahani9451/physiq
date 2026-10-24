import { NextResponse } from 'next/server';
import { clearSessionCookie, getSessionUser } from '@/lib/auth';

export async function POST() {
  const active = await getSessionUser();
  if (!active) {
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  clearSessionCookie();
  return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
}
