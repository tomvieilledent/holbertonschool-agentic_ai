import features from '../data/features';
import FeatureCard from '../components/FeatureCard';

function Features() {
  return (
    <section id="features-section" className="relative bg-black py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center">
        {/* Badge */}
        <div className="flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
          <span>✦</span>
          <span>Features</span>
          <span>✦</span>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-4xl leading-none font-black tracking-tight md:text-5xl">
            <span className="block text-slate-50">
              Everything you need to build
            </span>
            <span className="block text-violet-300">
              with powerful AI agents
            </span>
          </h2>
        </div>

        {/* Features */}
        <div className="mt-12 grid w-full gap-8 text-left md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
