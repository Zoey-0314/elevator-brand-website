# NS Elevator website

Production-oriented international B2B elevator website for Europe and North America. The implementation combines a data-driven marketing site, a database-first quotation workflow, and a server-protected inquiry dashboard.

> **Launch status:** the application is deployable, but it is not business-production-ready until verified company details, product data, certifications, project records, legal copy, provider credentials, and real business imagery are supplied. All current concept imagery and placeholder content are labelled.

## What is implemented

- Required marketing routes for products, solutions, projects, about, quality, service, contact, privacy, and terms.
- Reusable typed records for six product families, six sector solutions, and project references.
- Responsive navigation, accessible forms, SEO metadata, structured data, sitemap, and robots rules.
- `POST /api/inquiries` with strict Zod validation, payload limits, Cloudflare Turnstile Siteverify, Supabase persistence, Resend notification, and safe public errors.
- Database-first delivery: email is attempted only after a successful insert; notification failure is recorded without deleting the inquiry.
- Supabase Auth login plus server-side `ADMIN_EMAIL_ALLOWLIST` authorization.
- Protected inquiry list, detail view, notification state, and validated status updates.
- Versioned SQL migration with constraints, indexes, trigger, RLS, and direct public access revoked.
- Automated coverage for validation, Turnstile, database failure, post-insert email failure, authorization, quote context, and accessible form feedback.

## Stack

- Next.js 16 App Router, React 19, TypeScript 6 strict mode
- Tailwind CSS 4
- Supabase PostgreSQL, Auth, and SSR session helpers
- Resend
- Cloudflare Turnstile
- Vitest and Testing Library
- Vercel as the target business hosting environment; OpenAI Sites is also configured for owner-only review deployments

## Prerequisites

- Node.js 22.22.2 or newer; Node.js 24 LTS is recommended
- npm 10 or newer
- A Supabase project
- A Resend account with a verified sending domain
- A Cloudflare Turnstile widget

## Local setup

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Without provider values the marketing site works, but inquiry submission is explicitly disabled and the admin login reports that authentication is not configured. No fake success path is used.

## Environment variables

| Variable | Exposure | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Browser-safe | Canonical production origin, without a trailing path |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser-safe | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser-safe | Supabase anonymous key for Auth session handling |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only | Controlled inquiry insert/read/update after application authorization |
| `RESEND_API_KEY` | Server-only | Transactional email API key |
| `RESEND_FROM_EMAIL` | Server-only | Verified sender identity |
| `INQUIRY_NOTIFICATION_EMAIL` | Server-only | Business recipient for inquiry notifications |
| `SEND_CUSTOMER_CONFIRMATION_EMAIL` | Server-only | `true` to enable acknowledgement email; defaults to `false` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Browser-safe | Widget site key |
| `TURNSTILE_SECRET_KEY` | Server-only | Siteverify secret |
| `TURNSTILE_EXPECTED_HOSTNAME` | Server-only | Expected production hostname |
| `ADMIN_EMAIL_ALLOWLIST` | Server-only | Comma-separated, explicitly authorized Supabase Auth emails |
| `INQUIRY_RATE_LIMIT_WINDOW_SECONDS` | Server-only | Best-effort in-memory rate-limit window |
| `INQUIRY_RATE_LIMIT_MAX_REQUESTS` | Server-only | Best-effort per-instance request count |

Never commit `.env.local`, service-role keys, Turnstile secrets, Resend keys, or real customer data.

## Supabase setup

1. Create a Supabase project and record its URL, anon key, and service-role key.
2. Apply `supabase/migrations/202608270001_create_inquiries.sql` using the Supabase CLI or SQL editor.
3. Confirm RLS is enabled and forced on `public.inquiries`.
4. Confirm `anon` and `authenticated` have no direct table privileges. The intended public write path is the server endpoint using the service role after validation and Turnstile.
5. In Supabase Auth, create the first administrator using the dashboard or an approved invitation flow.
6. Add that exact, normalized email to `ADMIN_EMAIL_ALLOWLIST`. Authenticated users not in the allowlist are signed out and refused.
7. Use a separate recovery-capable owner account and keep Supabase dashboard recovery details outside this repository.

