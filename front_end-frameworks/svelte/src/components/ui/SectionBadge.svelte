<script>
  let { symbol = '✦', class: className = '', children } = $props()
</script>

<div
  class="flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-violet-300 {className}"
>
  <span>{symbol}</span>
  <span>{@render children?.()}</span>
  <span>{symbol}</span>
</div>
