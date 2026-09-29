import { createClient } from "@supabase/supabase-js";

let admin = null;
export function getSupabaseAdmin() {
  if (admin) return admin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env. Copy .env.example to .env.local");
  admin = createClient(url, key, { auth: { persistSession: false } });
  return admin;
}

export function getSupabasePublic() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // fallback to admin client if anon not set (read-only tables have public SELECT)
  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  if (!anon) return null;
  return createClient(url, anon, { auth: { persistSession: false } });
}