Admin data access uses a two-gate model:

1. `auth.getUser()` verifies the Supabase session on the server.
2. The verified email must appear in the server-only allowlist before the service-role query is constructed.

The public browser client cannot directly read, insert, or update inquiry rows.

## Resend setup

1. Add and verify the production sending domain.
2. Set `RESEND_FROM_EMAIL` to an allowed sender on that domain.
3. Set `INQUIRY_NOTIFICATION_EMAIL` to the monitored sales inbox.
4. Keep customer confirmations disabled until sender reputation, copy, and support workflow are approved.
5. A failed notification leaves the Supabase row intact and sets `email_notification_status = 'failed'`; the admin detail view exposes the admin-only diagnostic.

## Turnstile setup

1. Create separate development/preview and production widgets when practical.
2. Add `localhost`, the preview hostname, and the final production hostname to the appropriate widget configuration.
3. Set the public site key and server-only secret for each environment.
4. Set `TURNSTILE_EXPECTED_HOSTNAME` in production. The server also validates the `inquiry` action.
5. Tokens are treated as short-lived and single-use; the client resets the widget after each attempt.

## Rate limiting

Turnstile, strict schema limits, a 16 KB request limit, and a small in-memory limiter are included. The in-memory limiter is best-effort only: serverless instances do not share memory. If rate limiting must be a hard business guarantee, replace `src/lib/rate-limit.ts` with a shared store and add its credentials and data-retention policy.

## Quality commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Provider network calls are mocked in automated tests. A real integration smoke test requires non-production provider credentials.

## Manual smoke test

1. Verify desktop and mobile navigation, keyboard focus order, and no horizontal page scrolling.
2. Open a product detail page and confirm `Request this product` prefills the product on `/contact` and preserves the source route.
3. Submit malformed data and confirm accessible field errors and no database insert.
4. Submit an invalid Turnstile token and confirm rejection before insertion.
5. Submit a valid test inquiry and confirm exactly one Supabase row plus one business notification.
6. Force Resend to fail after insert; confirm the row remains and the admin shows `failed` notification status.
7. Confirm an anonymous visitor and an authenticated but non-allowlisted user cannot access any admin record.
8. Confirm an allowlisted administrator can list, inspect, email/call, and change status only to `new`, `contacted`, `quoted`, `won`, or `closed`.
9. Inspect the sitemap and robots output; admin and API routes must not be indexed.

## Vercel deployment

1. Import this repository into Vercel using the default Next.js settings.
2. Add all environment variables separately for Preview and Production.
3. Use non-production Supabase, Resend, and Turnstile settings for Preview.
4. Apply the SQL migration before enabling the public production form.
5. Deploy, complete the manual smoke test, and inspect function logs for structured events such as `business_notification_failed`.
6. Connect the custom domain, update `NEXT_PUBLIC_SITE_URL` and `TURNSTILE_EXPECTED_HOSTNAME`, add the domain to Turnstile, and redeploy.

## Production launch checklist

- Replace `.example` emails, address, telephone, WhatsApp, and working hours in `src/content/company.ts`.
- Verify and replace all company capability, product specification, certification, project, and service statements.
- Replace or approve all concept imagery and ensure publication rights for real photography.
- Obtain qualified legal approval for privacy and terms copy and define retention/deletion procedures.
- Apply and verify the Supabase migration, first admin, allowlist, RLS, and backup/recovery procedures.
- Verify Resend sender/recipient, Turnstile hostnames, test inquiry delivery, and failed-notification retention.
- Review accessibility, Core Web Vitals, metadata, social preview, sitemap, and custom-domain redirects.
- Scan repository history and client bundles for accidental secrets before public launch.

## Content editing

Business content is centralized under `src/content`:

- `site.ts` — brand, canonical URL, navigation, quote-link context
- `company.ts` — positioning and single-source contact details
- `products.ts` — six reusable product records and specification placeholders
- `solutions.ts` — six sector records
- `projects.ts` — explicitly labelled placeholder references

Generated architectural imagery is stored under `public/images/brand` and is labelled as conceptual wherever displayed. It must not be represented as a real factory, client, or completed project.

## License

No open-source license has been selected. All rights are reserved.
