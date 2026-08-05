function Hero() {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-black pt-36 pb-24"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Radial violet glow */}
        <div className="absolute top-0 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
        {/* Radial blue glow */}
        <div className="absolute top-40 right-1/4 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-3xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
        {/* Depth vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center">
        {/* Badge */}
        <div className="flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
          <span>✦</span>
          <span>The future of coding</span>
          <span>✦</span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-5xl leading-none font-black tracking-tight md:text-7xl">
            <span className="block text-slate-50">Build smarter workflows</span>
            <span className="block text-violet-300">with Agentic AI</span>
          </h1>
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
          <a
            href="#contact-section"
            className="rounded-md bg-violet-500 px-4 py-2 text-sm font-semibold whitespace-nowrap text-slate-50 shadow-lg shadow-violet-500/40 transition-colors hover:bg-violet-600 md:text-base"
          >
            Start learning with Holberton School
          </a>

          <a
            href="#features-section"
            className="rounded-md border border-slate-800 bg-slate-950 px-4 py-2 text-sm font-semibold whitespace-nowrap text-slate-50 transition-colors hover:bg-slate-900 md:text-base"
          >
            Methodology
          </a>
        </div>

        {/* Stats */}
        <div className="mt-12 grid w-full grid-cols-2 gap-8 md:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/40">
            <p className="text-3xl leading-none font-black tracking-tight text-violet-300 md:text-4xl">
              10K+
            </p>
            <p className="mt-2 text-sm text-slate-300 md:text-base">
              Active agents
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/40">
            <p className="text-3xl leading-none font-black tracking-tight text-violet-300 md:text-4xl">
              99.9%
            </p>
            <p className="mt-2 text-sm text-slate-300 md:text-base">Uptime</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/40">
            <p className="text-3xl leading-none font-black tracking-tight text-violet-300 md:text-4xl">
              50M+
            </p>
            <p className="mt-2 text-sm text-slate-300 md:text-base">
              Tasks automated
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/40">
            <p className="text-3xl leading-none font-black tracking-tight text-violet-300 md:text-4xl">
              24/7
            </p>
            <p className="mt-2 text-sm text-slate-300 md:text-base">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
