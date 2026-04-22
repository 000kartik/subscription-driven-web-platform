# Impact Draw Club: Product And Engineering Blueprint

## 1. Product Understanding
Impact Draw Club is a subscription platform where members maintain their latest five Stableford scores, participate in a monthly number draw, share prize pools across three match tiers, and direct at least 10% of subscription value to a selected charity. The emotional center is not golf nostalgia; it is transparent reward, verified trust, and visible social impact.

## 2. Assumptions & Ambiguities Resolved
- Stableford scores are also the member's five-number draw entry.
- Valid score values are integers from 1 to 45.
- A user may update a score for an existing date; duplicate rows are never created.
- `ACTIVE`, `RENEWAL_DUE`, and `PAST_DUE` keep temporary access; `INACTIVE`, `CANCELLED`, and `LAPSED` block premium access.
- Webhooks are the source of truth for subscription lifecycle changes.
- Proof uploads use presigned object storage URLs with metadata stored in Postgres.
- Draw publication is irreversible without a recorded admin override.

## 3. Recommended Tech Stack
- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, Lucide icons.
- Backend: Next.js route handlers with a service/repository split.
- Database: PostgreSQL via Prisma.
- Auth: HTTP-only session cookie backed by signed JWT; bcrypt password hashing.
- Payments: Stripe behind a provider abstraction.
- Storage: S3 or Supabase Storage for proof and charity media.
- Validation: Zod at every API boundary.
- Testing: Vitest for domain services, Playwright recommended for key journeys.

## 4. Full System Architecture
Public pages convert visitors to subscriptions. Authenticated pages call protected API routes. Route handlers validate payloads, enforce RBAC/subscription state, call feature services, persist through Prisma, and record audit events for sensitive actions. Payment, email, and storage are isolated behind provider modules so the platform can swap vendors for new countries.

## 5. Folder Structure
```txt
src/app                  Next.js pages and API routes
src/components           Reusable UI and form components
src/features             Feature-owned schemas and domain services
src/lib                  Auth, DB, API errors, env, shared utilities
prisma/schema.prisma     Normalized production data model
docs/BLUEPRINT.md        CTO/product implementation blueprint
```

## 6. Database Schema
The Prisma schema defines normalized entities for users, roles, profiles, subscriptions, plans, transactions, scores, charities, charity events, preferences, donations, draws, draw numbers, draw entries, prize pools, winner claims, proof uploads, payouts, admin actions, notifications, and audit logs.

Important constraints:
- `User.email` unique.
- `GolfScore(userId, playedOn)` unique.
- `Draw.drawMonth` unique.
- `DrawEntry(drawId, userId)` unique.
- `Subscription.providerSubscriptionId` unique.
- Indexed status/date fields for subscription checks, reporting, draw history, and moderation queues.

## 7. Core Backend Modules
- Auth: signup, login, logout, password hashing, signed session cookie.
- Subscription: lifecycle state mapping, premium access guard, webhook update point.
- Scores: Stableford validation, date uniqueness, latest-five retention.
- Draws: deterministic random or weighted-frequency generation with simulation mode.
- Prizes: 40/35/25 tier split, equal winner splitting, 5-match rollover.
- Charity: directory, preference validation, contribution percentage enforcement.
- Winner verification: claim status lifecycle from pending to paid.
- Notifications: reusable enqueue surface for email and in-app messages.
- Audit: admin and sensitive user actions are recorded.

## 8. Frontend Page Structure
- `/` premium impact-led homepage.
- `/signup`, `/login`, `/pricing`.
- `/charities`, `/charities/[slug]`.
- `/dashboard`, `/dashboard/scores`, `/dashboard/winnings`.
- `/admin/login`, `/admin`, `/admin/users`, `/admin/charities`, `/admin/draws`, `/admin/reports`.

## 9. API Design
Representative implemented endpoints:
- `POST /api/auth/signup`: create user, profile, charity preference, session.
- `POST /api/auth/login`: verify password, create session.
- `POST /api/auth/logout`: clear session.
- `GET /api/scores`: subscriber-only latest five scores.
- `POST /api/scores`: subscriber-only upsert by date.
- `DELETE /api/scores/:id`: subscriber-only delete own score.
- `GET /api/charities?q=&category=`: public directory.
- `POST /api/charities`: admin create charity.
- `POST /api/draws/simulate`: admin simulation.
- `POST /api/prizes/calculate`: admin prize calculation.
- `POST /api/payments/webhook`: Stripe signature-verified webhook.
- `POST /api/winner-claims/:id/proof`: subscriber proof metadata.
- `PATCH /api/admin/winner-claims/:id`: admin review or payout status.
- `GET /api/admin/reports`: admin analytics summary.

