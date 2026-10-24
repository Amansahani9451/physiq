# Security Audit

## Controls implemented
- Password hashing with bcryptjs
- Server-managed JWT session cookies with HttpOnly, SameSite, secure option in production
- Validation using Zod for auth and onboarding inputs
- Prisma ORM with safe query patterns
- Rate limiting should be added for production deployment
- Security headers enabled via Next.js config
- Basic authorization checks on protected routes

## Remaining risks
- OAuth providers are not yet configured
- Real production deployment should use PostgreSQL and a managed secret store
- File upload validation is not yet implemented beyond the basic app scaffold

## Recommended production configuration
- HTTPS everywhere
- Strong environment secrets
- Postgres database
- Monitoring and dependency scanning
- Branch protection and GitHub security features
