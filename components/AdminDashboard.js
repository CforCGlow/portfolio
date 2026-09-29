"use client";
import { useEffect, useState } from "react";

// field types: text | textarea | number | bool | lines (one per line) | csv (comma separated)
const SCHEMAS = {
  experiences: [
    { k: "role", label: "Role", t: "text" },
    { k: "org", label: "Organization", t: "text" },
    { k: "period", label: "Period", t: "text" },
    { k: "sort_order", label: "Order", t: "number" },
    { k: "bullets", label: "Bullets (one per line)", t: "lines" }
  ],
  volunteering: [
    { k: "role", label: "Role", t: "text" },
    { k: "event", label: "Event", t: "text" },
    { k: "org", label: "Organizer", t: "text" },
    { k: "impact", label: "Impact", t: "text" },
    { k: "bullets", label: "Bullets (one per line)", t: "lines" }
  ],
  skills: [
    { k: "category", label: "Category", t: "text" },
    { k: "items", label: "Items (comma separated)", t: "csv" }
  ],
  projects: [
    { k: "title", label: "Title", t: "text" },
    { k: "description", label: "Description", t: "textarea" },
    { k: "tech", label: "Tech (comma separated)", t: "csv" },
    { k: "github_url", label: "GitHub URL", t: "text" },
    { k: "live_url", label: "Live URL", t: "text" },
    { k: "featured", label: "Featured", t: "bool" }
  ],
  posts: [
    { k: "slug", label: "Slug", t: "text" },
    { k: "title", label: "Title", t: "text" },
    { k: "body", label: "Body", t: "textarea" }
  ]
};

const TABS = ["messages", ...Object.keys(SCHEMAS)];

function toForm(schema, row) {
  const f = {};
  for (const { k, t } of schema) {
    const v = row?.[k];
    if (Array.isArray(v)) f[k] = t === "lines" ? v.join("\n") : v.join(", ");
    else if (typeof v === "boolean") f[k] = v;
    else f[k] = v ?? "";
  }
  return f;
}

