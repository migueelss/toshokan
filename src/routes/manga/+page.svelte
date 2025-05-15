<script lang="ts">
    import Medialist from "../../components/medialist.svelte";
    import HeroCarousel from "../../components/hero-carousel.svelte";

    let query = "";
    let debouncedQuery = "";
    let timeout: ReturnType<typeof setTimeout>;

    $: if (query) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
        debouncedQuery = query;
        }, 300);
    }

</script>

<HeroCarousel />

<input
  type="text"
  placeholder="Search..."
  bind:value={query}
/>


{#if debouncedQuery}
  {#key debouncedQuery}
    <Medialist
      mediaListTitle="SEARCH RESULTS"
      type="MANGA"
      perPage={24}
      search={debouncedQuery}
      sort={["POPULARITY_DESC", "SEARCH_MATCH"]}
    />
  {/key}
{:else}
  <Medialist
    mediaListTitle="TRENDING MANGA"
    type="MANGA"
    perPage={12}
    sort={["TRENDING_DESC"]}
  />

  <Medialist
    mediaListTitle="BEST RATED MANGA"
    type="MANGA"
    perPage={24}
    sort={["SCORE_DESC"]}
  />

  <Medialist
    mediaListTitle="BEST ACTION MANGA"
    type="MANGA"
    perPage={24}
    sort={["POPULARITY_DESC"]}
    genres={["Action"]}
  />
{/if}