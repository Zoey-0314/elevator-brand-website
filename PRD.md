# Elevator Brand Website — Codex Development PRD

## 1. Product objective

Build a production-oriented international elevator brand website for customers in Europe and North America. The site must combine premium B2B brand presentation with a real inquiry-capture workflow and a lightweight authenticated inquiry-management area.

The first release must be suitable for actual deployment after the owner supplies verified company content, imagery, domain settings, Supabase credentials, Resend credentials, and Cloudflare Turnstile credentials.

Primary business outcomes:

- explain the brand and engineering capabilities clearly to overseas buyers;
- help visitors discover suitable elevator products and industry solutions;
- establish trust through quality, service, certification, and project content;
- make email, telephone, WhatsApp, and quotation actions easy to find;
- permanently capture qualified inquiries and notify the sales team;
- let authorized administrators review and progress inquiry records;
- provide a maintainable base for future multilingual and content growth.

## 2. Non-negotiable implementation rules

These requirements may not be removed, mocked, or replaced with client-only behavior:

1. Contact and quotation forms submit to a real Next.js server endpoint.
2. Valid inquiries are written to Supabase PostgreSQL.
3. Cloudflare Turnstile is verified through Siteverify on the server before insertion.
4. A successful database insert triggers a Resend notification to the configured business recipient.
5. The database record remains saved if a notification or confirmation email fails.
6. An authenticated admin interface can read inquiries and update only approved statuses.
7. Public users cannot directly read inquiry records.
8. Supabase service-role credentials, Resend keys, and Turnstile secrets remain server-only.
9. No important data exists only in React state, browser storage, or console output.
10. Missing external credentials during development must result in complete integrations driven by environment variables and clear setup documentation, not deleted functionality.
11. The application must remain deployable to Vercel without a separately managed backend server.
12. No real secret, customer data, or private business credential may be committed.

## 3. Audience, market, and language

Primary markets:

- United States and Canada;
- United Kingdom;
- Germany, France, Spain, Italy, and other European markets;
- additional international markets where an English-language B2B site is appropriate.

Primary users:

- property developers and building owners;
- construction companies and procurement teams;
- architects and consultants;
- hotel, hospital, residential, commercial, and infrastructure developers;
- elevator distributors, installers, and overseas partners.

V1 language is English. Do not add automatic machine translation. Keep content and routing architecture compatible with future locale routes such as `/en`, `/de`, `/fr`, and `/es` without requiring a rewrite.

## 4. Technology and architectural baseline

Use:

- Next.js, App Router, and React Server Components where appropriate;
- TypeScript in strict mode;
- Tailwind CSS;
- Supabase PostgreSQL for persistence;
- Supabase Auth for administrator authentication;
- Resend for transactional email;
- Cloudflare Turnstile for public-form spam protection;
- Zod or an equivalent schema validator for shared and server-side validation;
- Vercel for hosting and server functions.

Use current stable and mutually compatible versions at implementation time. Prefer server components by default and use client components only for browser interactivity. Keep dependencies small, maintained, and justified.

## 5. Information architecture and routes

Required public routes:

- `/` — homepage;
- `/products` — product category index;
- `/products/[slug]` — reusable product detail template;
- `/solutions` — industry solution index;
- `/solutions/[slug]` — reusable solution detail template;
- `/projects` — project reference index;
- `/projects/[slug]` — reusable project detail template;
- `/about` — company and capability presentation;
- `/quality` — quality process and verified certifications;
- `/service` — pre-sales, installation, commissioning, maintenance, parts, and support;
- `/contact` — configurable contact details and inquiry form;
- `/privacy` — privacy-policy structure requiring legal review;
- `/terms` — website terms structure requiring legal review.

Required protected routes:

- `/admin/login`;
- `/admin` or `/admin/inquiries` for the inquiry list;
- `/admin/inquiries/[id]` for inquiry details and status management.

Required API surface:

- `POST /api/inquiries` for public inquiry submission;
- protected server action or route for inquiry status updates;
- auth callback endpoints required by the selected Supabase Auth flow.

Main navigation: Home, Products, Solutions, Projects, About, Service, Contact. Place a visually prominent `GET A QUOTE` action in the desktop header and keep it easy to reach on mobile.

