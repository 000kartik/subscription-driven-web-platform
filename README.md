# Impact Draw Club

Impact Draw Club is a subscription-driven web platform that combines Stableford score tracking, monthly prize draws, charity contribution management, winner verification, and an operational admin dashboard.

The product is designed to feel premium and impact-led rather than like a traditional golf website. The platform leads with rewards, trust, and charity outcomes while keeping the codebase modular enough for real production growth.

## Status

This repository contains a production-grade full-stack scaffold and implementation blueprint.

Implemented:
- Public marketing/product pages
- Signup and login screens
- Pricing page
- Charity directory and charity profile pages
- Subscriber dashboard
- Score management UI
- Winnings and proof-upload flow surface
- Admin dashboard
- Admin user, charity, draw, and reporting screens
- API route handlers for core backend modules
- Prisma database schema
- Auth/session services
- RBAC and subscription guards
- Stableford score business logic
- Deterministic draw engine
- Prize pool calculation engine
- Stripe webhook verification surface
- Winner claim review surface
- Notification and audit service foundations
- Unit tests for score, draw, and prize rules
- Full architecture blueprint in `docs/BLUEPRINT.md`

Production integrations still required before go-live:
- Real PostgreSQL database
- Prisma migrations applied to the target database
- Stripe products, prices, checkout, billing portal, and live webhooks
- S3 or Supabase Storage for uploads
- Email provider
- Production rate limiting and observability

## Tech Stack

- Framework: Next.js App Router
- Language: TypeScript
- UI: React, Tailwind CSS, Lucide icons
- Animation: Framer Motion
- Database ORM: Prisma
- Database target: PostgreSQL
- Auth: bcrypt password hashing plus signed HTTP-only session cookies
- Validation: Zod
- Payments: Stripe
- Testing: Vitest

## Project Structure

```txt
.
|-- docs/
|   `-- BLUEPRINT.md
|-- prisma/
|   `-- schema.prisma
|-- src/
|   |-- app/
|   |   |-- api/
|   |   |-- admin/
|   |   |-- charities/
|   |   |-- dashboard/
|   |   |-- login/
|   |   |-- pricing/
|   |   `-- signup/
|   |-- components/
|   |-- features/
|   |   |-- audit/
|   |   |-- auth/
|   |   |-- charities/
|   |   |-- draws/
|   |   |-- notifications/
|   |   |-- payments/
|   |   |-- prizes/
|   |   |-- scores/
|   |   `-- subscriptions/
|   `-- lib/
|       |-- auth/
|       |-- api.ts
|       |-- db.ts
|       `-- env.ts
|-- .env.example
|-- package.json
|-- tailwind.config.ts
|-- tsconfig.json
`-- vitest.config.ts
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
copy .env.example .env
```

Generate Prisma client:

```bash
npm run db:generate
```

Run database migrations after configuring `DATABASE_URL`:

```bash
npm run db:migrate
```

Start the development server:

```bash
npm run dev
```

Local app URL:

```txt
http://127.0.0.1:3000
```

On Windows PowerShell, if `npm` is blocked by execution policy, use:

```bash
npm.cmd run dev
```

## Environment Variables

See `.env.example`.

Required for production:

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL="https://your-domain.com"
SESSION_SECRET="at-least-32-characters"
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
S3_BUCKET="..."
S3_REGION="..."
S3_ACCESS_KEY_ID="..."
S3_SECRET_ACCESS_KEY="..."
EMAIL_FROM="Impact Draw Club <hello@your-domain.com>"
```

## Available Scripts

```bash
npm run dev
```

Starts the Next.js development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after `npm run build`.

```bash
npm run typecheck
```

Runs TypeScript validation.

```bash
npm run test
```

Runs Vitest unit tests.

```bash
npm run db:generate
```

Generates Prisma Client.

```bash
npm run db:migrate
```

Runs Prisma migrations against the configured database.

```bash
npm run db:studio
```

Opens Prisma Studio.

## Core Business Rules

Score rules:
- Scores must be Stableford values from 1 to 45.
- Each score must include a date.
- Only one score per user per date is allowed.
- Existing score dates are updated, not duplicated.
- Only the latest five scores are retained.
- Scores are displayed newest first.
- Adding a sixth score removes the oldest one.

Subscription rules:
- Subscriber-only features require active access.
- `ACTIVE`, `RENEWAL_DUE`, and `PAST_DUE` currently allow access.
- `INACTIVE`, `CANCELLED`, and `LAPSED` block premium access.
- Stripe webhooks should be treated as the source of truth in production.

Draw rules:
- Monthly draw cadence.
- Five unique numbers are generated per draw.
- Draw modes: random and weighted-frequency.
- Draw generation is deterministic from a seed for audit replay.
- Admins can simulate before publishing.
- Winner tiers are 5-match, 4-match, and 3-match.

Prize rules:
- 5-match pool receives 40%.
- 4-match pool receives 35%.
- 3-match pool receives 25%.
- 5-match jackpot rolls over if unclaimed.
- 4-match and 3-match pools do not roll over.
- Multiple winners in a tier split that tier equally.

Charity rules:
- User selects a charity at signup.
- Minimum charity contribution is 10%.
- Users may increase contribution percentage.
- Independent donations are separate from gameplay.

