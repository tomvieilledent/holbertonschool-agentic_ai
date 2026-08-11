<script>
  let {
    href,
    variant = 'primary',
    external = false,
    class: className = '',
    children,
  } = $props()

  const variants = {
    primary: 'bg-violet-500 text-slate-50 shadow-lg shadow-violet-500/40 hover:bg-violet-600',
    secondary: 'border border-slate-800 bg-slate-950 text-slate-50 hover:bg-slate-900',
  }
</script>

<a
  {href}
  target={external ? '_blank' : undefined}
  rel={external ? 'noopener noreferrer' : undefined}
  class="inline-block rounded-md px-4 py-2 font-semibold transition-colors {variants[
    variant
  ]} {className}"
>
  {@render children?.()}
</a>
