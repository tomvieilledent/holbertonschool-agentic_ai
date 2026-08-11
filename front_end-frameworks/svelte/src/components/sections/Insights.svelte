<script>
  import { onMount } from 'svelte'
  import InsightCard from '../cards/InsightCard.svelte'
  import SectionBadge from '../ui/SectionBadge.svelte'
  import SectionTitle from '../ui/SectionTitle.svelte'
  import { getInsights } from '../../services/insightsService'

  /* State: the insights list and a possible error message. */
  let insights = $state([])
  let error = $state(null)

  /* Load the insights once, when the component is mounted. */
  onMount(async () => {
    try {
      insights = await getInsights()
    } catch {
      error = 'Unable to load insights. Please try again later.'
    }
  })
</script>

<section id="insights-section" class="relative bg-black py-24">
  <div class="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center">
    <!-- Badge -->
    <SectionBadge symbol="✧" class="text-xs">Insights</SectionBadge>

    <!-- Title -->
    <div>
      <SectionTitle
        class="text-4xl md:text-5xl"
        top="Explore Agentic AI"
        bottom="Through real-world scenes"
      />
    </div>

    {#if error}
      <!-- Error message area -->
      <p class="text-sm text-red-400">{error}</p>
    {:else}
      <!-- Insights grid -->
      <div class="mt-12 grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {#each insights as insight, index (insight.title)}
          <InsightCard
            {index}
            image={insight.image}
            title={insight.title}
            description={insight.description}
            category={insight.category}
          />
        {/each}
      </div>
    {/if}
  </div>
</section>
