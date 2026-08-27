# AGENTS.md — Codex Development Handoff

## Purpose and scope

These instructions apply to the entire repository. Implement the production-oriented B2B elevator brand website defined in `PRD.md`. This repository begins with requirements and handoff documentation; application code still needs to be scaffolded and built.

Read `PRD.md` and `README.md` before changing architecture or implementing features. If a later user instruction conflicts with these documents, follow the user's explicit instruction and document the resulting scope change.

## Mission

Deliver a deployable English-language elevator brand website for Europe and North America using Next.js, TypeScript, Tailwind CSS, Supabase, Resend, Cloudflare Turnstile, and Vercel.

The public site must present the brand, products, solutions, projects, quality, service, and contact paths. The inquiry workflow and protected admin area are core product functionality, not optional enhancements.

## Non-negotiable rules

- Do not replace the inquiry backend with mock data, a console log, client state, `mailto:`, or email-only delivery.
- Persist a valid inquiry to Supabase before attempting email notification.
- Never delete or roll back a saved inquiry because Resend failed.
- Verify Cloudflare Turnstile through Siteverify on the server for every public submission.
- Validate all submitted fields on the server. Frontend validation is supplemental.
- Protect admin reads and writes with server-verified authentication plus explicit admin authorization.
- Do not expose the Supabase service-role key, Resend key, Turnstile secret, internal provider errors, or stack traces to the browser.
- Never commit real secrets. Keep `.env.example` limited to obvious placeholder values.
- Do not invent company facts, certifications, client names, project outcomes, addresses, or statistics.
- Keep the application deployable on Vercel without a separately managed custom backend.

## Source of truth and precedence

Use this order when requirements differ:

1. the current explicit user request;
2. `PRD.md` acceptance requirements;
3. this `AGENTS.md` handoff;
4. `README.md` operational documentation;
5. existing implementation conventions when they do not conflict with the above.

Do not silently reduce scope. If credentials are missing, build the integration behind environment variables, provide safe local/test handling, and document the exact setup still required.

## Expected implementation sequence

1. Scaffold the current stable Next.js App Router project with TypeScript, Tailwind CSS, linting, and a test setup.
2. Add environment validation that clearly distinguishes public and server-only variables.
3. Define typed content/configuration records for site, company, products, solutions, and projects.
4. Add Supabase browser/server client boundaries and versioned SQL migrations with constraints and RLS.
5. Build the shared responsive public layout and required marketing routes.
6. Build the inquiry form and shared validation schema.
7. Implement the database-first inquiry endpoint, Turnstile verification, Resend notification, and failure tracking.
8. Implement Supabase Auth, explicit admin authorization, protected list/detail routes, and validated status updates.
9. Add metadata, sitemap, robots, structured data, accessibility, and performance refinements.
10. Complete tests, provider setup instructions, migration instructions, and Vercel deployment documentation.

Keep every intermediate state buildable when practical. Do not leave the main branch presenting an obviously fake successful form flow.

## Architecture boundaries

- Prefer React Server Components and server-side data access. Add `use client` only where browser interactivity requires it.
- Keep privileged Supabase and provider clients in server-only modules. Use `server-only` safeguards where appropriate.
- Centralize Zod schemas or equivalent validation so form types and server validation do not drift.
- Keep provider-specific code behind small modules such as `lib/supabase`, `lib/turnstile`, and `lib/resend`.
- Keep editable business copy and records in a clear `content` or `data` layer, not scattered through presentation components.
- Use route handlers or server actions deliberately. Public behavior and authorization rules must remain easy to test.
- Use structured public error codes/messages. Log useful private diagnostics without logging secrets or unnecessary personal data.
- Avoid unnecessary state libraries, animation frameworks, and generic abstractions.

## Inquiry persistence contract

The required sequence is:

```text
validate payload
  -> verify Turnstile server-side
  -> insert inquiry in Supabase
  -> send business notification
  -> optionally send customer confirmation
  -> record notification result
  -> return safe response
```

