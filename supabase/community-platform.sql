-- ArtBOP community, submissions, and shop foundation.
-- Run once in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text not null default '',
  bio text not null default '',
  avatar_url text not null default '',
  website_url text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

insert into public.profiles (id, display_name)
select
  id,
  coalesce(raw_user_meta_data ->> 'display_name', '')
from auth.users
on conflict (id) do nothing;

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 2000),
  image_urls text[] not null default '{}',
  link_url text not null default '',
  status text not null default 'pending_review'
    check (status in ('draft', 'pending_review', 'published', 'rejected')),
  moderation_note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_title text not null,
  category text not null default '',
  author_or_studio text not null default '',
  contact_email text not null default '',
  description text not null default '',
  institution text not null default '',
  project_url text not null default '',
  image_urls text[] not null default '{}',
  rights_confirmed boolean not null default false,
  status text not null default 'draft'
    check (status in ('draft', 'pending_review', 'changes_requested', 'approved', 'rejected', 'published')),
  moderation_note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'sold_out', 'archived')),
  title_zh text not null default '',
  title_en text not null default '',
  description_zh text not null default '',
  description_en text not null default '',
  artist_name text not null default '',
  category text not null default '',
  price_amount numeric(12, 2),
  currency text not null default 'CNY',
  stock_quantity integer,
  cover_url text not null default '',
  images text[] not null default '{}',
  purchase_url text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists community_posts_set_updated_at on public.community_posts;
create trigger community_posts_set_updated_at before update on public.community_posts
for each row execute function public.set_updated_at();

drop trigger if exists project_submissions_set_updated_at on public.project_submissions;
create trigger project_submissions_set_updated_at before update on public.project_submissions
for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.community_posts enable row level security;
alter table public.project_submissions enable row level security;
alter table public.products enable row level security;

drop policy if exists "Profiles are public" on public.profiles;
create policy "Profiles are public" on public.profiles
for select to anon, authenticated using (true);

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile" on public.profiles
for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "Published community posts are public" on public.community_posts;
create policy "Published community posts are public" on public.community_posts
for select to anon, authenticated using (status = 'published' or auth.uid() = user_id);

drop policy if exists "Users create own community posts" on public.community_posts;
create policy "Users create own community posts" on public.community_posts
for insert to authenticated
with check (auth.uid() = user_id and status in ('draft', 'pending_review'));

drop policy if exists "Users update own unpublished posts" on public.community_posts;
create policy "Users update own unpublished posts" on public.community_posts
for update to authenticated
using (auth.uid() = user_id and status in ('draft', 'pending_review', 'rejected'))
with check (auth.uid() = user_id and status in ('draft', 'pending_review'));

drop policy if exists "Users delete own community posts" on public.community_posts;
create policy "Users delete own community posts" on public.community_posts
for delete to authenticated using (auth.uid() = user_id);

drop policy if exists "Users read own submissions" on public.project_submissions;
create policy "Users read own submissions" on public.project_submissions
for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Users create own submissions" on public.project_submissions;
create policy "Users create own submissions" on public.project_submissions
for insert to authenticated
with check (auth.uid() = user_id and status in ('draft', 'pending_review'));

drop policy if exists "Users update own reviewable submissions" on public.project_submissions;
create policy "Users update own reviewable submissions" on public.project_submissions
for update to authenticated
using (auth.uid() = user_id and status in ('draft', 'changes_requested', 'rejected'))
with check (auth.uid() = user_id and status in ('draft', 'pending_review'));

drop policy if exists "Published products are public" on public.products;
create policy "Published products are public" on public.products
for select to anon, authenticated using (status in ('published', 'sold_out'));

grant select on public.profiles to anon, authenticated;
grant select, insert, update, delete on public.community_posts to authenticated;
grant select on public.community_posts to anon;
grant select, insert, update on public.project_submissions to authenticated;
grant select on public.products to anon, authenticated;

insert into storage.buckets (id, name, public)
values ('community-media', 'community-media', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('submission-media', 'submission-media', false)
on conflict (id) do update set public = false;

drop policy if exists "Community media is public" on storage.objects;
create policy "Community media is public" on storage.objects
for select to public using (bucket_id = 'community-media');

drop policy if exists "Users upload own community media" on storage.objects;
create policy "Users upload own community media" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'community-media'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users manage own community media" on storage.objects;
create policy "Users manage own community media" on storage.objects
for delete to authenticated
using (
  bucket_id = 'community-media'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users upload own submission media" on storage.objects;
create policy "Users upload own submission media" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'submission-media'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users read own submission media" on storage.objects;
create policy "Users read own submission media" on storage.objects
for select to authenticated
using (
  bucket_id = 'submission-media'
  and (storage.foldername(name))[1] = auth.uid()::text
);
