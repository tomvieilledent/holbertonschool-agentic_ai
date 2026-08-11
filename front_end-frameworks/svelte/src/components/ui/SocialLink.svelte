<script>
  let { href, label, icon: Icon } = $props()
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={label}
  class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-violet-500 hover:text-violet-300"
>
  <Icon size={16} />
</a>
