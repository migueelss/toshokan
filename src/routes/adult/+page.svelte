<script lang="ts">
    import AdultGate from "../../components/AdultGate.svelte";
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

<AdultGate>
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