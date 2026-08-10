import SectionBadge from "../ui/SectionBadge";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import StatCard from "../cards/StatCard";

const stats = [
  { value: "10K+", label: "Active agents" },
  { value: "99.9%", label: "Uptime" },
  { value: "50M+", label: "Tasks automated" },
  { value: "24/7", label: "Support" },
];

function Hero() {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-black pt-36 pb-24"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Radial violet glow */}
        <div className="absolute top-0 left-1/2 h-160 w-160 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
        {/* Radial blue glow */}
        <div className="absolute top-40 right-1/4 h-120 w-120 rounded-full bg-blue-500/10 blur-3xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-size[72px_72px] opacity-30" />
        {/* Depth vignette */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-950" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center">
        {/* Badge */}
        <SectionBadge className="text-xs">The future of coding</SectionBadge>

        {/* Title */}
        <div>
          <SectionTitle
            as="h1"
            className="text-5xl md:text-7xl"
            top="Build smarter workflows"
            bottom="with Agentic AI"
          />
        </div>

        {/* Subtitle */}
        <div>
          <p className="max-w-2xl text-sm text-slate-300 md:text-base">
            Create autonomous AI agents that think, plan, and execute complex
            tasks. Transform your business with intelligent automation.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            href="#contact-section"
            className="text-sm whitespace-nowrap md:text-base"
          >
            Start learning with Holberton School
          </Button>

          <Button
            href="#features-section"
            variant="secondary"
            className="text-sm whitespace-nowrap md:text-base"
          >
            Methodology
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid w-full grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
