import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase";

export const revalidate = 60;

async function getPosts() {
  try {
    const db = getSupabaseAdmin();
    const { data, error } = await db.from("posts").select("*").order("published_at", { ascending: false });
    if (error || !data?.length) return null;
    return data;
  } catch {
    return null;
  }
}

const UPCOMING = [
  "ICPC 2024 Preliminary – what I learned",
  "LaTeX for research writing – templates",
  "Organizing AI CodeLab 2026 for 500+ participants"
];

function fmt(d) {
  try { return new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }); }
  catch { return ""; }
}

export default async function Blog() {
  const posts = await getPosts();
  return (
    <main className="feed-wrap">
      <div className="feed">
        <div className="feed-profile">
          <img src="/profile.jpg" alt="Kazim Akeeb Onik" className="avatar lg" />
          <div>
            <strong className="feed-name">Kazim Akeeb Onik</strong>
            <div className="muted" style={{ fontSize: 13 }}>Notes on AI · CP · research · community</div>
          </div>
          <span className="badge">Blog</span>
        </div>

        {posts ? posts.map((p) => (
          <article key={p.slug} className="post">
            <div className="post-head">
              <img src="/profile.jpg" alt="" className="avatar" />
              <div>
                <strong>Kazim Akeeb Onik</strong>
                <div className="muted" style={{ fontSize: 12 }}>{fmt(p.published_at)}</div>
              </div>
            </div>
            <Link href={`/blog/${p.slug}`} className="post-title">{p.title}</Link>
            <p className="muted post-excerpt">{(p.body || "").slice(0, 160)}{(p.body || "").length > 160 ? "…" : ""}</p>
            {p.image_url ? (
              <Link href={`/blog/${p.slug}`}><img src={p.image_url} alt="" className="post-cover" /></Link>
            ) : null}
            <div className="post-actions">
              <Link href={`/blog/${p.slug}`} className="read-more">Read note →</Link>
            </div>
          </article>
        )) : (
          <div>
            {UPCOMING.map((t, i) => (
              <article key={i} className="post soon">
                <div className="post-head">
                  <img src="/profile.jpg" alt="" className="avatar" />
                  <div>
                    <strong>Kazim Akeeb Onik</strong>
                    <div className="muted" style={{ fontSize: 12 }}><span className="badge">Soon</span></div>
                  </div>
                </div>
                <p className="post-title" style={{ marginBottom: 0 }}>{t}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
