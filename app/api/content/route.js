import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { profile, experiences, volunteering, achievements, skills, projects } from "@/lib/data";

// GET /api/content -> returns DB content if configured, else static fallback
export async function GET() {
  try {
    const db = getSupabaseAdmin();
    const [exp, vol, ach, skl, proj, msgs] = await Promise.all([
      db.from("experiences").select("*").order("sort_order"),
      db.from("volunteering").select("*").order("created_at", { ascending: false }),
      db.from("achievements").select("*").order("year", { ascending: false }),
      db.from("skills").select("*"),
      db.from("projects").select("*").order("featured", { ascending: false }),
      db.from("messages").select("id,name,email,message,created_at").order("created_at", { ascending: false }).limit(20)
    ]);
    return NextResponse.json({
      source: "supabase",
      experiences: exp.data, volunteering: vol.data, achievements: ach.data,
      skills: skl.data, projects: proj.data, messages: msgs.data
    });
  } catch {
    return NextResponse.json({
      source: "static",
      profile, experiences, volunteering, achievements, skills, projects
    });
  }
}
