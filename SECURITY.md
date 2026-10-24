# Physiq

Physiq is a fitness-focused social app for selecting a setup, following a routine, tracking consistency, posting progress, competing on a leaderboard, and building healthy habits.

## Tech stack
- Next.js 14
- TypeScript
- Prisma ORM
- SQLite for local development
- bcryptjs for password hashing
- jose for secure session tokens

## Getting started
1. Install dependencies:
   npm install
2. Copy the environment file:
   cp .env.example .env
3. Push the Prisma schema:
   npx prisma db push
4. Seed development data:
   npx tsx prisma/seed.ts
5. Run the app:
   npm run dev

## Default routes
- / => landing page
- /signup => account creation
- /login => login
- /onboarding => setup selection
- /dashboard => user dashboard
- /workout => workout timer
- /feed => social feed
- /leaderboard => point leaderboard
- /profile => personal profile

## Security notes
- Passwords are never stored in plaintext.
- Sessions are stored in HTTP-only cookies.
- Input validation is handled on the server.
- Production deployment should use HTTPS and a secret manager.
