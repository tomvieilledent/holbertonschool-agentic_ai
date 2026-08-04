import { BrainCircuit } from 'lucide-react';

function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur z-50">
      <div className="max-w-6xl mx-auto flex h-14 px-6 items-center justify-between px-6">
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
          <nav className="hidden md:flex text-xs text-slate-500">
            <ul className="flex gap-8">
              <li>
                <a className="hover:text-slate-50" href="#about-section">
                  About
                </a>
              </li>

              <li>
                <a className="hover:text-slate-50" href="#features-section">
                  Features
                </a>
              </li>

              <li>
                <a className="hover:text-slate-50" href="#insights-section">
                  Insights
                </a>
              </li>

              <li>
                <a className="hover:text-slate-50" href="#contact-section">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <a
            href="https://www.holbertonschool.fr/rejoindre-lhippocamp"
            className="px-4 py-2  text-violet-50 font-semibold bg-violet-500 hover:bg-violet-600 transition-color shadow-lg shadow-violet-500/30 rounded-md text-xs"
          >
            Enroll now
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