## 6. Visual and interaction direction

The site should feel like architecture + engineering + premium industrial brand.

Use:

- spacious layouts and strong typographic hierarchy;
- architectural, elevator-cabin, metal, material, and engineering imagery;
- white, charcoal, black, steel grey, and one configurable brand accent color;
- one primary typeface such as Geist, Inter, or Manrope;
- restrained transitions, hover treatments, and motion;
- clear calls to action and strong image hierarchy.

Avoid:

- a generic export-company template appearance;
- an SaaS-dashboard visual language on public pages;
- excessive gradients, rounded cards, glowing controls, or decorative animation;
- autoplay motion that interferes with accessibility or performance;
- fabricated photography presented as a real company facility or project.

The UI must be responsive across desktop, laptop, tablet, and mobile. There must be no unintended horizontal scrolling. Navigation, forms, galleries, and specification tables must remain usable on small screens.

## 7. Homepage requirements

Implement these data-driven sections:

1. Hero with large visual, editable headline, supporting copy, `Explore Products`, and `Request a Quote` actions.
2. Company metrics with clearly marked placeholder values until verified.
3. Product categories for Passenger Elevator, Home Elevator, Hospital Elevator, Freight Elevator, Panoramic Elevator, and Escalator.
4. `Why Choose Us` covering Engineering, Quality, Customization, and Global Support.
5. Solutions for Residential, Commercial, Hotel, Hospital, Public Infrastructure, and Industrial contexts.
6. Selected project references using clearly marked placeholder records until real projects are supplied.
7. A final quotation call to action.

Every product, solution, and project card must link to a valid detail route. Homepage text must live in an obvious content/configuration layer, not be buried inside complex presentation components.

## 8. Product system

Products must be generated from a shared typed schema rather than six unrelated page implementations.

Suggested fields:

- `id`, `slug`, `name`, `category`, and `tagline`;
- `overview`, `benefits`, and `applications`;
- `heroImage`, `gallery`, and meaningful image alt text;
- data-driven `specifications` key/value rows;
- optional `brochureUrl` with a controlled unavailable state;
- `seoTitle` and `seoDescription`.

Initial product records:

- Passenger Elevator;
- Home Elevator;
- Hospital Elevator;
- Freight Elevator;
- Panoramic Elevator;
- Escalator.

Each product detail page must include a hero, overview, key benefits, specification table, gallery, applications, brochure area, and inquiry call to action. Opening the inquiry flow from a product page must prefill the product and include the source page; visitors may change the product if needed.

Do not publish unverified performance specifications as factual. Placeholder data must be visibly labeled in source content and simple to replace.

## 9. Solutions and projects

Create reusable solution records and detail pages for Residential, Commercial, Hotel, Hospital, Public Infrastructure, and Industrial. Each page includes sector overview, challenges, recommended elevator types, benefits, applicable products, optional project examples, and quotation CTA.

Create a reusable project model with:

- `id`, `slug`, and `title`;
- `country`, `city`, and `buildingType`;
- `elevatorTypes` and optional `completionYear`;
- `summary`, `description`, and `images`;
- SEO fields.

Until verified references are supplied, use generic placeholder projects. Do not invent client names, addresses, awards, project results, or detailed claims.

## 10. About, quality, service, and contact content

The About page must support Company Introduction, Manufacturing Capability, Engineering Capability, Quality Philosophy, Global Market, and Support Network sections.

The Quality page must support certifications, standards, quality control, production testing, safety processes, and downloadable certificate images or PDFs. Do not claim any certification that the owner has not supplied and verified.

The Service page must cover Pre-sales Consultation, Engineering Support, Installation Guidance, Commissioning, Maintenance Support, Spare Parts, and After-sales Technical Support.

The Contact page must show centrally configured business details, including company name, address, sales email, service email, telephone, WhatsApp, and working hours. Maintain one source of truth for brand, domain, contact details, logo references, social links, and business settings.

## 11. Inquiry form requirements

Required fields:

- Name — required;
- Company — optional;
- Email — required;
- Phone / WhatsApp — optional;
- Country — required;
- Product — optional and prefilled when context exists;
- Project Type — optional;
- Quantity — optional;
- Message — required;
- Privacy consent — required;
- Cloudflare Turnstile response token — required.

