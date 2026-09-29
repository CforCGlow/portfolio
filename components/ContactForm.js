"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });

  async function submit(e) {
    e.preventDefault();
    setStatus({ type: "", text: "Sending..." });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus({ type: "success", text: "Message sent successfully. Thank you for reaching out — I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", text: "Something went wrong: " + err.message + ". Please try again or email me directly." });
    }
  }

  return (
    <form onSubmit={submit}>
      <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input placeholder="Your email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <textarea placeholder="Message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
      <button className="primary" type="submit">Send Message</button>
      {status.text ? <p className={`form-status ${status.type}`}>{status.text}</p> : null}
    </form>
  );
}