function TableEditor({ name }) {
  const schema = SCHEMAS[name];
  const [rows, setRows] = useState(null);
  const [editing, setEditing] = useState(null); // {id?, form}
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    const r = await fetch(`/api/admin/table?name=${name}`);
    const d = await r.json();
    if (!r.ok) setErr(d.error || "Failed to load");
    else setRows(d.rows);
  }
  useEffect(() => { load(); }, [name]);

  async function save() {
    setErr("");
    const method = editing.id ? "PUT" : "POST";
    const r = await fetch("/api/admin/table", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, id: editing.id, row: editing.form })
    });
    const d = await r.json();
    if (!r.ok) { setErr(d.error || "Save failed"); return; }
    setEditing(null);
    load();
  }

  async function remove(id) {
    if (!confirm("Delete this entry?")) return;
    const r = await fetch(`/api/admin/table?name=${name}&id=${id}`, { method: "DELETE" });
    if (!r.ok) { const d = await r.json(); setErr(d.error || "Delete failed"); return; }
    load();
  }

  if (rows === null) return <p className="muted">Loading…</p>;

  return (
    <div>
      <button className="primary" style={{ width: "auto" }} onClick={() => setEditing({ id: null, form: toForm(schema, {}) })}>+ Add new</button>
      {err ? <p className="form-status error">{err}</p> : null}
      {rows.map((row) => (
        <div key={row.id} className="tile" style={{ marginTop: 12 }}>
          <strong>{row.title || row.role || row.category || row.slug || ("#" + row.id)}</strong>
          <div className="muted" style={{ fontSize: 13 }}>{row.org || row.event || row.period || ""}</div>
          <div className="row" style={{ marginTop: 8 }}>
            <button className="secondary" onClick={() => setEditing({ id: row.id, form: toForm(schema, row) })}>Edit</button>
            <button className="danger" onClick={() => remove(row.id)}>Delete</button>
          </div>
          {editing?.id === row.id ? (
            <div style={{ marginTop: 12 }}>
              {schema.map(({ k, label, t }) => (
                <div key={k}>
                  <label className="muted" style={{ fontSize: 13 }}>{label}</label>
                  {t === "textarea" || t === "lines" ? (
                    <textarea rows={t === "lines" ? 4 : 3} value={editing.form[k]} onChange={(e) => setEditing({ ...editing, form: { ...editing.form, [k]: e.target.value } })} />
                  ) : t === "bool" ? (
                    <div><input type="checkbox" style={{ width: "auto" }} checked={!!editing.form[k]} onChange={(e) => setEditing({ ...editing, form: { ...editing.form, [k]: e.target.checked } })} /> Featured</div>
                  ) : (
                    <input type={t === "number" ? "number" : "text"} value={editing.form[k]} onChange={(e) => setEditing({ ...editing, form: { ...editing.form, [k]: e.target.value } })} />
                  )}
                </div>
              ))}
              <div className="row" style={{ marginTop: 8 }}>
                <button className="primary" style={{ width: "auto" }} onClick={save}>Save</button>
                <button className="secondary" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </div>
          ) : null}
        </div>
      ))}
      {editing && !editing.id ? (
        <div className="tile" style={{ marginTop: 12 }}>
          <strong>New entry</strong>
          {schema.map(({ k, label, t }) => (
            <div key={k}>
              <label className="muted" style={{ fontSize: 13 }}>{label}</label>
              {t === "textarea" || t === "lines" ? (
                <textarea rows={4} value={editing.form[k]} onChange={(e) => setEditing({ ...editing, form: { ...editing.form, [k]: e.target.value } })} />
              ) : t === "bool" ? (
                <div><input type="checkbox" style={{ width: "auto" }} checked={!!editing.form[k]} onChange={(e) => setEditing({ ...editing, form: { ...editing.form, [k]: e.target.checked } })} /> Featured</div>
              ) : (
                <input type={t === "number" ? "number" : "text"} value={editing.form[k]} onChange={(e) => setEditing({ ...editing, form: { ...editing.form, [k]: e.target.value } })} />
              )}
            </div>
          ))}
          <div className="row" style={{ marginTop: 8 }}>
            <button className="primary" style={{ width: "auto" }} onClick={save}>Save</button>
            <button className="secondary" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MessagesInbox() {
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState("");

  async function load() {
    const r = await fetch("/api/admin/messages");
    const d = await r.json();
    if (!r.ok) setErr(d.error || "Failed");
    else setRows(d.rows);
  }
  useEffect(() => { load(); }, []);

  async function remove(id) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
    load();
  }

  if (rows === null) return <p className="muted">Loading…</p>;
  if (!rows.length) return <p className="muted">No messages yet. New contact-form submissions land here.</p>;
  return (
    <div>
      {err ? <p className="form-status error">{err}</p> : null}
      {rows.map((m) => (
        <div key={m.id} className="tile" style={{ marginTop: 12 }}>
          <strong>{m.name}</strong> <span className="muted">· {m.email} · {new Date(m.created_at).toLocaleString()}</span>
          <p>{m.message}</p>
          <button className="danger" onClick={() => remove(m.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState("messages");

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    onLogout();
  }

  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="row">
          {TABS.map((t) => (
            <button key={t} className={tab === t ? "primary" : "secondary"} style={{ width: "auto", textTransform: "capitalize" }} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <button className="danger" onClick={logout}>Log out</button>
      </div>
      <p className="muted" style={{ fontSize: 13 }}>Edits save straight to Supabase. Homepage refreshes within ~1 minute.</p>
      <div style={{ marginTop: 12 }}>
        {tab === "messages" ? <MessagesInbox /> : <TableEditor key={tab} name={tab} />}
      </div>
    </div>
  );
}
