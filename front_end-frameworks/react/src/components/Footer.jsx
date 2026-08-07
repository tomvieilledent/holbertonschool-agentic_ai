

const socialLinks = [
  { icon: Camera, label: "Instagram", href: "https://www.instagram.com" },
  { icon: Music2, label: "TikTok", href: "https://www.tiktok.com" },
  { icon: X, label: "X", href: "https://www.x.com" },
  { icon: Play, label: "YouTube", href: "https://www.youtube.com" },
];

const navLinks = [
  { label: "Home", href: "#hero-section" },
  { label: "About", href: "#about-section" },
  { label: "Features", href: "#features-section" },
  { label: "Insights", href: "#insights-section" },
  { label: "Contact", href: "#contact-section" },
];

const externalLinks = [
  { label: "About", href: "https://www.holbertonschool.fr/" },
  {
    label: "Methodology",
    href: "https://www.holbertonschool.fr/methodologie",
  },
  { label: "Story", href: "https://www.holbertonschool.fr/a-propos" },
  { label: "Agenda", href: "https://www.holbertonschool.fr/" },
];

const curriculumLinks = [
  {
    label: "Bachelor",
    href: "https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering",
  },
  {
    label: "Program",
    href: "https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering#programme",
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-black">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="#hero-section" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500 text-slate-50 shadow-lg shadow-violet-500/40">
                <BrainCircuit size={16} />
              </div>
              <span className="text-sm font-bold text-slate-50">Agentic AI</span>
            </a>

            <p className="max-w-xs text-sm text-slate-500">
              Explore the future of development with Agentic AI.
            </p>

            {/* Social links */}
            <ul className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-violet-500 hover:text-violet-300"
                  >
                    <Icon size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Internal navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-bold text-slate-50">Navigation</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="transition-colors hover:text-slate-50"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* External links */}
          <div>
            <h3 className="text-sm font-bold text-slate-50">Holberton School</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
              {externalLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-slate-50"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Curriculum links */}
          <div>
            <h3 className="text-sm font-bold text-slate-50">Curriculum</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
              {curriculumLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-slate-50"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-xs text-slate-600">
          © {currentYear} Agentic AI. Built for Holberton School.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
