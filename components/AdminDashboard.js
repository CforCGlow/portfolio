"use client";
import { useEffect, useState } from "react";

// field types: text | textarea | number | bool | lines (one per line) | csv (comma separated) | image
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
    { k: "image_url", label: "Cover image", t: "image" },
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

function ImageField({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  async function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Upload failed");
      onChange(d.url);
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {value ? <img src={value} alt="cover preview" className="admin-preview" /> : null}
      <input placeholder="Image URL (or upload below)" value={value} onChange={(e) => onChange(e.target.value)} />
      <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={upload} />
      {uploading ? <p className="muted">Uploading…</p> : null}
      {err ? <p className="form-status error">{err}</p> : null}
    </div>
  );
}

function Field({ def, value, onChange }) {
  const { k, label, t } = def;
  return (
    <div>
      <label className="muted" style={{ fontSize: 13 }}>{label}</label>
      {t === "textarea" || t === "lines" ? (
        <textarea rows={t === "lines" ? 4 : 5} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : t === "bool" ? (
        <div><input type="checkbox" style={{ width: "auto" }} checked={!!value} onChange={(e) => onChange(e.target.checked)} /> Featured</div>
      ) : t === "image" ? (
        <ImageField value={value} onChange={onChange} />
      ) : (
        <input type={t === "number" ? "number" : "text"} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function EditForm({ schema, form, setForm, onSave, onCancel, title }) {
  return (
    <div className="tile" style={{ marginTop: 12 }}>
      <strong>{title}</strong>
      {schema.map((def) => (
        <Field key={def.k} def={def} value={form[def.k]} onChange={(v) => setForm({ ...form, [def.k]: v })} />
      ))}
      <div className="row" style={{ marginTop: 8 }}>
        <button className="primary" style={{ width: "auto" }} onClick={onSave}>Save</button>
        <button className="secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

function TableEditor({ name, onAuthFail }) {
  const schema = SCHEMAS[name];
  const [rows, setRows] = useState(null);
  const [editing, setEditing] = useState(null); // {id?, form}
  const [err, setErr] = useState("");

  function checkAuth(r) {
    if (r.status === 401) { onAuthFail(); return false; }
    return true;
  }

  async function load() {
    setErr("");
    const r = await fetch(`/api/admin/table?name=${name}`);
    if (!checkAuth(r)) return;
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
    if (!checkAuth(r)) return;
    const d = await r.json();
    if (!r.ok) { setErr(d.error || "Save failed"); return; }
    setEditing(null);
    load();
  }

  async function remove(id) {
    if (!confirm("Delete this entry?")) return;
    const r = await fetch(`/api/admin/table?name=${name}&id=${id}`, { method: "DELETE" });
    if (!checkAuth(r)) return;
    if (!r.ok) { const d = await r.json(); setErr(d.error || "Delete failed"); return; }
    load();
  }

  if (rows === null) return <p className="muted">Loading…</p>;

  return (
    <div>
      <button className="primary" style={{ width: "auto" }} onClick={() => setEditing({ id: null, form: toForm(schema, {}) })}>+ Add new</button>
      {err ? <p className="form-status error">{err}</p> : null}
      {rows.map((row) => (
        <div key={row.id}>
          <div className="tile" style={{ marginTop: 12, marginBottom: 0 }}>
            <strong>{row.title || row.role || row.category || row.slug || ("#" + row.id)}</strong>
            <div className="muted" style={{ fontSize: 13 }}>{row.org || row.event || row.period || ""}</div>
            <div className="row" style={{ marginTop: 8 }}>
              <button className="secondary" onClick={() => setEditing({ id: row.id, form: toForm(schema, row) })}>Edit</button>
              <button className="danger" onClick={() => remove(row.id)}>Delete</button>
            </div>
          </div>
          {editing?.id === row.id ? (
            <EditForm schema={schema} form={editing.form} setForm={(f) => setEditing({ ...editing, form: f })} onSave={save} onCancel={() => setEditing(null)} title="Edit entry" />
          ) : null}
        </div>
      ))}
      {editing && !editing.id ? (
        <EditForm schema={schema} form={editing.form} setForm={(f) => setEditing({ ...editing, form: f })} onSave={save} onCancel={() => setEditing(null)} title="New entry" />
      ) : null}
    </div>
  );
}

function MessagesInbox({ onAuthFail }) {
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState("");

  async function load() {
    const r = await fetch("/api/admin/messages");
    if (r.status === 401) { onAuthFail(); return; }
    const d = await r.json();
    if (!r.ok) setErr(d.error || "Failed");
    else setRows(d.rows);
  }
  useEffect(() => { load(); }, []);

  async function remove(id) {
    if (!confirm("Delete this message?")) return;
    const r = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
    if (r.status === 401) { onAuthFail(); return; }
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
      <div className="admin-bar">
        <span className="admin-badge"><span className="dot-live" /> Admin session</span>
        <button className="danger" onClick={logout}>Log out</button>
      </div>
      <div className="row tabs">
        {TABS.map((t) => (
          <button key={t} className={tab === t ? "primary" : "secondary"} style={{ width: "auto", textTransform: "capitalize" }} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <p className="muted" style={{ fontSize: 13 }}>Edits save straight to Supabase. Homepage and blog refresh within ~1 minute.</p>
      <div style={{ marginTop: 12 }}>
        {tab === "messages" ? <MessagesInbox onAuthFail={onLogout} /> : <TableEditor key={tab} name={tab} onAuthFail={onLogout} />}
      </div>
    </div>
  );
}
