create table if not exists public.external_links (
  id text primary key,
  slug text not null unique,
  name text not null,
  abbreviation text,
  description jsonb not null default '{"th":"","en":""}'::jsonb,
  url text not null,
  category text not null,
  link_type text not null,
  authority_note jsonb not null default '{"th":"","en":""}'::jsonb,
  language text not null,
  country text not null,
  is_official boolean not null default false,
  is_recommended boolean not null default false,
  status text not null default 'needs_review',
  last_checked_at date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.external_links enable row level security;

drop policy if exists "Public reads active external links" on public.external_links;
create policy "Public reads active external links"
on public.external_links for select
using (status = 'active');

create index if not exists external_links_category_idx
on public.external_links (category, status);
