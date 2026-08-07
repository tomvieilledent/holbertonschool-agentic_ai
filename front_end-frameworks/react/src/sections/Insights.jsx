import { useEffect, useState } from "react";
import InsightCard from "../components/InsightCard";
import { getInsights } from "../services/insightsService";

function Insights() {
  // State: the insights list and a possible error message.
  const [insights, setInsights] = useState([]);
  const [error, setError] = useState(null);

  // Load the insights once, when the component is first rendered.
  useEffect(() => {
    async function loadInsights() {
      try {
        const data = await getInsights();
        setInsights(data);
      } catch {
        setError("Unable to load insights. Please try again later.");
      }
    }

    loadInsights();
  }, []);

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

        {/* Error message area */}
        {error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : (
          /* Insights grid */
          <div className="mt-12 w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <InsightCard
                key={insight.title}
                index={index}
                image={insight.image}
                title={insight.title}
                description={insight.description}
                category={insight.category}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Insights;
