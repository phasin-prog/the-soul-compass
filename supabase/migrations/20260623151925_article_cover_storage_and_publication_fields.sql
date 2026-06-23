alter table public.article_publications
  add column if not exists cover_url text,
  add column if not exists cover_path text,
  add column if not exists cover_alt text;

update public.article_publications
set
  cover_url = coalesce(cover_url, cover_image->>'src'),
  cover_alt = coalesce(cover_alt, cover_image->>'alt')
where cover_image is not null;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'article-covers',
  'article-covers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Clerk authorizes Studio writes in server actions. Browser roles receive no
-- mutation policy; the server-only service key performs validated uploads.
