create extension if not exists pgcrypto;

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  status text not null default 'draft'
    check (status in ('draft', 'pending_review', 'scheduled', 'published')),
  publish_at timestamptz,
  title_en text not null default '',
  title_zh text not null default '',
  excerpt_en text not null default '',
  excerpt_zh text not null default '',
  body_en jsonb not null default '[]'::jsonb,
  body_zh jsonb not null default '[]'::jsonb,
  category_en text not null default '',
  category_zh text not null default '',
  author text not null default '',
  team text not null default '',
  source_name text not null default '',
  source_url text not null default '',
  cover_url text not null default '',
  images text[] not null default '{}',
  xhs_title text not null default '',
  xhs_content text not null default '',
  hashtags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
before update on public.articles
for each row execute function public.set_updated_at();

alter table public.articles enable row level security;

drop policy if exists "Published articles are public" on public.articles;
create policy "Published articles are public"
on public.articles
for select
to anon, authenticated
using (
  status = 'published'
  or (
    status = 'scheduled'
    and publish_at is not null
    and publish_at <= now()
  )
);

create or replace view public.public_articles
with (security_invoker = true)
as
select *
from public.articles
where
  status = 'published'
  or (
    status = 'scheduled'
    and publish_at is not null
    and publish_at <= now()
  );

grant select on public.public_articles to anon, authenticated;

insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Article images are public" on storage.objects;
create policy "Article images are public"
on storage.objects
for select
to public
using (bucket_id = 'article-images');
