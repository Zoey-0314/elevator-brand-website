-- NS Elevator inquiry persistence and authorization baseline.
-- Public form writes use the server-only service role after Turnstile verification.
-- No anon/authenticated RLS policies are created: direct public reads and writes are denied.

create extension if not exists pgcrypto;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  company text null check (company is null or char_length(company) <= 160),
  email text not null check (char_length(email) <= 254),
  phone text null check (phone is null or char_length(phone) <= 80),
  country text not null check (char_length(country) between 2 and 120),
  product text null check (product is null or char_length(product) <= 120),
  project_type text null check (project_type is null or char_length(project_type) <= 120),
  quantity text null check (quantity is null or char_length(quantity) <= 80),
  message text not null check (char_length(message) between 20 and 4000),
  source_page text null check (source_page is null or char_length(source_page) <= 500),
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'won', 'closed')),
  email_notification_status text not null default 'pending' check (email_notification_status in ('pending', 'sent', 'failed')),
  email_notification_error text null check (email_notification_error is null or char_length(email_notification_error) <= 1000),
  customer_confirmation_status text null check (customer_confirmation_status is null or customer_confirmation_status in ('pending', 'sent', 'failed', 'disabled'))
);

create index if not exists inquiries_created_at_desc_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_created_at_idx on public.inquiries (status, created_at desc);
create index if not exists inquiries_notification_status_idx on public.inquiries (email_notification_status) where email_notification_status <> 'sent';
create index if not exists inquiries_email_lower_idx on public.inquiries (lower(email));

create or replace function public.set_inquiries_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_inquiries_updated_at on public.inquiries;
create trigger set_inquiries_updated_at
before update on public.inquiries
for each row execute function public.set_inquiries_updated_at();

alter table public.inquiries enable row level security;
alter table public.inquiries force row level security;

revoke all on table public.inquiries from anon, authenticated;
grant all on table public.inquiries to service_role;

comment on table public.inquiries is 'Authoritative NS Elevator website inquiry records. Access only through server-verified application paths.';
comment on column public.inquiries.email_notification_error is 'Admin-only provider diagnostic, never returned by the public API.';
