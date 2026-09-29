import { getSupabaseAdmin } from "@/lib/supabase";
import * as fallback from "@/lib/data";

// Homepage content: Supabase first, static lib/data.js fallback.
// Called from a server component; never throws.
export async function getSiteContent() {
  try {
    const db = getSupabaseAdmin();
    const [e, v, s, pr] = await Promise.all([
      db.from("experiences").select("role,org,period,bullets").order("sort_order", { ascending: true }),
      db.from("volunteering").select("role,event,org,impact,bullets").order("id", { ascending: true }),
      db.from("skills").select("category,items").order("id", { ascending: true }),
      db.from("projects").select("title,description,tech,github_url,live_url").order("featured", { ascending: false }).order("id", { ascending: true })
    ]);
    return {
      profile: fallback.profile,
      experiences: e.data?.length ? e.data : fallback.experiences,
      volunteering: v.data?.length ? v.data : fallback.volunteering,
      skills: s.data?.length ? s.data : fallback.skills,
      projects: pr.data?.length ? pr.data : fallback.projects
    };
  } catch {
    return fallback;
  }
}
