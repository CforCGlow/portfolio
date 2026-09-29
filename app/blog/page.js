export default function Blog() {
  return (
    <main>
      <div className="card">
        <h2 className="section-title">Blog / Notes</h2>
        <p className="muted">Use this for AI learnings, CP write-ups, and LaTeX research notes. This compensates for fewer projects and shows research interest.</p>
        <ul>
          <li><strong>Coming soon:</strong> ICPC 2024 Preliminary – what I learned</li>
          <li><strong>Coming soon:</strong> LaTeX for research writing – templates</li>
          <li><strong>Coming soon:</strong> Organizing AI CodeLab 2026 for 500+ participants</li>
        </ul>
        <p className="muted"> backed by Supabase table posts(slug, title, body, published_at) – wire /blog/[slug] when DB is ready.</p>
      </div>
    </main>
  );
}
