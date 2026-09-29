import { createHash } from "crypto";

export function adminToken() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHash("sha256").update("admin:" + pw).digest("hex");
}

export function isAuthed(cookieStore) {
  const expected = adminToken();
  if (!expected) return false;
  return cookieStore.get("admin_auth")?.value === expected;
}

export const EDITABLE_TABLES = {
  experiences: ["role", "org", "period", "bullets", "sort_order"],
  volunteering: ["role", "event", "org", "impact", "bullets"],
  achievements: ["title", "org", "year", "description"],
  skills: ["category", "items"],
  projects: ["title", "description", "tech", "github_url", "live_url", "image_url", "featured"],
  posts: ["slug", "title", "body", "image_url"]
};

export function cleanRow(name, row) {
  const allowed = EDITABLE_TABLES[name];
  if (!allowed) return null;
  const out = {};
  for (const k of allowed) {
    if (!(k in row)) continue;
    let v = row[k];
    if (k === "sort_order") v = parseInt(v, 10) || 0;
    if (k === "featured") v = v === true || v === "true" || v === "on";
    if (["bullets", "items", "tech"].includes(k) && typeof v === "string") {
      v = k === "bullets" ? v.split("\n").map((s) => s.trim()).filter(Boolean) : v.split(",").map((s) => s.trim()).filter(Boolean);
    }
    out[k] = v;
  }
  return out;
}
