import Link from "next/link";
import MatrixBg from "@/components/MatrixBg";
import { getSupabaseAdmin } from "@/lib/supabase";

export const revalidate = 60;

async function getPosts() {
  try {
    const db = getSupabaseAdmin();
    const { data, error } = await db.from("posts").select("slug,title,published_at").order("published_at", { ascending: false });
    if (error || !data?.length) return null;
    return data;
  } catch {
    return null;
  }
}

const FALLBACK = [
  { slug: null, title: "ICPC 2024 Preliminary – what I learned", note: "Coming soon" },
  { slug: null, title: "LaTeX for research writing – templates", note: "Coming soon" },
  { slug: null, title: "Organizing AI CodeLab 2026 for 500+ participants", note: "Coming soon" }
];

export default async function Blog() {
  const posts = await getPosts();
  return (
    <main>
      <MatrixBg />
      <div className="page-above">
        <div className="card">
          <h2 className="section-title">Blog / Notes</h2>
          <p className="muted">AI learnings, CP write-ups, and research notes. New posts are written from the Admin → Posts tab.</p>
          {posts ? (
            posts.map((p) => (
              <div key={p.slug} className="ach">
                <span className="icon">📝</span>
                <div>
                  <Link href={`/blog/${p.slug}`}><strong>{p.title}</strong></Link>
                  <br /><span className="muted">{p.published_at ? new Date(p.published_at).toLocaleDateString() : ""}</span>
                </div>
              </div>
            ))
          ) : (
            <ul>
              {FALLBACK.map((p, i) => (
                <li key={i}><strong>{p.note}:</strong> {p.title}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
