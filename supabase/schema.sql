-- Portfolio Supabase schema (Postgres)
-- Run in Supabase SQL Editor

create table if not exists profile (
  id bigint generated always as identity primary key,
  name text, title text, bio text, email text, phone text,
  location text, photo_url text, resume_url text,
  socials jsonb default '{}'::jsonb
);

create table if not exists experiences (
  id bigint generated always as identity primary key,
  role text not null, org text, period text,
  bullets text[] default '{}',
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists volunteering (
  id bigint generated always as identity primary key,
  role text, event text, org text, impact text,
  bullets text[] default '{}',
  created_at timestamptz default now()
);

create table if not exists achievements (
  id bigint generated always as identity primary key,
  title text, org text, year text, description text
);

create table if not exists skills (
  id bigint generated always as identity primary key,
  category text, items text[] default '{}'
);

create table if not exists projects (
  id bigint generated always as identity primary key,
  title text, description text, tech text[] default '{}',
  github_url text, live_url text, image_url text,
  featured boolean default false
);

create table if not exists posts (
  id bigint generated always as identity primary key,
  slug text unique not null, title text, body text,
  published_at timestamptz default now()
);

create table if not exists messages (
  id bigint generated always as identity primary key,
  name text not null, email text not null, message text not null,
  created_at timestamptz default now()
);

-- Public read, write only via service_role (API) except messages insert
alter table profile enable row level security;
alter table experiences enable row level security;
alter table volunteering enable row level security;
alter table achievements enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;
alter table posts enable row level security;
alter table messages enable row level security;

drop policy if exists "public read" on profile;
create policy "public read" on profile for select using (true);
drop policy if exists "public read" on experiences;
create policy "public read" on experiences for select using (true);
drop policy if exists "public read" on volunteering;
create policy "public read" on volunteering for select using (true);
drop policy if exists "public read" on achievements;
create policy "public read" on achievements for select using (true);
drop policy if exists "public read" on skills;
create policy "public read" on skills for select using (true);
drop policy if exists "public read" on projects;
create policy "public read" on projects for select using (true);
drop policy if exists "public read posts" on posts;
create policy "public read posts" on posts for select using (true);

drop policy if exists "insert messages" on messages;
create policy "insert messages" on messages for insert with check (true);
