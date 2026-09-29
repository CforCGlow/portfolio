import { profile, experiences, volunteering, achievements, skills, projects } from "@/lib/data";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div>
          <h1>{profile.name}</h1>
          <p><strong>{profile.title}</strong></p>
          <p>{profile.bio}</p>
          <p className="muted" style={{ color: "#dbeafe" }}>{profile.university} · {profile.degree} · CGPA {profile.cgpa}</p>
          <div className="cta">
            <a className="btn-gold" href="/resume.pdf">Download CV</a>
            <a className="btn-line" href="#contact">Contact Me</a>
            <a className="btn-line" href={profile.socials.linkedin} target="_blank">LinkedIn</a>
          </div>
          <div className="stats">
            <div className="stat"><strong>3.81</strong><br />CGPA</div>
            <div className="stat"><strong>500+</strong><br />Event participants</div>
            <div className="stat"><strong>5+</strong><br />Leadership roles</div>
            <div className="stat"><strong>ICPC 2024</strong><br />Preliminary</div>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <img src="/profile.jpg" alt="Kazim Akeeb Onik" className="profile-img" />
          <p style={{ color: "#dbeafe", fontSize: 13 }}>Put your formal photo as public/profile.jpg</p>
          <p style={{ fontSize: 13 }}>
            <a href={`mailto:${profile.email}`} style={{ color: "#fff" }}>{profile.email}</a><br />
            <span>{profile.phone} · {profile.location}</span>
          </p>
        </div>
      </section>

      <section id="experience" className="card">
        <h2 className="section-title">Leadership & Professional Experience</h2>
        <div className="timeline">
          {experiences.map((e, i) => (
            <div key={i} className="item">
              <strong>{e.role} @ {e.org}</strong>
              <div className="muted">{e.period}</div>
              <ul>{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section id="community" className="card">
        <h2 className="section-title">Community & Volunteering</h2>
        <div className="grid2">
          {volunteering.map((v, i) => (
            <div key={i} className="card" style={{ margin: 0 }}>
              <strong>{v.role} – {v.event}</strong>
              <div className="muted">{v.org} {v.impact ? `· ${v.impact}` : ""}</div>
              <ul>{v.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">Achievements</h2>
        <ul>
          {achievements.map((a, i) => (
            <li key={i}><strong>{a.title}</strong> ({a.org}) – {a.description}</li>
          ))}
        </ul>
      </section>

      <section id="skills" className="card">
        <h2 className="section-title">Technical & Professional Skills</h2>
        <div className="grid2">
          {skills.map((s, i) => (
            <div key={i}>
              <strong>{s.category}</strong>
              <div>{s.items.map((t, j) => <span key={j} className="badge">{t}</span>)}</div>
            </div>
          ))}
        </div>
        <p className="muted">Interests: AI, Competitive Programming, Research Writing, Community Building, Entrepreneurship. Sports: Football Club Manager (CSE Batch 65), Futsal Champ 2025 Match Official.</p>
      </section>

      <section id="projects" className="card">
        <h2 className="section-title">Projects</h2>
        <div className="grid2">
          {projects.map((p, i) => (
            <div key={i} className="card" style={{ margin: 0 }}>
              <strong>{p.title}</strong>
              <p className="muted">{p.description}</p>
              <div>{p.tech.map((t, j) => <span key={j} className="badge">{t}</span>)}</div>
              <p>{p.github_url ? <a href={p.github_url} target="_blank">GitHub → </a> : null}{p.live_url ? <a href={p.live_url} target="_blank">Live →</a> : null}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="card">
        <h2 className="section-title">Contact</h2>
        <p>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a> · Phone: {profile.phone}</p>
        <p>
          <a href={profile.socials.linkedin} target="_blank">LinkedIn</a> ·{" "}
          <a href={profile.socials.facebook} target="_blank">Facebook</a>
        </p>
        <ContactForm />
      </section>
    </main>
  );
}
