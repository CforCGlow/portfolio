import MatrixBg from "@/components/MatrixBg";

export default function Blog() {
  return (
    <main>
      <MatrixBg />
      <div className="page-above">
        <div className="card">
          <h2 className="section-title">Blog / Notes</h2>
          <p className="muted">AI learnings, CP write-ups, and LaTeX research notes.</p>
          <ul>
            <li><strong>Coming soon:</strong> ICPC 2024 Preliminary – what I learned</li>
            <li><strong>Coming soon:</strong> LaTeX for research writing – templates</li>
            <li><strong>Coming soon:</strong> Organizing AI CodeLab 2026 for 500+ participants</li>
          </ul>
          <p className="muted">Backed by Supabase table posts(slug, title, body, published_at) – wire /blog/[slug] when DB is ready.</p>
        </div>
      </div>
    </main>
  );
}
