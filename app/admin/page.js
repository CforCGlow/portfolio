"use client";
import { useEffect, useState } from "react";

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [data, setData] = useState(null);

  async function login(e) {
    e.preventDefault();
    // Simple check: server validates via query? For v1, compare with env-exposed flow:
    // POST password to /api/content is not needed – just fetch and show messages.
    // Real auth: set ADMIN_PASSWORD in .env.local and extend API. This is a starter gate.
    if (!pw) return;
    sessionStorage.setItem("admin_pw", pw);
    setAuthed(true);
  }

  useEffect(() => {
    if (!authed) return;
    fetch("/api/content").then((r) => r.json()).then(setData);
  }, [authed]);

  if (!authed) {
    return (
      <div className="card">
        <h2>Admin</h2>
        <p className="muted">Enter ADMIN_PASSWORD (starter gate – wire real auth before deploy).</p>
        <form onSubmit={login}>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Admin password" />
          <button className="primary" type="submit">Unlock</button>
        </form>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Content Overview</h2>
      <p className="muted">Source: {data?.source} – connect Supabase to edit live. Static fallback lives in lib/data.js</p>
      <pre style={{ overflow: "auto", fontSize: 12 }}>{JSON.stringify(data, null, 2)?.slice(0, 4000)}</pre>
    </div>
  );
}
