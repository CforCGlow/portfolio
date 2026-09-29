import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminToken, isAuthed } from "@/lib/admin-auth";
import { rateLimit, resetRateLimit } from "@/lib/rate-limit";

function clientIp(req) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export async function GET() {
  return NextResponse.json({ authed: isAuthed(cookies()) });
}

export async function POST(req) {
  try {
    const ip = clientIp(req);
    const limit = rateLimit("login:" + ip, 10);
    if (!limit.allowed) {
      return NextResponse.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });
    }
    const { password } = await req.json();
    const token = adminToken();
    if (!token) return NextResponse.json({ error: "ADMIN_PASSWORD not set on server" }, { status: 500 });
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }
    resetRateLimit("login:" + ip);
    cookies().set("admin_auth", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE() {
  cookies().set("admin_auth", "", { httpOnly: true, path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
