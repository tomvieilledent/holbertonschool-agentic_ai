import { steps } from '../data/steps';

function About() {
  return (
    <section id="about-section" className="relative bg-slate-950 py-24">
      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-8 text-center">
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10">
          <span>✧</span>
          <span>What is agentic AI ?</span>
          <span>✧</span>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
            <span className="block text-slate-50">
              AI that does more than answer
            </span>
            <span className="block text-violet-300">It acts with purpose</span>
          </h2>
        </div>

        {/* Subtitle */}
        <div>
          <p className="text-sm md:text-base text-left max-w-2xl text-slate-300">
            Agentic AI refers to artificial intelligence systems designed to
            purpose goals, makes decisions, use tools, and adapt their actions
            across multiple steps. Instead of only responding to a single promp,
            an AI agent can break down a task, plan a strategy, execute actions,
            evaluate results and continue until the objective is reached.
          </p>
        </div>

        <div className="mt-18 w-full grid md:grid-cols-2 gap-8">
          {/* Traditional/Agentic */}
          <div className="self-center flex flex-col rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 p-8 gap-4 text-left">
            <div className="text-slate-50 font-bold">Traditional AI</div>
            <div className="text-sm md:text-base text-slate-300">
              Respond to direct instructions, generates content, answers
              questions, or analyzes information within a limited interaction.
            </div>
            <hr className="border-slate-800" />
            <div className="text-violet-300 font-bold">Agentic AI</div>
            <div className="text-sm md:text-base text-slate-300">
              Understands a goal, chooses actions, uses external tools, followq
              a plan and adjusts its bihavior based on feedback
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col text-left">
            {steps.map((step) => (
              <div key={step.id} className="flex gap-6">
                <div className="flex flex-col items-center">   
                  {/* Round */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500 text-slate-50 font-bold shadow-lg shadow-violet-500/40">
                    {step.id}
                  </div>

                  {/* Vertical*/}
                  {step.id !== steps.length && (
                    <div className="w-px flex-1 bg-violet-500"></div>
                  )}
                </div>

                {/* Text */}
                <div className={step.id !== steps.length ? 'pb-8' : ''}>
                  <h3 className="text-xl font-bold text-slate-50">{step.title}</h3>

                  <p className="mt-2 text-xs md:text-sm text-slate-300">{step.description}</p>
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
