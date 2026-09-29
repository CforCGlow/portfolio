-- Seed portfolio content from CV (run after schema.sql)
-- Supabase SQL Editor

insert into profile (name, title, bio, email, phone, location, photo_url, resume_url, socials) values (
  'Kazim Akeeb Onik',
  'CSE Undergraduate | AI & Competitive Programming | Co-Founder @ One Percent',
  'Motivated CSE undergraduate at Southeast University (CGPA 3.81/4.00) with leadership, entrepreneurial experience, and active IEEE involvement. Interests: AI, competitive programming, research.',
  'kazimakeebonik@gmail.com',
  '+8801774445379',
  'Dhaka, Bangladesh',
  '/profile.jpg',
  '/resume.pdf',
  '{"linkedin": "https://linkedin.com/in/kazim-akeeb-onik", "facebook": "https://www.facebook.com/cglow17"}'::jsonb
);

insert into experiences (role, org, period, bullets, sort_order) values
  ('Vice Chairperson', 'IEEE Computer Society SEU Student Branch Chapter', '2026 – Present', array['Lead chapter strategy, programs, and student engagement', 'Coordinate with IEEE CS Bangladesh Chapter initiatives'], 0),
  ('Graphic Designer', 'IEEE CS BDC Team Spark', '2026 – Present', array['Design branding and promotional visuals for national IEEE CS programs'], 0),
  ('Managing Director & Co-Founder', 'One Percent', '2025 – Present', array['Founded creative agency for branding, design, digital solutions', 'Lead creative + technical teams, client relations, operations', 'Drive marketing strategy and business growth'], 1),
  ('Executive Member', 'Southeast Computer Club (SEUCC)', 'Jan 2025 – Jun 2025', array['Planned and executed academic and technical events'], 2),
  ('Sub-Executive Member', 'IEEE Computer Society SEU Student Branch Chapter', '2025', array['Organized workshops, seminars, professional programs', 'Promoted IEEE initiatives at SEU'], 3),
  ('Assistant Head of Public Relations', 'SEUCC', '2024', array['Led promotional campaigns, managed public communication'], 4),
  ('Founder & Team Manager', 'Football Club of Southeast University (CSE 65)', '2023 – Present', array['Founded and manage the CSE Batch 65 football team', 'Handle squad, fixtures, and match-day operations'], 2),
  ('Child Researcher', 'National Children''s Task Force (NCTF), Manikganj', '2017', array['Child-centered research, data collection and reporting'], 5);

insert into volunteering (role, event, org, impact, bullets) values
  ('Organizer', 'AI CodeLab 2026', 'IEEE CS SEU SBC', '500+ participants', array['Coordinated speakers, logistics, on-site operations']),
  ('Organizer', 'Battle of Bytes', 'SEUCC', 'Tournament', array['Planning, scheduling, fair competition']),
  ('Volunteer', 'Regional Math Olympiad 2026', 'Bangladesh Mathematical Olympiad', '', array['Coordination and exam management']),
  ('Campus Ambassador', 'Bangladesh ICT Olympiad', '', '', array['Promoted ICT programs, campus registrations']),
  ('Volunteer', 'Advanced Study & Research Opportunities in Canada Seminar', '', '', array['Registration, logistics']);

insert into achievements (title, org, year, description) values
  ('Best Volunteer Award 2024', 'SEUCC', '2024', 'Outstanding dedication, leadership in technical and community events.'),
  ('Creative Talent Hunt – 3rd (District)', 'Mathematics & Computer Segment', '2015', 'Excellence in mathematical reasoning and computer problem-solving.'),
  ('ICPC Asia Dhaka Regional – Preliminary', 'ICPC', '2024', 'Participant'),
  ('LaTeX Unlocked: Research Writing Workshop', 'IEEE CS SEU SB', '', 'Participant');

insert into skills (category, items) values
  ('Programming', array['C', 'C++', 'Java', 'Python', 'HTML', 'CSS', 'JavaScript', 'PHP']),
  ('Research', array['LaTeX']),
  ('Design', array['Illustrator', 'Photoshop', 'Canva']),
  ('Professional', array['Entrepreneurship', 'Event Management', 'Public Relations', 'Team Leadership', 'Communication']),
  ('Productivity', array['MS Office', 'Google Workspace', 'Google Colab']);

insert into projects (title, description, tech, github_url, live_url, featured) values
  ('SEU LigaPro – Football Management System', 'Next.js + Supabase league portal for fixtures, standings, clubs. Full-stack build. Live deployment.', array['Next.js', 'Supabase', 'PostgreSQL'], 'https://github.com/CforCGlow/weblabproject', 'https://seuligapro.vercel.app/', true),
  ('RexmoBD – Clothing E-commerce Prototype (Team)', 'Team-built clothing store prototype with shop, orders, admin panel and PHP auth. Deployed on Vercel.', array['HTML', 'CSS', 'JavaScript', 'PHP'], 'https://github.com/abidofficial1/RexmoBD/tree/main', 'https://rexmo-bd.vercel.app', true),
  ('One Percent – Creative Agency', 'Branding, design and digital solutions. Co-founded and lead delivery.', array['Branding', 'Leadership'], '', '', true),
  ('CP Tracker (TODO)', 'Pull Codeforces/VJudge stats. Good weekend build.', array['Next.js', 'API'], '', '', false);

insert into posts (slug, title, body) values
  ('hello-world', 'Hello world', 'Replace with your first AI/CP note.');
