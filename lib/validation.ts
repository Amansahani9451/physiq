import { NextResponse } from 'next/server';
import { z } from 'zod';

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

export function unauthorizedResponse(message = 'Authentication required.') {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function forbiddenResponse(message = 'You do not have permission to do that.') {
  return NextResponse.json({ error: message }, { status: 403 });
}
