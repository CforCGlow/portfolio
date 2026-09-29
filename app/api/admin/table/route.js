import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAuthed, EDITABLE_TABLES, cleanRow } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

function deny() {
  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}

export async function GET(req) {
  if (!isAuthed(cookies())) return deny();
  const name = new URL(req.url).searchParams.get("name");
  if (!EDITABLE_TABLES[name]) return NextResponse.json({ error: "Unknown table" }, { status: 400 });
  const db = getSupabaseAdmin();
  const orderCol = name === "experiences" ? "sort_order" : "id";
  const { data, error } = await db.from(name).select("*").order(orderCol, { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ rows: data });
}

export async function POST(req) {
  if (!isAuthed(cookies())) return deny();
  const { name, row } = await req.json();
  const clean = cleanRow(name, row || {});
  if (!clean) return NextResponse.json({ error: "Unknown table" }, { status: 400 });
  const db = getSupabaseAdmin();
  const { data, error } = await db.from(name).insert([clean]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ row: data });
}

export async function PUT(req) {
  if (!isAuthed(cookies())) return deny();
  const { name, id, row } = await req.json();
  const clean = cleanRow(name, row || {});
  if (!clean || !id) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  const db = getSupabaseAdmin();
  const { data, error } = await db.from(name).update(clean).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ row: data });
}

export async function DELETE(req) {
  if (!isAuthed(cookies())) return deny();
  const q = new URL(req.url).searchParams;
  const name = q.get("name");
  const id = q.get("id");
  if (!EDITABLE_TABLES[name] || !id) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  const db = getSupabaseAdmin();
  const { error } = await db.from(name).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
