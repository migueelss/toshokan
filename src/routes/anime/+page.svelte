<script lang="ts">
    import Medialist from "../../components/medialist.svelte";
    import HeroCarousel from "../../components/hero-carousel.svelte";

    import SearchInput from "../../components/SearchInput.svelte";

    let debouncedQuery = "";

    let carouselMedias = [
        { search: "Dragon Ball", type: "ANIME" },
        { search: "One Piece", type: "ANIME" },
        { search: "Naruto", type: "ANIME" },
        { search: "Saint Seiya: THE LOST CANVAS - Meiou Shinwa 2", type: "ANIME" },
        { search: "Attack on Titan", type: "ANIME" },
        { search: "My Hero Academia", type: "ANIME" },
        { search: "Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train", type: "ANIME" },
        { search: "Death Note", type: "ANIME" },
        { search: "Sword Art Online", type: "ANIME" },
        { search: "Fullmetal Alchemist", type: "ANIME" },
    ];

</script>

<HeroCarousel medias={carouselMedias}/>

<SearchInput on:search={(e) => debouncedQuery = e.detail} />

{#if debouncedQuery.trim() !== ""}
  {#key debouncedQuery}
    <Medialist
      mediaListTitle="SEARCH RESULTS"
      type="ANIME"
      perPage={24}
      search={debouncedQuery}
      sort={["POPULARITY_DESC", "SEARCH_MATCH"]}
    />
  {/key}
  {#key debouncedQuery}
    <Medialist
      mediaListTitle="SEARCH RESULTS"
      type="ANIME"
      perPage={24}
      search={debouncedQuery}
      sort={["POPULARITY_DESC", "SEARCH_MATCH"]}
    />
  {/key}
{:else}
  <Medialist
    mediaListTitle="TRENDING ANIME"
    type="ANIME"
    perPage={12}
    sort={["TRENDING_DESC"]}
  />

  <Medialist
    mediaListTitle="BEST RATED ANIME"
    type="ANIME"
    perPage={24}
    sort={["SCORE_DESC"]}
  />

  <Medialist
    mediaListTitle="BEST ACTION ANIME"
    type="ANIME"
    perPage={24}
    sort={["POPULARITY_DESC"]}
    genres={["Action"]}
  />
{/if}