Capture `source_page` from the route context. File uploads are out of scope for V1, but the design should not make a future attachment workflow needlessly difficult.

Provide accessible Idle, Submitting, Success, Validation Error, Turnstile Error, and Server Error states. Prevent accidental duplicate submissions while a request is in progress. Keep entered values after recoverable errors. Do not use placeholder text as the only label.

## 12. Server-side inquiry workflow

Implement `POST /api/inquiries` in this order:

1. Reject unsupported methods and oversized payloads.
2. Parse the body and validate every field with a server-side schema.
3. Enforce maximum lengths and valid email format.
4. Verify required privacy consent.
5. Verify the Turnstile token with Cloudflare Siteverify using the server-only secret.
6. Normalize safe text values; do not attempt unsafe HTML rendering of submissions.
7. Insert the inquiry into Supabase using a server-only database client.
8. Treat the successful insert as the authoritative receipt.
9. Send the business notification email through Resend.
10. Optionally send the customer confirmation email when enabled.
11. Update or record notification status without deleting the inquiry.
12. Return a structured JSON response with a stable public error code and no stack trace.

The endpoint must not expose whether an admin account exists, leak provider responses, or return service-role credentials. Do not permanently store the visitor IP address unless a later documented requirement justifies it.

Add a practical abuse-control strategy appropriate for Vercel in addition to Turnstile, schema validation, and payload limits. Document any limitations of an in-memory limiter in serverless environments; prefer a production-suitable shared store if rate limiting is implemented as a hard guarantee.

## 13. Inquiry database model

Add versioned SQL under `supabase/migrations/`. The repository must contain enough SQL to create tables, indexes, constraints, triggers if used, and Row Level Security policies without guessing.

Minimum `inquiries` columns:

- `id uuid primary key default gen_random_uuid()`;
- `created_at timestamptz not null default now()`;
- `name text not null`;
- `company text null`;
- `email text not null`;
- `phone text null`;
- `country text not null`;
- `product text null`;
- `project_type text null`;
- `quantity text null`;
- `message text not null`;
- `source_page text null`;
- `status text not null default 'new'`;
- `email_notification_status text not null default 'pending'`;
- `email_notification_error text null` with careful admin-only exposure;
- optional `customer_confirmation_status text`;
- optional `updated_at timestamptz`.

Allowed inquiry statuses are exactly:

- `new`;
- `contacted`;
- `quoted`;
- `won`;
- `closed`.

Enforce allowed values in both application validation and a database check constraint. Add useful indexes for recent inquiries, status filtering, and other demonstrated admin queries.

Enable RLS. Anonymous/public clients must have no direct read or update access to inquiries. Public form insertion must go through the controlled server endpoint. Prefer server-side privileged operations with the service-role key and server-verified administrator sessions. Document the final policy design.

## 14. Email behavior

Use Resend only after database insertion succeeds.

Business notification subject pattern:

`New Website Inquiry — {Product or General} — {Country}`

Include name, company, country, email, phone, product, project type, quantity, message, submission time, source page, and inquiry ID. Escape untrusted content in HTML email output and include a readable text fallback where practical.

Optionally send a configurable customer confirmation acknowledging receipt. Email failures must never roll back or delete a stored inquiry. Record `sent`, `failed`, or another documented constrained notification status. Administrators must be able to see that the record exists even when delivery failed.

## 15. Turnstile and public-form security

