import { steps } from '../../data/steps';
import SectionBadge from '../ui/SectionBadge';
import SectionTitle from '../ui/SectionTitle';

function About() {
  return (
    <section id="about-section" className="relative bg-black py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center">
        {/* Badge */}
        <SectionBadge symbol="✧" className="text-xs">
          What is agentic AI ?
        </SectionBadge>

        {/* Title */}
        <div>
          <SectionTitle
            className="text-4xl md:text-5xl"
            top="AI that does more than answer"
            bottom="It acts with purpose"
          />
        </div>

        {/* Subtitle */}
        <div>
          <p className="max-w-2xl text-left text-sm text-slate-300 md:text-base">
            Agentic AI refers to artificial intelligence systems designed to
            purpose goals, makes decisions, use tools, and adapt their actions
            across multiple steps. Instead of only responding to a single promp,
            an AI agent can break down a task, plan a strategy, execute actions,
            evaluate results and continue until the objective is reached.
          </p>
        </div>

        <div className="mt-18 grid w-full gap-8 md:grid-cols-2">
          {/* Traditional/Agentic */}
          <div className="flex flex-col gap-4 self-center rounded-3xl border border-slate-800 bg-slate-950 p-8 text-left shadow-xl shadow-slate-950/40">
            <div className="font-bold text-slate-50">Traditional AI</div>
            <div className="text-sm text-slate-500 md:text-base">
              Respond to direct instructions, generates content, answers
              questions, or analyzes information within a limited interaction.
            </div>
            <hr className="border-slate-800" />
            <div className="font-bold text-violet-300">Agentic AI</div>
            <div className="text-sm text-slate-500 md:text-base">
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500 font-bold text-slate-50 shadow-lg shadow-violet-500/40">
                    {step.id}
                  </div>

                  {/* Vertical*/}
                  {step.id !== steps.length && (
                    <div className="w-px flex-1 bg-violet-500"></div>
                  )}
                </div>

                {/* Text */}
                <div className={step.id !== steps.length ? 'pb-8' : ''}>
                  <h3 className="text-xl font-bold text-slate-50">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-300 md:text-sm">
                    {step.description}
                  </p>
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
