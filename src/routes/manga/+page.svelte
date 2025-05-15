<script lang="ts">
    import Medialist from "../../components/medialist.svelte";
    import HeroCarousel from "../../components/hero-carousel.svelte";
    import SearchInput from "../../components/SearchInput.svelte";

    let debouncedQuery = "";

    let carouselMedias = [
        { search: "SOLO LEVELING", type: "MANGA" },
        { search: "Vagabond", type: "MANGA" },
        { search: "Pick me Up", type: "MANGA" },
        { search: "Grand Blue", type: "MANGA" },
        { search: "Berserk", type: "MANGA" },
        { search: "Record of Ragnarok", type: "MANGA" },
        { search: "Oyasumi Punpun", type: "MANGA" },
        { search: "Solanin", type: "MANGA" },
        { search: "Homunculus", type: "MANGA" },
        { search: "Akira", type: "MANGA" },
        { search: "Sweet Home", type: "MANGA" },
    ];

</script>

<HeroCarousel medias={carouselMedias}/>

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