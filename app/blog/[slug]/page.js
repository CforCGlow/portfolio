import Link from "next/link";
import { notFound } from "next/navigation";
import MatrixBg from "@/components/MatrixBg";
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

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  return (
    <main>
      <MatrixBg />
      <div className="page-above">
        <div className="card">
          <Link href="/blog" className="muted">← All notes</Link>
          <h1 style={{ letterSpacing: "-1px" }}>{post.title}</h1>
          <p className="muted">{post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}</p>
          {post.image_url ? <img src={post.image_url} alt="" className="blog-cover" /> : null}
          <p style={{ whiteSpace: "pre-wrap" }}>{post.body}</p>
        </div>
      </div>
    </main>
  );
}
