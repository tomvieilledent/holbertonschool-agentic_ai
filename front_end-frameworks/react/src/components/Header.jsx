import { BrainCircuit } from 'lucide-react';

function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#hero-section">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500 text-slate-50 shadow-lg shadow-violet-500/40">
              <BrainCircuit size={16} />
            </div>

            <span className="text-sm font-bold text-slate-50">Agentic AI</span>
          </div>
        </a>

        {/* Navigation + CTA */}
        <div className="flex items-center gap-8">
          <nav className="hidden text-xs text-slate-500 md:flex">
            <ul className="flex gap-8">
              <li>
                <a
                  className="transition-colors hover:text-slate-50"
                  href="#about-section"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  className="transition-colors hover:text-slate-50"
                  href="#features-section"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  className="transition-colors hover:text-slate-50"
                  href="#insights-section"
                >
                  Insights
                </a>
              </li>

              <li>
                <a
                  className="transition-colors hover:text-slate-50"
                  href="#contact-section"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <a
            href="https://www.holbertonschool.fr/rejoindre-lhippocamp"
            className="rounded-md bg-violet-500 px-4 py-2 text-xs font-semibold text-violet-50 shadow-lg shadow-violet-500/40 transition-colors hover:bg-violet-600"
          >
            Enroll now
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
