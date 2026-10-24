# Security Audit

## Implemented controls
- Password hashing with bcryptjs
- Secure session cookies using HTTP-only and SameSite settings
- Server-side validation for auth and onboarding values
- Prisma ORM to avoid raw SQL concatenation
- Security headers configured in Next.js config
- Protected routes redirect unauthenticated users to login

## Remaining production risks
- OAuth providers not yet connected
- File upload validation and public image sanitization should be added before public deployment
- Real production should use PostgreSQL and a managed secret store
- Rate limiting and abuse prevention should be added for public traffic

## Recommended deployment
- HTTPS only
- Strong env secrets for JWT and database config
- Postgres instead of SQLite for production
- Dependabot + GitHub security scanning
- CI checks for linting, tests, and build validation
