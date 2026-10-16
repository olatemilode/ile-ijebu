# Ilé Ìjẹ̀bú

**The Digital Home of Ijebuland** — a mobile-first web platform for
Ijebuland's places, businesses, events, stories, and partnerships.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Supabase.

---

## Quickstart — run it right now, no database needed

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. The site runs on built-in sample content
(a few businesses, events, and stories) until you connect a real Supabase
project — a small banner at the top says so. Everything is fully
browsable and clickable: pages, dark/light mode, the partner inquiry
form, and `/admin-login`. Nothing is actually saved to a database yet —
form submissions and admin actions just log to your terminal.

## Connecting a real database

1. Create a free project at [supabase.com](https://supabase.com).
2. In your project, go to **SQL Editor → New query**, paste the entire
   contents of `supabase/schema.sql`, and run it. This creates all tables,
   the content-status workflow, and row-level security policies.
3. Go to **Project Settings → API** and copy:
   - Project URL
   - `anon` `public` key
   - `service_role` key (keep this secret — never expose it to the browser)
4. Paste those three values into `.env.local` (replacing the blank
   `NEXT_PUBLIC_SUPABASE_URL` etc. lines).
5. Restart `npm run dev` — the mock-data banner disappears and the site
   switches to live Supabase queries automatically. No code changes needed.
6. Optional: `npm run seed` to populate your new database with the same
   sample content the mock mode uses, so `/admin` has something to review.

---

## Project structure

```
app/
  page.tsx                 Homepage (assembles section components)
  businesses/               Directory listing + /[slug] detail pages
  events/                    "
  stories/                   "
  about/                    Mission/vision page
  partner/                  Partnership inquiry form (writes to DB)
  admin/                    Content review dashboard (auth-gated)
  admin-login/              Admin login (separate route so the /admin
                             auth guard doesn't lock out the login page itself)

components/
  sections/                 Homepage section components
  ui/                       Small reusable primitives (Eyebrow, EmptyState, BeadedDivider)
  admin/                    Admin-only components (StatusBadge, ContentRow)
  site-header.tsx, site-footer.tsx, theme-provider.tsx, theme-toggle.tsx

lib/
  supabase/                 client.ts (browser), server.ts (server components,
                             respects RLS), admin.ts (service role, bypasses RLS —
                             server-only, used by admin dashboard)
  data/                     Typed query functions per content type
  types/database.ts         TypeScript types mirroring supabase/schema.sql
  admin-auth.ts             Simple cookie-based admin gate

supabase/schema.sql          Full database schema — run this first
scripts/seed.ts               Sample content generator
```

## Content workflow

Every content table (`businesses`, `events`, `stories`, plus `places`)
shares the same `status` lifecycle:

```
draft → pending → published
              ↘ rejected
```

Only `published` content is publicly visible. The `/admin` dashboard lists
everything regardless of status, with Publish / Reject / Delete actions.

**For now**, since you're the only content manager, new businesses/events/
stories are added directly through Supabase's table editor (or the seed
script). A public submission form for business owners is the natural next
step once you're ready to open self-signup — the database and RLS policies
already support it (see `owner_id` / `submitted_by` / `author_id` columns
and the matching policies in `schema.sql`).

## Design system

- **Colors**: Ivory `#FBF6EA`, Rich Gold `#C9A227`, Deep Cocoa `#3B2416`,
  plus two regal accents — Aró Red `#7A1F2B` and Aro Green `#0E4D3C`,
  used sparingly (chieftaincy-cloth colors, not backgrounds).
- **Type**: Fraunces (display/headlines) + Inter (body/UI).
- **Signature motifs**: a woven-border pattern (CSS-only, inspired by
  aṣọ òkè strip-weaving) at major section boundaries, and a beaded
  divider (ìlẹ̀kẹ̀-inspired) marking section transitions.
- **Dark/light mode**: persisted to `localStorage`, respects system
  preference on first visit, no flash-of-wrong-theme (inline script in
  `app/layout.tsx` sets the class before paint).

## Next steps (not yet built)

- Business owner self-signup + dashboard (schema already supports it)
- Image upload to Supabase Storage for business/event/story cover photos
- Search and filtering across Explore/Marketplace
- Markdown rendering for story bodies (currently plain paragraphs)
- Real Supabase-auth-based admin roles instead of the shared access code
