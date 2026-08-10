function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500 text-slate-50 shadow-lg shadow-violet-500/40">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-slate-50">{title}</h3>
      <p className="text-sm text-slate-500 md:text-base">{description}</p>
    </article>
  );
}

export default FeatureCard;
