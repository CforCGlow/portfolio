import { getSiteContent } from "@/lib/content";
import ContactForm from "@/components/ContactForm";
import TypingRoles from "@/components/TypingRoles";

export const revalidate = 60;

export default async function Home() {
  const { profile, experiences, volunteering, skills, projects } = await getSiteContent();
  return (
    <main>
      <section className="hero">
        <div>
          <span className="eyebrow"><span className="dot" /> Open to internships · Dhaka, Bangladesh</span>
          <h1>Kazim Akeeb <span className="grad">Onik</span></h1>
          <p className="role-lines">
            <strong style={{ color: "#fff" }}>CSE Undergraduate · Vice Chairperson @ IEEE CS SEU SBC</strong>
            <strong style={{ color: "#fff" }}>Managing Director & Co-Founder @ One Percent</strong>
          </p>
          <p className="lead">{profile.bio}</p>
          <p className="lead typing-line"><span style={{ color: "#fff" }}>▸ Exploring:</span> <TypingRoles /></p>
          <p className="lead" style={{ fontSize: 14 }}>{profile.university} · {profile.degree}</p>
          <div className="cta">
            <a className="btn-primary" href="/resume.pdf">Download CV ↓</a>
            <a className="btn-ghost" href="#contact">Contact Me</a>
            <a className="btn-ghost" href={profile.socials.linkedin} target="_blank">LinkedIn ↗</a>
            <a className="btn-ghost" href="https://www.facebook.com/cglow17" target="_blank">Facebook ↗</a>
          </div>
        </div>
        <div className="hero-photo">
          <div className="photo-wrap">
            <img src="/profile.jpg" alt="Kazim Akeeb Onik" className="profile-img" />
          </div>
          <p className="hero-contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a><br />{profile.phone}
          </p>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="sec-head">
          <div className="sec-eyebrow">Career</div>
          <h2>Leadership & Experience</h2>
          <p>Founder and community organizer first — engineering depth second. That combination is the pitch.</p>
        </div>
        <div className="timeline">
          {experiences.map((e, i) => (
            <div key={i} className="item">
              <div className="period">{e.period}</div>
              <strong>{e.role} · {e.org}</strong>
              <ul className="clean">{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section id="community" className="section">
        <div className="sec-head">
          <div className="sec-eyebrow">Impact</div>
          <h2>Community & Volunteering</h2>
          <p>500+ participant events, national olympiads, IEEE programs — the strongest part of this profile.</p>
        </div>
        <div className="grid2">
          {volunteering.map((v, i) => (
            <div key={i} className="tile">
              <h3>{v.role} · {v.event}</h3>
              <div className="muted" style={{ fontSize: 13 }}>{v.org} {v.impact ? `— ${v.impact}` : ""}</div>
              <ul className="clean">{v.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="section">
        <div className="sec-head">
          <div className="sec-eyebrow">Stack</div>
          <h2>Skills</h2>
        </div>
        <div className="grid2">
          {skills.map((s, i) => (
            <div key={i} className="tile">
              <h3>{s.category}</h3>
              <div>{s.items.map((t, j) => <span key={j} className="badge">{t}</span>)}</div>
            </div>
          ))}
        </div>
        <p className="muted">Interests: AI · Competitive Programming · Research Writing · Community Building · Entrepreneurship. Sports: Football Club Manager (CSE Batch 65), Futsal Champ 2025 Match Official.</p>
      </section>

      <section id="projects" className="section">
        <div className="sec-head">
          <div className="sec-eyebrow">Work</div>
          <h2>Projects</h2>
          <p>Selected builds — full-stack, team, and client work.</p>
        </div>
        <div className="grid2">
          {projects.map((p, i) => (
            <div key={i} className="tile">
              <h3>{p.title}</h3>
              <p className="muted" style={{ fontSize: 14 }}>{p.description}</p>
              <div>{p.tech.map((t, j) => <span key={j} className="badge">{t}</span>)}</div>
              <p style={{ fontWeight: 700 }}>{p.github_url ? <a href={p.github_url} target="_blank">GitHub → </a> : null}{p.live_url ? <a href={p.live_url} target="_blank">Live →</a> : null}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section">
        <div className="card" style={{ margin: 0 }}>
          <div className="sec-head">
            <div className="sec-eyebrow">Contact</div>
            <h2>Let&apos;s talk</h2>
            <p>Internships, research, community collabs — inbox is open.</p>
          </div>
          <p>Email: <a href={`mailto:${profile.email}`}><strong>{profile.email}</strong></a> · {profile.phone}</p>
          <div className="social-row">
            <a href={profile.socials.linkedin} target="_blank">LinkedIn ↗</a>
            <a href={profile.socials.facebook} target="_blank">Facebook ↗</a>
          </div>
          <div style={{ marginTop: 14 }}><ContactForm /></div>
        </div>
      </section>
    </main>
  );
}
