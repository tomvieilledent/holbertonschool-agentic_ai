function StatCard({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/40">
      <p className="text-3xl leading-none font-black tracking-tight text-violet-300 md:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-300 md:text-base">{label}</p>
    </div>
  );
}

export default StatCard;
