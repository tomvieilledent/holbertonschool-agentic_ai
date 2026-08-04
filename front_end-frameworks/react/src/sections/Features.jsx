import { features } from '../data/features';

function Features() {
  return (
    <section id="features-section" className="relative bg-slate-950 py-24">
      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-8 text-center">
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10">
          <span>✧</span>
          <span>Features</span>
          <span>✧</span>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
            <span className="block text-slate-50">
              Everithing You Need to Build
            </span>
            <span className="block text-violet-300">
              With powerful AI agents
            </span>
          </h2>
        </div>

        {/* Features*/}
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3  gap-8 text-left mt-18">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex flex-col gap-4 p-8 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40"
              >
                <Icon
                  size={40}
                  className="text-slate-50 bg-violet-500 rounded-xl p-2 shadow-lg shadow-violet-500/40"
                />

                <h3 className="font-semibold text-slate-50">{feature.title}</h3>

                <p className="text-sm md:text-base text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
