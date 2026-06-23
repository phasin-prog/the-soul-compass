create table if not exists public.article_publications (
  id text primary key,
  slug text not null,
  language text not null check (language in ('th', 'en')),
  status text not null default 'published' check (status = 'published'),
  title text not null,
  subtitle text not null default '',
  excerpt text not null,
  category text not null check (
    category in (
      'analytical-psychology',
      'psychoanalysis',
      'neuroscience',
      'social-psychology',
      'philosophy',
      'philosophy-of-mind',
      'typology',
      'tpdt'
    )
  ),
  school text not null check (
    school in (
      'Analytical Psychology',
      'Psychoanalysis',
      'Neuroscience',
      'Social Psychology',
      'Philosophy',
      'Philosophy of Mind',
      'Typology',
      'TPDT'
    )
  ),
  difficulty text not null check (
    difficulty in ('beginner', 'intermediate', 'advanced')
  ),
  reading_time integer not null check (reading_time > 0),
  published_at timestamptz not null,
  updated_at timestamptz not null,
  author text not null,
  cover_image jsonb,
  tags text[] not null default '{}',
  aliases text[] not null default '{}',
  related_concepts jsonb not null default '[]'::jsonb,
  related_articles text[] not null default '{}',
  "references" jsonb not null default '[]'::jsonb,
  series_id text,
  seo_title text not null,
  seo_description text not null,
  translations jsonb not null default '{}'::jsonb,
  featured boolean not null default false,
  markdown_key text not null,
  content_hash text not null,
  created_at timestamptz not null default now(),
  constraint article_publications_language_slug_key unique (language, slug),
  constraint article_publications_cover_image_object check (
    cover_image is null or jsonb_typeof(cover_image) = 'object'
  ),
  constraint article_publications_related_concepts_array check (
    jsonb_typeof(related_concepts) = 'array'
  ),
  constraint article_publications_references_array check (
    jsonb_typeof("references") = 'array'
  ),
  constraint article_publications_translations_object check (
    jsonb_typeof(translations) = 'object'
  )
);

comment on table public.article_publications is
  'Public article metadata and R2 object pointers. Draft and review bodies remain private in R2.';

create index if not exists article_publications_language_published_at_idx
  on public.article_publications (language, published_at desc);

create index if not exists article_publications_category_idx
  on public.article_publications (language, category, published_at desc);

create index if not exists article_publications_difficulty_idx
  on public.article_publications (language, difficulty, published_at desc);

create index if not exists article_publications_tags_gin_idx
  on public.article_publications using gin (tags);

alter table public.article_publications enable row level security;

revoke all on table public.article_publications from anon, authenticated;
grant select on table public.article_publications to anon, authenticated;
grant all on table public.article_publications to service_role;

drop policy if exists "Published articles are publicly readable"
  on public.article_publications;

create policy "Published articles are publicly readable"
  on public.article_publications
  for select
  to anon, authenticated
  using (status = 'published');