Render the Turnstile widget with `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. Submit the resulting token to the server. Verify it with `TURNSTILE_SECRET_KEY` and Cloudflare Siteverify for every accepted submission.

When configured, validate expected hostname and action. Treat tokens as single-use and short-lived. Reset the client widget after failed or completed submissions as appropriate. Frontend token presence alone is never sufficient.

## 16. Administrator authentication and dashboard

Use Supabase Auth with a secure server-compatible session flow. Do not compare passwords in frontend code. Protect admin pages and privileged operations on the server and redirect unauthenticated users to `/admin/login`.

Restrict access to explicitly authorized administrators. Document how the first admin is created and how authorization is represented, for example through a dedicated admin profile/role table or a carefully managed allowlist. Do not assume every authenticated user is automatically an administrator.

The dashboard must show a usable inquiry table with Date, Name, Company, Country, Product, Email, Notification Status, and Inquiry Status. Provide loading, empty, and error states.

The inquiry detail view must show all submitted business fields and provide clickable email and telephone/WhatsApp links where valid. Allow status changes only to the approved values and validate updates on the server. A full CRM, sales pipeline analytics, bulk import, and marketing automation are outside V1.

## 17. Content architecture and maintainability

Centralize editable content under a clear structure such as `src/content` or `src/data` and use typed records. Suggested modules:

- `site.ts` for site metadata and navigation;
- `company.ts` for brand and contact configuration;
- `products.ts`;
- `solutions.ts`;
- `projects.ts`.

Do not duplicate final contact details or brand configuration across components. Keep placeholder content explicit with comments or metadata such as `isPlaceholder`. Organize images under `public/images/products`, `public/images/projects`, and `public/images/company` or an equally clear structure.

## 18. SEO, metadata, and discoverability

Every important public page must provide unique title, meta description, canonical URL, Open Graph metadata, and meaningful social preview behavior. Implement:

- readable product, solution, and project slugs;
- `sitemap.xml` and `robots.txt` through supported Next.js conventions;
- semantic heading hierarchy and HTML landmarks;
- meaningful image alt text;
- Organization, Product, BreadcrumbList, and WebSite structured data where factually appropriate.

Do not include invented ratings, reviews, certifications, awards, or business claims in structured data.

Admin and authentication routes must not be indexed.

## 19. Accessibility, performance, and quality

Accessibility baseline:

- keyboard-operable navigation and dialogs;
- visible focus styles;
- semantic elements and form labels;
- programmatically associated validation messages;
- sufficient color contrast;
- respect for reduced-motion preferences;
- useful alt text and non-color-only status indicators.

Performance baseline:

- use Next.js image optimization and responsive sizing;
- avoid oversized hero assets and cumulative layout shift;
- lazy-load noncritical media;
- minimize client JavaScript;
- avoid large animation libraries unless clearly justified;
- target good Core Web Vitals on representative mobile and desktop pages.

## 20. Privacy and legal placeholders

Create professional placeholder structures for Privacy Policy and Terms. The privacy page must cover form-submitted information, processing purpose, storage, service providers, international users, data rights, and a contact method.

Mark legal copy as requiring company/legal review before production. The form must require consent to use submitted information to respond to the inquiry and link to the Privacy Policy.

Do not add a large cookie-management platform in V1 unless nonessential analytics or advertising scripts are introduced. Do not load such scripts before the required consent mechanism exists.

## 21. Environment configuration

Commit `.env.example` with placeholder values only. At minimum document:

- `NEXT_PUBLIC_SITE_URL`;
- `NEXT_PUBLIC_SUPABASE_URL`;
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`;
- `SUPABASE_SERVICE_ROLE_KEY`;
- `RESEND_API_KEY`;
- `RESEND_FROM_EMAIL`;
- `INQUIRY_NOTIFICATION_EMAIL`;
- `SEND_CUSTOMER_CONFIRMATION_EMAIL`;
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`;
- `TURNSTILE_SECRET_KEY`;
- any admin-authorization configuration selected by implementation.

Only values intentionally safe for browsers may use the `NEXT_PUBLIC_` prefix.

## 22. Suggested repository structure

The final implementation should resemble:

```text
src/
  app/
    (marketing)/
    admin/
    api/inquiries/
  components/
  content/
  emails/
  lib/
    supabase/
  types/
  validation/
public/
  images/
supabase/
  migrations/
