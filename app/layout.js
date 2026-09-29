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
          <a className="logo" href="/">Kazim Akeeb Onik</a>
          <div className="links">
            <a className="link" href="/#experience">Experience</a>
            <a className="link" href="/#community">Community</a>
            <a className="link" href="/#skills">Skills</a>
            <a className="link" href="/#projects">Projects</a>
            <a className="link" href="/blog">Blog</a>
            <a className="link" href="/admin">Admin</a>
            <a className="link" href="/#contact">Contact</a>
          </div>
        </nav>
        <div className="container">{children}</div>
        <footer className="footer">© {new Date().getFullYear()} Kazim Akeeb Onik · Southeast University CSE · kazimakeebonik@gmail.com</footer>
      </body>
    </html>
  );
}
