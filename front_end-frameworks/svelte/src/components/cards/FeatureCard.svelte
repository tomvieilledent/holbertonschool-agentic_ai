<script>
  let { icon: Icon, title, description } = $props()
</script>

<article
  class="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40"
>
  <div
    class="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500 text-slate-50 shadow-lg shadow-violet-500/40"
  >
    <Icon size={24} />
  </div>
  <h3 class="text-lg font-bold text-slate-50">{title}</h3>
  <p class="text-sm text-slate-400 md:text-base">{description}</p>
</article>
