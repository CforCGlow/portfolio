import "./globals.css";

export const metadata = {
  title: "Kazim Akeeb Onik | CSE Portfolio",
  description: "CSE undergraduate, AI & CP enthusiast, Co-Founder @ One Percent, IEEE & SEUCC organizer."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <a className="logo" href="/"><span className="mark">KO</span> Kazim Akeeb Onik</a>
          <div className="links">
            <a className="link" href="/#experience">Experience</a>
            <a className="link" href="/#community">Community</a>
            <a className="link" href="/#skills">Skills</a>
            <a className="link" href="/#projects">Projects</a>
            <a className="link" href="/blog">Blog</a>
            <a className="cta" href="/#contact">Hire Me</a>
          </div>
        </nav>
        <div className="container">{children}</div>
        <footer className="footer"><strong>Kazim Akeeb Onik</strong> · Southeast University CSE · CGPA 3.81<br />kazimakeebonik@gmail.com · +8801774445379 · linkedin.com/in/kazim-akeeb-onik</footer>
      </body>
    </html>
  );
}
