<script>
  let { top, bottom, as: Tag = 'h2', class: className = '' } = $props()
</script>

<svelte:element this={Tag} class="leading-none font-black tracking-tight {className}">
  <span class="block text-slate-50">{top}</span>
  <span class="block text-violet-300">{bottom}</span>
</svelte:element>
