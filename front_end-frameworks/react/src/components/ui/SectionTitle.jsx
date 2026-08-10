function SectionTitle({ top, bottom, as: Tag = "h2", className = "" }) {
  return (
    <Tag className={`font-black leading-none tracking-tight ${className}`}>
      <span className="block text-slate-50">{top}</span>
      <span className="block text-violet-300">{bottom}</span>
    </Tag>
  );
}

export default SectionTitle;
