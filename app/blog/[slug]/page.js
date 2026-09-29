import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";

export const revalidate = 60;

async function getPost(slug) {
  try {
    const db = getSupabaseAdmin();
    const { data } = await db.from("posts").select("*").eq("slug", slug).single();
    return data || null;
  } catch {
    return null;
  }
}

function fmt(d) {
  try { return new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }); }
  catch { return ""; }
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  return (
    <main className="feed-wrap">
      <div className="feed">
        <Link href="/blog" className="muted">← All notes</Link>
        <article className="post" style={{ marginTop: 12 }}>
          <div className="post-head">
            <img src="/profile.jpg" alt="Kazim Akeeb Onik" className="avatar" />
            <div>
              <strong>Kazim Akeeb Onik</strong>
              <div className="muted" style={{ fontSize: 12 }}>{fmt(post.published_at)}</div>
            </div>
          </div>
          <h1 className="post-title" style={{ fontSize: 26 }}>{post.title}</h1>
          {post.image_url ? <img src={post.image_url} alt="" className="post-cover" /> : null}
          <p className="post-body">{post.body}</p>
        </article>
      </div>
    </main>
  );
}
