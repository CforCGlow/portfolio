import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Kazim Akeeb Onik | CSE Portfolio",
  description: "CSE undergraduate, Vice Chair IEEE CS SEU SBC, Graphic Designer IEEE CS BDC, Co-Founder @ One Percent."
};

const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <nav className="nav">
          <a className="logo" href="/">Kazim Akeeb Onik</a>
          <div className="links">
            <a className="link" href="/#experience">Experience</a>
            <a className="link" href="/#community">Community</a>
            <a className="link" href="/#skills">Skills</a>
            <a className="link" href="/#projects">Projects</a>
            <a className="link" href="/blog">Blog</a>
            <ThemeToggle />
            <a className="cta" href="/#contact">Hire Me</a>
          </div>
        </nav>
        <div className="container">{children}</div>
        <footer className="footer"><strong>Kazim Akeeb Onik</strong> · Southeast University CSE<br />kazimakeebonik@gmail.com · +8801774445379 · linkedin.com/in/kazim-akeeb-onik</footer>
      </body>
    </html>
  );
}
