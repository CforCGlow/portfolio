"use client";
import { useEffect, useState } from "react";
import MatrixBg from "@/components/MatrixBg";
import AdminDashboard from "@/components/AdminDashboard";

export default function Admin() {
  const [authed, setAuthed] = useState(null);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("/api/admin/login").then((r) => r.json()).then((d) => setAuthed(d.authed));
  }, []);

  async function login(e) {
    e.preventDefault();
    setErr("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw })
    });
    const d = await r.json();
    if (!r.ok) { setErr(d.error || "Login failed"); return; }
    setPw("");
    setAuthed(true);
  }

  return (
    <main>
      <MatrixBg />
      <div className="page-above card">
        {authed === null ? <p className="muted">Loading…</p> : !authed ? (
          <div>
            <h2>Admin</h2>
            <p className="muted">Enter your admin password to manage inbox and site content.</p>
            <form onSubmit={login}>
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Admin password" />
              <button className="primary" type="submit">Unlock</button>
            </form>
            {err ? <p className="form-status error">{err}</p> : null}
          </div>
        ) : (
          <div>
            <h2 style={{ marginTop: 0 }}>Dashboard</h2>
            <AdminDashboard onLogout={() => setAuthed(false)} />
          </div>
        )}
      </div>
    </main>
  );
}
