-- Blog images: run once in Supabase SQL Editor.
-- 1) Cover-image column on posts
alter table posts add column if not exists image_url text;

-- 2) Public bucket for blog images (uploads go through the authed admin API
--    with the service_role key, so no write policy is needed)
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do update set public = true;

-- 3) Anyone can view blog images
drop policy if exists "public read blog images" on storage.objects;
create policy "public read blog images"
on storage.objects for select
using (bucket_id = 'blog-images');