```

Adapt this to current Next.js conventions when a cleaner structure is available, but preserve clear separation among public UI, admin UI, content, validation, provider integrations, and privileged server code.

## 23. Reusable components

Create reusable, accessible components for Header, Mobile Navigation, Footer, Hero, CTA, Section Heading, Product Card, Solution Card, Project Card, Breadcrumbs, Specification Table, Inquiry Form, Contact Details, Admin Inquiry Table, Status Badge, and form feedback states.

Do not duplicate full page sections or inquiry logic across routes. Shared UI must not hide business rules in overly generic abstractions.

## 24. Error handling and observability

Return friendly public error states without provider details or stack traces. Log server failures with enough context to troubleshoot while avoiding secrets and unnecessary personal data. Use the inquiry ID as the correlation identifier after insertion.

Differentiate at least:

- validation failure;
- Turnstile verification failure;
- database failure before receipt;
- stored inquiry with notification failure;
- unauthorized admin access;
- failed status update.

Document how production logs are accessed in Vercel and how failed email notifications can be identified in the admin interface.

## 25. Testing and verification

Add automated tests proportional to risk. At minimum cover:

- inquiry schema validation and length limits;
- allowed and rejected status transitions/values;
- Turnstile verification success and failure handling with mocked provider responses;
- database insert failure;
- successful insert followed by Resend failure, proving the record is retained;
- authorization checks for inquiry reads and updates;
- product/source-page prefill behavior;
- public success and error states.

Before declaring the project complete, run and pass linting, TypeScript checks, automated tests, and a production build. Manually verify responsive navigation, keyboard flow, form labels/errors, public inquiry submission against a test Supabase project, notification delivery through a test Resend setup, failed-notification retention, admin login, list/detail access, and status updates.

## 26. Delivery phases

### Phase 1 — foundation

- scaffold Next.js, TypeScript, Tailwind, linting, and tests;
- establish content/configuration types and design tokens;
- add provider client boundaries and environment validation;
- add Supabase migration and setup documentation.

### Phase 2 — public website

- build responsive layout, navigation, footer, homepage, and required content routes;
- implement data-driven products, solutions, and projects;
- add SEO, sitemap, robots, structured data, accessibility, and responsive media.

### Phase 3 — real inquiry system

- implement inquiry form, server validation, Turnstile verification, Supabase insert, Resend notification, confirmation option, failure tracking, and user feedback;
- test the database-first failure contract.

### Phase 4 — protected admin

- implement Supabase Auth, explicit admin authorization, protected routes, inquiry list/detail, and validated status updates;
- verify anonymous users cannot read or mutate inquiries.

### Phase 5 — deployment readiness

- complete setup and deployment documentation;
- run quality checks and end-to-end smoke tests;
- replace or flag all remaining placeholder content;
- configure Vercel environments and production domain when credentials are available.

## 27. Out of scope for V1

Unless separately approved, do not add:

- a general-purpose CMS;
- public customer accounts;
- payments or online ordering;
- automatic translation into many languages;
- a complex CRM or marketing automation suite;
- file attachments in the public inquiry form;
- live chat or unapproved analytics/advertising trackers;
- a large cookie-management platform without a tracking requirement.

## 28. Definition of done

The project is complete only when all of the following are true:

- all required public and admin routes exist and are responsive;
- product, solution, project, company, and contact content is maintainable and centralized;
- the public form performs server-side validation and Turnstile verification;
- a valid inquiry is persisted in Supabase before email is attempted;
- business notification email is implemented through Resend;
- email failure after insertion does not lose the record and is visible to admins;
- unauthorized users cannot read inquiries or update statuses;
- approved admins can log in, list inquiries, inspect details, and update allowed statuses;
- migrations and RLS/security choices are committed and documented;
- no real secret is present in source, history, examples, logs, or browser bundles;
- SEO, accessibility, error states, and mobile behavior meet this PRD;
- lint, type-check, tests, and production build pass;
- README contains accurate local setup, provider setup, migration, test, and Vercel deployment instructions;
- placeholder business data is clearly identified and no fabricated claim is presented as verified.

## 29. Initial acceptance scenarios

1. A visitor opens a product page, clicks `Request a Quote`, and sees the product preselected.
2. Submitting malformed or incomplete data produces accessible field errors and no database record.
3. A missing or invalid Turnstile token is rejected before database insertion.
4. A valid submission creates one inquiry row and sends one business notification.
5. If Resend fails after insertion, the API does not delete the row; the admin dashboard shows the inquiry and failed notification state.
6. Refreshing or revisiting the website does not erase submitted inquiry data.
7. An unauthenticated visitor cannot access admin inquiry data by page, server action, API route, or direct Supabase query.
8. An authorized administrator can inspect an inquiry and change its status only to one of the five approved values.
9. Search engines can discover public product pages through the sitemap but are instructed not to index admin routes.
10. The project deploys to Vercel using documented environment variables without exposing server-only credentials to the browser.

