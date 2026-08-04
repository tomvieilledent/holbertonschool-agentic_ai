function Hero() {
  return (
    <section id="hero-section" className="relative bg-slate-950 pt-24 pb-12">
      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-8 text-center">
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10">
          <span>✦</span>
          <span>The future of coding</span>
          <span>✦</span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none">
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
        <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <div className="p-4 sm:p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 text-center">
            <p className="text-3xl md:text-4xl font-black tracking-tight leading-none text-violet-300">
              10K+
            </p>
            <p className="mt-2 text-sm md:text-base text-slate-300">
              Active agents
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 text-center">
            <p className="text-3xl md:text-4xl font-black tracking-tight leading-none text-violet-300">
              99.9%
            </p>
            <p className="mt-2 text-sm md:text-base text-slate-300">Uptime</p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 text-center">
            <p className="text-3xl md:text-4xl font-black tracking-tight leading-none text-violet-300">
              50M+
            </p>
            <p className="mt-2 text-sm md:text-base text-slate-300">
              Tasks automated
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 text-center">
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
