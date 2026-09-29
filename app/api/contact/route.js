import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }
    // Try Supabase, fallback to success (log) if env missing during dev
    try {
      const db = getSupabaseAdmin();
      const { error } = await db.from("messages").insert([{ name, email, message }]);
      if (error) throw error;
    } catch (dbErr) {
      console.log("Contact (no DB):", { name, email, message, dbErr: String(dbErr) });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
