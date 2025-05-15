<script lang="ts">
    import AdultGate from "../../components/AdultGate.svelte";
    import Medialist from "../../components/medialist.svelte";
    import HeroCarousel from "../../components/hero-carousel.svelte";

    import SearchInput from "../../components/SearchInput.svelte";

    let debouncedQuery = "";
</script>

<AdultGate>
    <HeroCarousel />

    <SearchInput on:search={(e) => debouncedQuery = e.detail} />

    {#if debouncedQuery.trim() !== ""} 
    {#key debouncedQuery}
        <Medialist
        mediaListTitle="SEARCH RESULTS"
        perPage={24}
        search={debouncedQuery}
        sort={["POPULARITY_DESC", "SEARCH_MATCH"]}
        isAdult={true} />
    {/key}
    {:else}
    <Medialist
        mediaListTitle="ADULT ANIME"
        type="ANIME"
        perPage={12}
        sort={["SCORE_DESC"]}
        isAdult={true} />

    <Medialist
        mediaListTitle="ADULT MANGA"
        type="MANGA"
        perPage={24}
        sort={["POPULARITY_DESC"]}
        isAdult={true}
        countryOfOrigin={"JP"} />

    <Medialist
        mediaListTitle="ADULT MANHWA"
        type="MANGA"
        perPage={24}
        sort={["POPULARITY_DESC"]}
        isAdult={true}
        countryOfOrigin={"KR"} />
    {/if}
</AdultGate>