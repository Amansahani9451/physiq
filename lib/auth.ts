import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const secret = new TextEncoder().encode(JWT_SECRET);

export const signupSchema = z.object({
  name: z.string().trim().min(2).max(60),
  username: z.string().trim().min(3).max(24).regex(/^[a-zA-Z0-9_.-]+$/),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const onboardingSchema = z.object({
  fitnessSetup: z.enum(['HOME', 'GYM', 'HOME_GYM']),
  fitnessGoal: z.enum(['GENERAL', 'STRENGTH', 'MUSCLE', 'ENDURANCE', 'ROUTINE']),
  trainingDays: z.number().int().min(2).max(7),
  experience: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  equipment: z.string().min(1).max(200),
  scheduleType: z.enum(['STUDENT', 'WORKING', 'OTHER']),
  schoolTiming: z.string().max(80).optional(),
  bio: z.string().max(220).optional(),
});

export const postSchema = z.object({
  caption: z.string().trim().min(1).max(220),
  imageUrl: z.string().optional().nullable(),
});

export type SessionUser = {
  id: string;
  email: string;
  username: string;
  name: string;
};

export async function createSessionToken(user: SessionUser) {
  return await new SignJWT({
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionUser;
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('physiq_session')?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function setSessionCookie(token: string) {
  cookies().set('physiq_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie() {
  cookies().set('physiq_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
