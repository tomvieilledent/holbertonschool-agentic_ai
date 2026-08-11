<script>
  let { category, title, description, image, index } = $props()
</script>

<!-- The first card spans two columns to stand out from the others. -->
<article
  class="relative flex min-h-80 flex-col justify-end overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 {index ===
  0
    ? 'md:col-span-2'
    : ''}"
>
  <img src={image} alt={title} class="absolute inset-0 h-full w-full object-cover" />

  <!-- Overlay for readable contrast -->
  <div class="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

  <div class="relative flex flex-col gap-2 p-8 text-left">
    <!-- Category badge -->
    <div
      class="flex w-fit items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300"
    >
      <span>{category}</span>
    </div>

    <!-- Title -->
    <h3 class="text-lg font-bold text-slate-50">{title}</h3>

    <!-- Description -->
    <p class="max-w-xs text-sm text-slate-400 md:text-base">{description}</p>
  </div>
</article>