Winner verification rules:
- Only winners enter verification.
- Proof metadata is validated before upload.
- Admin review statuses are `PENDING`, `APPROVED`, `REJECTED`, and `PAID`.
- Payout completion should be audit logged.

## Backend Modules

Auth:
- `src/features/auth`
- Signup, login, bcrypt hashing, signed session cookie.

Subscriptions:
- `src/features/subscriptions`
- Access gating and Stripe status mapping.

Scores:
- `src/features/scores`
- Stableford validation, date uniqueness, latest-five retention.

Draws:
- `src/features/draws`
- Random and weighted deterministic draw generation.

Prizes:
- `src/features/prizes`
- Pool split, rollover, equal payout calculation.

Charities:
- `src/features/charities`
- Charity validation and contribution preference rules.

Payments:
- `src/features/payments`
- Checkout/webhook schemas and Stripe webhook route.

Notifications:
- `src/features/notifications`
- Reusable notification enqueue foundation.

Audit:
- `src/features/audit`
- Sensitive action recording foundation.

## API Routes

Auth:
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`

Scores:
- `GET /api/scores`
- `POST /api/scores`
- `DELETE /api/scores/:id`

Charities:
- `GET /api/charities`
- `POST /api/charities`

Draws and prizes:
- `POST /api/draws/simulate`
- `POST /api/prizes/calculate`

Payments:
- `POST /api/payments/webhook`

Winner claims:
- `POST /api/winner-claims/:id/proof`
- `PATCH /api/admin/winner-claims/:id`

Admin:
- `GET /api/admin/reports`

## Frontend Routes

Public:
- `/`
- `/pricing`
- `/charities`
- `/charities/[slug]`
- `/signup`
- `/login`

Subscriber:
- `/dashboard`
- `/dashboard/scores`
- `/dashboard/winnings`

Admin:
- `/admin/login`
- `/admin`
- `/admin/users`
- `/admin/charities`
- `/admin/draws`
- `/admin/reports`

## Database

The Prisma schema includes normalized tables for:

- users
- roles
- user profiles
- subscription plans
- subscriptions
- payment transactions
- golf scores
- charities
- charity events
- user charity preferences
- independent donations
- draws
- draw numbers
- draw entries
- prize pools
- winner claims
- winner proof uploads
- payout records
- admin actions
- notifications
- audit logs

Important constraints:
- Unique user email.
- Unique score date per user.
- Unique draw per month.
- Unique draw entry per user per draw.
- Indexed subscription status and reporting fields.

## Testing

Run:

```bash
npm run test
```

Current coverage includes:
- Score retention and duplicate-date update behavior
- Draw determinism
- Winner tier classification
- Prize pool split and rollover behavior

Recommended next tests:
- Signup and login integration flow
- Subscription webhook idempotency
- Stripe checkout session creation
- Admin authorization
- Charity contribution minimum enforcement
- Proof upload and review lifecycle
- Payout lifecycle
- Responsive UI checks with Playwright

## Security Notes

Implemented or scaffolded:
- bcrypt password hashing
- signed HTTP-only session cookie
- RBAC guards
- subscription access guard
- Zod validation
- Prisma parameterized queries
- Stripe webhook signature verification
- security headers in middleware
- upload metadata allowlist
- audit/event logging foundation

Before production:
- Add distributed rate limiting.
- Add CSRF protection for form-style mutations.
- Enforce HTTPS-only cookies in production.
- Add file malware scanning.
- Add object storage signed URL expiration.
- Add webhook idempotency records.
- Add structured logging and alerting.
- Review `npm audit` advisories before deployment.

## Deployment Checklist

1. Provision PostgreSQL.
2. Configure `.env`.
3. Run `npm install`.
4. Run `npm run db:generate`.
5. Run `npm run db:migrate`.
6. Configure Stripe products and prices.
7. Configure Stripe webhook URL.
8. Configure object storage for media and proofs.
9. Configure email provider.
10. Run `npm run typecheck`.
11. Run `npm run test`.
12. Run `npm run build`.
13. Deploy to Vercel or another Node-compatible host.
14. Configure scheduled monthly draw job.
15. Configure monitoring, logs, and alerts.

## Validation Snapshot

The following commands were run successfully in this workspace:

```bash
npm.cmd run typecheck
npm.cmd run test
npm.cmd run build
```

The app was also started locally and returned `200 OK` at:

```txt
http://127.0.0.1:3000
```

## Architecture Blueprint

The detailed product and engineering blueprint is in:

```txt
docs/BLUEPRINT.md
```

It includes:
- product understanding
- assumptions
- module breakdown
- database notes
- API contract design
- admin workflow architecture
- draw engine logic
- prize pool logic
- charity module logic
- security checklist
- deployment plan
- scalability plan
- MVP vs phase 2 roadmap
- sprint breakdown

## Known Notes

- This codebase is ready as a company-grade starting point, but live external services are not configured.
- `npm install` reported five moderate advisories. Do not run `npm audit fix --force` blindly; review changes first because forced fixes can introduce breaking dependency upgrades.
- If Next.js patches SWC lockfile entries during build, rerun `npm install`.
