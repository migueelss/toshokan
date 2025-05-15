<script lang="ts">
    import Medialist from "../../components/medialist.svelte";
    import HeroCarousel from "../../components/hero-carousel.svelte";
    import SearchInput from "../../components/SearchInput.svelte";

    let debouncedQuery = "";

</script>

<HeroCarousel />

<SearchInput on:search={(e) => debouncedQuery = e.detail} />

{#if debouncedQuery.trim() !== ""}
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