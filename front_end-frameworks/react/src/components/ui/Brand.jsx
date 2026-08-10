import { BrainCircuit } from 'lucide-react';

function Brand() {
  return (
    <a href="#hero-section" className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500 text-slate-50 shadow-lg shadow-violet-500/40">
        <BrainCircuit size={16} />
      </div>
      <span className="text-sm font-bold text-slate-50">Agentic AI</span>
    </a>
  );
}

export default Brand;
