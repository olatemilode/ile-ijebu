-- ============================================================
-- ILÉ ÌJẸ̀BÚ — Database Schema
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query)
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- Shared enum: content moderation status
-- Every publishable content table uses this same lifecycle:
--   draft     -> being written, not submitted
--   pending   -> submitted, awaiting admin review
--   published -> live and publicly visible
--   rejected  -> reviewed and declined (with admin_note explaining why)
-- ------------------------------------------------------------
create type content_status as enum ('draft', 'pending', 'published', 'rejected');

-- ------------------------------------------------------------
-- profiles
-- Extends Supabase's built-in auth.users with app-specific fields.
-- A row is created automatically when a user signs up (see trigger below).
-- ------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'general_user' check (role in ('general_user', 'business_owner', 'admin')),
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- businesses
-- ------------------------------------------------------------
create table businesses (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references profiles(id) on delete set null,
  name text not null,
  slug text not null unique,
  category text not null,
  description text,
  address text,
  phone text,
  whatsapp text,
  email text,
  social_links jsonb default '{}'::jsonb,      -- { "instagram": "...", "facebook": "..." }
  hours jsonb default '{}'::jsonb,               -- { "mon": "9am-6pm", ... }
  cover_image_url text,
  gallery jsonb default '[]'::jsonb,             -- array of image URLs
  verified boolean not null default false,
  status content_status not null default 'draft',
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- places
-- ------------------------------------------------------------
create table places (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  type text not null check (type in ('heritage', 'landmark', 'palace', 'museum', 'resort', 'nature', 'hidden_gem')),
  description text,
  address text,
  cover_image_url text,
  gallery jsonb default '[]'::jsonb,
  status content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- events
-- ------------------------------------------------------------
create table events (
  id uuid primary key default uuid_generate_v4(),
  submitted_by uuid references profiles(id) on delete set null,
  title text not null,
  slug text not null unique,
  event_date date not null,
  event_time text,
  location text,
  organizer text,
  description text,
  ticket_url text,
  cover_image_url text,
  status content_status not null default 'draft',
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- stories
-- ------------------------------------------------------------
create table stories (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references profiles(id) on delete set null,
  title text not null,
  slug text not null unique,
  category text not null check (category in ('heritage', 'people', 'business', 'food', 'travel', 'community', 'history')),
  cover_image_url text,
  excerpt text,
  body text,                                      -- markdown content
  published_at timestamptz,
  status content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- partnerships (inquiry submissions, not published content)
-- ------------------------------------------------------------
create table partnerships (
  id uuid primary key default uuid_generate_v4(),
  org_name text not null,
  contact_name text,
  contact_email text not null,
  contact_phone text,
  type text not null check (type in ('business', 'sponsor', 'organization', 'community')),
  message text,
  status text not null default 'new' check (status in ('new', 'reviewed', 'closed')),
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Indexes for common queries
-- ------------------------------------------------------------
create index idx_businesses_status on businesses(status);
create index idx_businesses_category on businesses(category);
create index idx_events_status_date on events(status, event_date);
create index idx_stories_status_published on stories(status, published_at desc);
create index idx_places_status_type on places(status, type);

-- ------------------------------------------------------------
-- Auto-create a profile row when someone signs up
-- ------------------------------------------------------------
create function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'general_user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ------------------------------------------------------------
-- Row Level Security
-- Public can read only published content.
-- Owners can read/write their own draft & pending content.
-- Admins can do everything (checked via profiles.role = 'admin').
-- ------------------------------------------------------------
alter table profiles enable row level security;
alter table businesses enable row level security;
alter table places enable row level security;
alter table events enable row level security;
alter table stories enable row level security;
alter table partnerships enable row level security;

-- Helper: is the current user an admin?
create function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- profiles
create policy "Users can view their own profile" on profiles
  for select using (auth.uid() = id or is_admin());
create policy "Users can update their own profile" on profiles
  for update using (auth.uid() = id);

-- businesses
create policy "Public can view published businesses" on businesses
  for select using (status = 'published' or owner_id = auth.uid() or is_admin());
create policy "Owners can insert their own business" on businesses
  for insert with check (owner_id = auth.uid() or is_admin());
create policy "Owners can update their own business" on businesses
  for update using (owner_id = auth.uid() or is_admin());
create policy "Admins can delete businesses" on businesses
  for delete using (is_admin());

-- places (admin/content-team managed only, no public owner concept)
create policy "Public can view published places" on places
  for select using (status = 'published' or is_admin());
create policy "Admins manage places" on places
  for insert with check (is_admin());
create policy "Admins update places" on places
  for update using (is_admin());
create policy "Admins delete places" on places
  for delete using (is_admin());

-- events
create policy "Public can view published events" on events
  for select using (status = 'published' or submitted_by = auth.uid() or is_admin());
create policy "Users can submit events" on events
  for insert with check (submitted_by = auth.uid() or is_admin());
create policy "Owners or admins can update events" on events
  for update using (submitted_by = auth.uid() or is_admin());
create policy "Admins can delete events" on events
  for delete using (is_admin());

-- stories
create policy "Public can view published stories" on stories
  for select using (status = 'published' or author_id = auth.uid() or is_admin());
create policy "Authors can insert stories" on stories
  for insert with check (author_id = auth.uid() or is_admin());
create policy "Authors or admins can update stories" on stories
  for update using (author_id = auth.uid() or is_admin());
create policy "Admins can delete stories" on stories
  for delete using (is_admin());

-- partnerships (write-only for public, read for admins)
create policy "Anyone can submit a partnership inquiry" on partnerships
  for insert with check (true);
create policy "Admins can view partnership inquiries" on partnerships
  for select using (is_admin());
create policy "Admins can update partnership inquiries" on partnerships
  for update using (is_admin());
