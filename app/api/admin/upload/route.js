import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAuthed } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_BYTES = 3 * 1024 * 1024;

export async function POST(req) {
  if (!isAuthed(cookies())) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || typeof file === "string") return NextResponse.json({ error: "No file sent" }, { status: 400 });
    if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "Only PNG, JPG, WebP or GIF" }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "Max file size is 3MB" }, { status: 400 });

    const ext = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buf = Buffer.from(await file.arrayBuffer());

    const db = getSupabaseAdmin();
    const { error } = await db.storage.from("blog-images").upload(name, buf, { contentType: file.type, upsert: false });
    if (error) {
      const msg = /bucket not found/i.test(error.message)
        ? "Storage bucket missing. Run supabase/migration_blog_images.sql in the Supabase SQL Editor, then retry."
        : error.message;
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    const { data } = db.storage.from("blog-images").getPublicUrl(name);
    return NextResponse.json({ url: data.publicUrl });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
