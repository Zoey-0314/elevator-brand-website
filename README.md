# Elevator Brand Website

Production-oriented international B2B website for an elevator brand, aimed primarily at customers in Europe and North America.

This repository is currently initialized with the product requirements and development handoff documents. The next development step is to scaffold and implement the Next.js application described in [PRD.md](./PRD.md).

## Project goal

Build a real, deployable company website that:

- presents the brand, products, solutions, projects, quality capabilities, and services;
- makes business contact details easy to find;
- captures quotation and contact inquiries through a real server endpoint;
- stores every valid inquiry in Supabase PostgreSQL;
- sends inquiry notifications through Resend after the database write;
- verifies public submissions with Cloudflare Turnstile on the server;
- provides an authenticated admin area for viewing inquiries and updating their status;
- can be deployed to Vercel and connected to a custom domain.

This must not become a visual-only prototype. A form that only updates local state, logs to the console, or sends an email without database persistence is incomplete.

## Planned stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL and Supabase Auth
- Resend
- Cloudflare Turnstile
- Vercel

Use current stable, mutually compatible versions when the application is scaffolded. Avoid unnecessary dependencies.

## Required product behavior

The inquiry submission order is intentional:

1. Validate the payload on the server.
2. Verify the Turnstile token with Cloudflare Siteverify.
3. Normalize the accepted fields.
4. Insert the inquiry into Supabase.
5. Send the business notification email with Resend.
6. Optionally send a customer confirmation email.
7. Return a structured response without exposing internal errors.

The database record is the source of truth. If an email fails after a successful insert, the inquiry must remain stored and its notification failure must be visible to administrators.

## Planned routes

- `/`
- `/products`
- `/products/[slug]`
- `/solutions`
- `/solutions/[slug]`
- `/projects`
- `/projects/[slug]`
- `/about`
- `/quality`
- `/service`
- `/contact`
- `/privacy`
- `/terms`
- `/admin/login`
- `/admin`
- `/admin/inquiries/[id]`
- `POST /api/inquiries`

## Repository documents

- [PRD.md](./PRD.md): complete product, technical, security, and acceptance requirements.
- [AGENTS.md](./AGENTS.md): execution rules and handoff instructions for Codex and other coding agents.
- [.env.example](./.env.example): required configuration names using safe placeholder values only.

## Local setup after application scaffolding

1. Install the Node.js version selected by the generated project.
2. Install dependencies with the package manager chosen during scaffolding.
3. Copy `.env.example` to `.env.local`.
4. Replace every placeholder with credentials from the correct service. Never commit `.env.local`.
5. Create a Supabase project and apply the repository's SQL migrations.
6. Create at least one authorized admin user in Supabase Auth.
7. Configure a verified Resend sending domain and notification recipient.
8. Configure a Cloudflare Turnstile widget for local and production hostnames.
9. Run the documented lint, type-check, test, and production-build commands.

Detailed setup commands must be added to this README as implementation lands.

## Deployment target

Deploy the Next.js application to Vercel, configure all environment variables separately for Preview and Production, apply Supabase migrations, and connect the final custom domain. Do not expose server-only variables through names prefixed with `NEXT_PUBLIC_`.

## Content status

Brand name, contact details, statistics, certifications, project references, photographs, brochures, domain, and legal copy are not yet verified. Development placeholders must be centralized, clearly marked, and easy to replace. Do not publish invented certifications, client names, performance claims, or project statistics.

## License

No open-source license has been selected. All rights are reserved unless the repository owner later adds a license.