Sample score request:
```json
{ "playedOn": "2026-04-22", "score": 38 }
```

Sample prize calculation request:
```json
{
  "activeSubscriberCount": 1000,
  "subscriptionPrizePoolCents": 500,
  "rolloverInCents": 20000,
  "winnersByTier": { "3": 12, "4": 3, "5": 0 }
}
```

## 10. Admin Architecture
Admin actions are guarded by role checks, validated through Zod, and should record `AdminAction` plus `AuditLog` records. The admin flow is: configure draw mode, run simulations, inspect projected winners and pools, publish official draw, review winner proofs, approve/reject, mark payouts paid, and review reports.

## 11. Draw Engine Logic
Random mode selects five unique values from 1 to 45 using a SHA-256 seed stream. Weighted mode builds score frequencies, blends least and most frequent score bands, then uses the same deterministic seed picker. This makes simulations reproducible and auditable.

## 12. Prize Pool Calculation Logic
Base pool equals active subscribers multiplied by the plan's prize-pool contribution. Tier allocation is 40% for 5-match, 35% for 4-match, and 25% for 3-match. Only the 5-match pool receives rollover-in and only it rolls over out when no 5-match winner exists.

## 13. Charity Module Logic
Users choose an active charity during signup. Contribution percentage is stored in basis points and cannot be less than 1000 bps. Independent donations are separate payment records linked to charities. Admins manage charity content, images, profile pages, and upcoming events.

## 14. Auth & Security Design
Security controls include bcrypt password hashing, HTTP-only signed session cookies, RBAC guards, subscription guards, Zod validation, Prisma parameterized queries, Stripe webhook signature verification, file metadata allowlists, max proof size, security headers, audit logs, and secrets via environment variables. Production should add distributed rate limiting, CSRF tokens for non-JSON form posts, malware scanning for uploads, and HTTPS-only cookies.

## 15. UI/UX Design Direction
The interface uses a premium editorial-operational language: warm paper background, ink typography, restrained marine/moss/ember accents, compact cards, motion on entrance, dense admin tables, and clear CTA hierarchy. It avoids golf-course clichés and leads with prize transparency, trust, and charity impact.

## 16. Testing Strategy
Implemented unit tests cover draw determinism, prize splitting, rollover, score update, and score retention. Add integration tests for auth, Stripe webhook replay/idempotency, charity selection, proof review, payout lifecycle, and admin authorization. Add Playwright coverage for signup, score entry, dashboard, draw simulation, and mobile layouts.

## 17. Deployment Plan
1. Provision Postgres.
2. Configure environment variables from `.env.example`.
3. Run `npm install`, `npm run db:generate`, and `npm run db:migrate`.
4. Configure Stripe products, prices, customer portal, and webhook endpoint.
5. Configure S3/Supabase Storage bucket with private ACLs.
6. Deploy Next.js to Vercel or a Node runtime.
7. Enable scheduled monthly draw job and background email worker.
8. Turn on monitoring, structured logs, and alerting.

## 18. Scalability Plan
Use country-aware plans, currencies, charities, and tax rules. Keep payment, email, and storage providers abstracted. Move scheduled draws and notifications to background jobs. Add read models for analytics, object storage CDN for media, mobile-compatible JSON APIs, and team/corporate account tables when needed.

## 19. MVP vs Phase 2 Roadmap
MVP: auth, subscriptions, score tracking, charity selection, monthly draws, prize pools, winner verification, payouts, admin dashboard, notifications. Phase 2: mobile apps, corporate accounts, country-specific compliance, campaign modules, advanced fraud checks, analytics warehouse, referral mechanics, and charity impact reporting.

## 20. Suggested Development Sprint Breakdown
- Sprint 1: foundation, schema, auth, RBAC, CI.
- Sprint 2: subscriptions, Stripe checkout, webhooks, dashboard status.
- Sprint 3: scores, charity directory, signup charity selection.
- Sprint 4: draw engine, prize pools, simulations, publishing.
- Sprint 5: winner proof workflow, payouts, notifications.
- Sprint 6: admin operations, analytics, audit logs, hardening.
- Sprint 7: accessibility, responsive QA, security review, deployment readiness.
