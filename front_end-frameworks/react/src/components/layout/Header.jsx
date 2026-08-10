import Brand from '../ui/Brand';
import Button from '../ui/Button';

const navLinks = [
  { label: 'About', href: '#about-section' },
  { label: 'Features', href: '#features-section' },
  { label: 'Insights', href: '#insights-section' },
  { label: 'Contact', href: '#contact-section' },
];

function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Brand />

        {/* Navigation + CTA */}
        <div className="flex items-center gap-8">
          <nav className="hidden text-xs text-slate-500 md:flex">
            <ul className="flex gap-8">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    className="transition-colors hover:text-slate-50"
                    href={href}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Button
            href="https://www.holbertonschool.fr/rejoindre-lhippocamp"
            className="text-xs"
          >
            Enroll now
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
