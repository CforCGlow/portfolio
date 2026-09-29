# Kazim Akeeb Onik – Portfolio (Next.js + Supabase)

Leadership-led portfolio for CSE undergrad (CGPA 3.81), Co-Founder @ One Percent, IEEE/SEUCC organizer.

## Run
1. Copy `.env.example` to `.env.local` and fill Supabase keys
2. Run SQL in `supabase/schema.sql` in Supabase dashboard
3. Add `public/profile.jpg` (your formal photo) and `public/resume.pdf`
4. Install + dev:
```
npm.cmd install
npm.cmd run dev
```

## Structure
- `app/page.js` – single-page portfolio (hero, experience, community, skills, projects, contact)
- `app/api/contact` – stores messages to Supabase `messages` table
- `app/api/content` – returns Supabase content or static fallback from `lib/data.js`
- `app/blog`, `app/admin` – starters
- `lib/data.js` – CV content fallback so site works without DB
