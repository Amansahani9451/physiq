# Physiq

A social fitness and routine-planning web app focused on consistency, healthy habits, and community-driven progress.

## Features
- Secure auth with hashed passwords and server-side session cookies
- Onboarding to choose fitness setup, goals, experience, equipment, and schedule
- Routine selection with multiple templates
- Interactive workout timer and completion flow
- Points, streaks, leaderboard, and achievements
- Social feed with posts, likes, comments, and profile browsing
- Responsive dark UI with mobile-first experience

## Stack
- Next.js 14
- TypeScript
- Prisma + SQLite for local development
- PostgreSQL-ready schema structure
- bcryptjs + jose for password hashing and sessions

## Local setup
1. Copy `.env.example` to `.env`
2. Run `npm install`
3. Run `npx prisma db push`
4. Run `npx prisma db seed` (after seed file is added)
5. Run `npm run dev`

## Production notes
- Use HTTPS in production
- Rotate JWT secret and store in env secrets
- Use PostgreSQL instead of SQLite in real deployment
- Keep cookies secure and HTTP-only in production

## Security notes
- Passwords are hashed using bcrypt
- Session tokens are stored in secure HTTP-only cookies
- User input is validated on the server
- Important data is protected with server-side authorization checks
