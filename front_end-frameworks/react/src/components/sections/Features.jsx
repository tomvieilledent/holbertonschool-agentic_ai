import features from '../../data/features';
import FeatureCard from '../cards/FeatureCard';
import SectionBadge from '../ui/SectionBadge';
import SectionTitle from '../ui/SectionTitle';

function Features() {
  return (
    <section id="features-section" className="relative bg-black py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center">
        {/* Badge */}
        <SectionBadge className="text-xs">Features</SectionBadge>

        {/* Title */}
        <div>
          <SectionTitle
            className="text-4xl md:text-5xl"
            top="Everything you need to build"
            bottom="with powerful AI agents"
          />
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
