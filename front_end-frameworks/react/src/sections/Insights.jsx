function Insights() {
  return (
    <section id="insights-section" className="relative bg-black py-24">
      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-8 text-center">
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10">
          <span>✧</span>
          <span>Insights</span>
          <span>✧</span>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
            <span className="block text-slate-50">
              Explore Agentic AI
            </span>
            <span className="block text-violet-300">
              Through real-world scenes
            </span>
          </h2>
        </div>



      </div>
    </section>
  );
}

export default Insights;
