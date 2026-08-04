function Hero() {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-slate-950 pt-36 pb-24"
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

      <div className="relative w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-8 text-center">
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10">
          <span>✦</span>
          <span>The future of coding</span>
          <span>✦</span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
            <span className="block text-slate-50">Build smarter workflows</span>
            <span className="block text-violet-300">with Agentic AI</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div>
          <p className="max-w-2xl text-sm md:text-base text-slate-300">
            Create autonomous AI agents that think, plan, and execute complex
            tasks. Transform your business with intelligent automation.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#contact-section"
            className="px-4 py-2 text-sm md:text-base font-semibold whitespace-nowrap rounded-md bg-violet-500 text-slate-50 hover:bg-violet-600 shadow-lg shadow-violet-500/40 transition-colors"
          >
            Start learning with Holberton School
          </a>

          <a
            href="#features-section"
            className="px-4 py-2 text-sm md:text-base font-semibold whitespace-nowrap rounded-md border border-slate-800 bg-slate-950 text-slate-50 hover:bg-slate-900 transition-colors"
          >
            Methodology
          </a>
        </div>

        {/* Stats */}
        <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 text-center">
            <p className="text-3xl md:text-4xl font-black tracking-tight leading-none text-violet-300">
              10K+
            </p>
            <p className="mt-2 text-sm md:text-base text-slate-300">
              Active agents
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 text-center">
            <p className="text-3xl md:text-4xl font-black tracking-tight leading-none text-violet-300">
              99.9%
            </p>
            <p className="mt-2 text-sm md:text-base text-slate-300">Uptime</p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 text-center">
            <p className="text-3xl md:text-4xl font-black tracking-tight leading-none text-violet-300">
              50M+
            </p>
            <p className="mt-2 text-sm md:text-base text-slate-300">
              Tasks automated
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 text-center">
            <p className="text-3xl md:text-4xl font-black tracking-tight leading-none text-violet-300">
              24/7
            </p>
            <p className="mt-2 text-sm md:text-base text-slate-300">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
