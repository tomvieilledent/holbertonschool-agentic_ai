function About() {
  const steps = [
    {
      id: 1,
      title: 'Understand the goal',
      description:
        "The agent interprets the user's objective and identifies what needs to be achieved.",
    },
    {
      id: 2,
      title: 'Plan the steps',
      description:
        'It breaks the objective into smaller actions and selects the most relevant path.',
    },
    {
      id: 3,
      title: 'Use tools and data',
      description:
        'It can interact with APIs, databases, files, interfaces, or other services to complete tasks.',
    },
    {
      id: 4,
      title: 'Evaluate and adapt',
      description:
        'It checks results, corrects mistakes, and adjusts the next action when needed.',
    },
  ];

  return (
    <section id="about-section" className="relative bg-slate-950 pt-12 pb-24">
      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-8 text-center">
        {/* Badge */}
        <div className="px-3 flex items-center gap-2 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10">
          <span>✧</span>
          <span>What is agentic AI ?</span>
          <span>✧</span>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-x2l sm:text-3xl md:text-5xl font-black tracking-tight leading-none">
            <span className="block text-slate-50">
              AI that does more than answer
            </span>
            <span className="block text-violet-300">It acts with purpose</span>
          </h2>
        </div>

        {/* Subtitle */}
        <div>
          <p className="text-xs md:text-sm  text-left max-w-2xl text-slate-300">
            Agentic AI refers to artificial intelligence systems designed to
            purpose goals, makes decisions, use tools, and adapt their actions
            across multiple steps. Instead of only responding to a single promp,
            an AI agent can break down a task, plan a strategy, execute actions,
            evaluate results and continue until the objective is reached.
          </p>
        </div>

        <div className="flex gap-6">
          {/* Traditional/Agentic */}
          <div className="max-h-lg flex flex-col rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 max-w-lg p-6 gap-4 text-left">
            <div className="text-slate-50 font-bold">Traditional AI</div>
            <div className="text-slate-600">
              Respond to direct instructions, generates content, answers
              questions, or analyzes information within a limited interaction.
            </div>
            <hr className="border-slate-600" />
            <div className="text-violet-300 font-bold">Agentic AI</div>
            <div className="text-slate-600">
              Understands a goal, chooses actions, uses external tools, followq
              a plan and adjusts its bihavior based on feedback
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col  text-left">
            {steps.map((step) => (
              <div key={step.id} className="flex gap-6">
                {/* Round */}
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white font-bold">
                    {step.id}
                  </div>

                  {step.id !== steps.length && (
                    <div className="w-px flex-1 bg-violet-500"></div>
                  )}
                </div>

                {/* Text */}
                <div className="pb-8">
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>

                  <p className="mt-2 text-slate-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