The Supabase row is the authoritative record. Tests must prove that a Resend failure after a successful insert leaves the row intact and visible in the admin interface.

Use the exact inquiry status set from the PRD: `new`, `contacted`, `quoted`, `won`, and `closed`. Enforce it in TypeScript validation and a PostgreSQL check constraint.

## Authentication and authorization

Use Supabase Auth with cookies/session handling compatible with Next.js App Router and server rendering. Authentication alone is insufficient: only explicitly authorized administrators may access inquiries.

Protect:

- admin page rendering;
- data-fetching functions;
- status-update handlers;
- any direct Supabase policies used for admin access.

Do not place a static admin password in source or compare passwords in client-side JavaScript. Document first-admin provisioning and recovery.

## Content and design rules

- V1 is English-first, but content structures must remain compatible with future locale routing.
- Use an architecture + engineering + premium industrial visual direction.
- Use restrained motion and honor reduced-motion preferences.
- All sample metrics, projects, specifications, certifications, contact details, and images must be clearly marked for replacement.
- Do not present a placeholder as verified brand information.
- Keep final business details in one configuration source of truth.
- Ensure mobile navigation, tables, forms, and admin views remain usable without horizontal page scrolling.

## Database requirements

- Place repeatable, versioned SQL changes in `supabase/migrations/`.
- Include the `inquiries` table, defaults, allowed-value constraints, useful indexes, and RLS configuration.
- Public clients must not directly read inquiry rows.
- Avoid direct anonymous insertion unless there is a documented reason and robust RLS policy; the intended path is the controlled server endpoint.
- Never expose notification error details to public users.
- Do not store IP addresses permanently without a new documented business requirement.

## Environment and secrets

Use `.env.example` as the inventory of configuration names. Keep real values in `.env.local` and deployment secret storage.

Only these categories belong in browser-exposed variables:

- public site URL;
- Supabase project URL and anon key;
- Turnstile site key.

Service-role, Resend, Turnstile secret, and internal authorization values are server-only. Before completion, inspect the client bundle boundaries and repository history for accidental exposure.

## Testing expectations

Add focused automated coverage for high-risk business rules:

- schema validation and payload limits;
- Turnstile provider success/failure;
- database insert success/failure;
- email failure after successful persistence;
- allowed inquiry status values;
- anonymous, authenticated-non-admin, and authorized-admin access;
- product and source-page form context;
- accessible success and error rendering.

Provider network calls should be mocked in unit/integration tests. Also document a manual smoke test against non-production Supabase, Resend, and Turnstile configuration.

## Required checks before handoff

Run the project's actual equivalents of:

- dependency install with a committed lockfile;
- lint;
- TypeScript type-check;
- automated tests;
- production build.

Also verify responsive behavior and keyboard navigation on key public pages, the inquiry form, login, inquiry list, and inquiry detail screen.

Do not report a check as passing unless it was run. If a credential-dependent test cannot run, state exactly what remains unverified and provide the command or scenario for the owner.

## Documentation obligations

As implementation lands, keep `README.md` accurate. It must eventually include:

- prerequisites and chosen package manager;
- local setup commands;
- every environment variable and whether it is public or server-only;
- Supabase project, migration, RLS, Auth, and first-admin setup;
- Resend sending-domain and recipient setup;
- Turnstile local/preview/production hostname setup;
- test and quality commands;
- Vercel preview/production deployment steps;
- custom-domain setup and a production launch checklist.

## Completion report format

When handing work back, summarize:

1. implemented user-visible behavior;
2. database, authentication, email, and Turnstile behavior;
3. files/migrations added or changed;
4. checks actually run and their results;
5. remaining credentials, verified business content, and manual production steps;
6. any deliberate deviation from `PRD.md` and why.

Do not call the site production-ready while placeholder business claims remain or the real inquiry path has not been tested with configured services.

