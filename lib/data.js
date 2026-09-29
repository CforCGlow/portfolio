// Fallback static content from CV. When Supabase is configured,
// API routes override this. Edit here for quick updates without DB.
export const profile = {
  name: "Kazim Akeeb Onik",
  title: "CSE Undergraduate · Vice Chair, IEEE CS SEU SBC · Co-Founder @ One Percent",
  bio: "Motivated Computer Science & Engineering undergraduate at Southeast University with strong leadership, entrepreneurial experience, and active involvement in IEEE and technical communities. Passionate about artificial intelligence, competitive programming, and academic research.",
  email: "kazimakeebonik@gmail.com",
  phone: "+8801774445379",
  location: "Dhaka, Bangladesh",
  university: "Southeast University",
  degree: "BSc in Computer Science & Engineering",
  period: "Nov 2023 – Present",
  cgpa: "3.81/4.00",
  socials: {
    linkedin: "https://linkedin.com/in/kazim-akeeb-onik",
    facebook: "https://www.facebook.com/cglow17",
    github: "", // TODO: add your GitHub
    codeforces: "" // TODO: add your Codeforces/VJudge
  }
};

export const experiences = [
  { role: "Vice Chairperson", org: "IEEE Computer Society SEU Student Branch Chapter", period: "2026 – Present", bullets: ["Lead chapter strategy, programs, and student engagement", "Coordinate with IEEE CS Bangladesh Chapter initiatives"] },
  { role: "Graphic Designer", org: "IEEE CS BDC Team Spark", period: "2026 – Present", bullets: ["Design branding and promotional visuals for national IEEE CS programs"] },
  { role: "Managing Director & Co-Founder", org: "One Percent", period: "2025 – Present", bullets: ["Founded creative agency for branding, design, digital solutions", "Lead creative + technical teams, client relations, operations", "Drive marketing strategy and business growth"] },
  { role: "Executive Member", org: "Southeast Computer Club (SEUCC)", period: "Jan 2025 – Jun 2025", bullets: ["Planned and executed academic and technical events"] },
  { role: "Sub-Executive Member", org: "IEEE Computer Society SEU Student Branch Chapter", period: "2025", bullets: ["Organized workshops, seminars, professional programs", "Promoted IEEE initiatives at SEU"] },
  { role: "Assistant Head of Public Relations", org: "SEUCC", period: "2024", bullets: ["Led promotional campaigns, managed public communication"] },
  { role: "Child Researcher", org: "National Children's Task Force (NCTF), Manikganj", period: "2017", bullets: ["Child-centered research, data collection and reporting"] }
];

export const volunteering = [
  { role: "Organizer", event: "AI CodeLab 2026", org: "IEEE CS SEU SBC", impact: "500+ participants", bullets: ["Coordinated speakers, logistics, on-site operations"] },
  { role: "Organizer", event: "Battle of Bytes", org: "SEUCC", impact: "Tournament", bullets: ["Planning, scheduling, fair competition"] },
  { role: "Volunteer", event: "Regional Math Olympiad 2026", org: "Bangladesh Mathematical Olympiad", impact: "", bullets: ["Coordination and exam management"] },
  { role: "Campus Ambassador", event: "Bangladesh ICT Olympiad", org: "", impact: "", bullets: ["Promoted ICT programs, campus registrations"] },
  { role: "Volunteer", event: "Advanced Study & Research Opportunities in Canada Seminar", org: "", impact: "", bullets: ["Registration, logistics"] }
];

export const achievements = [
  { title: "Best Volunteer Award 2024", org: "SEUCC", description: "Outstanding dedication, leadership in technical and community events." },
  { title: "Creative Talent Hunt 2015 – 3rd (District)", org: "Mathematics & Computer Segment", description: "Excellence in mathematical reasoning and computer problem-solving." },
  { title: "ICPC Asia Dhaka Regional – Preliminary 2024", org: "ICPC", description: "Participant" },
  { title: "LaTeX Unlocked: Research Writing Workshop", org: "IEEE CS SEU SB", description: "Participant" }
];

export const skills = [
  { category: "Programming", items: ["C", "C++", "Java", "Python"] },
  { category: "Research", items: ["LaTeX"] },
  { category: "Design", items: ["Illustrator", "Photoshop", "Canva"] },
  { category: "Professional", items: ["Entrepreneurship", "Event Management", "Public Relations", "Team Leadership", "Communication"] },
  { category: "Productivity", items: ["MS Office", "Google Workspace", "Google Colab"] }
];

export const projects = [
  { title: "SEU LigaPro – Football Management System", description: "Next.js + Supabase league portal for fixtures, standings, clubs. Your existing full-stack project – link it here.", tech: ["Next.js", "Supabase", "PostgreSQL"], github_url: "https://github.com/CforCGlow/weblabproject", live_url: "", featured: true },
  { title: "One Percent – Creative Agency", description: "Branding, design and digital solutions. Co-founded and lead team delivery.", tech: ["Branding", "Leadership"], github_url: "", live_url: "", featured: true },
  { title: "CP Tracker (TODO)", description: "Add a small tracker that pulls Codeforces/VJudge stats. Good 1-weekend build to fill projects gap.", tech: ["Next.js", "API"], github_url: "", live_url: "", featured: false }
];
