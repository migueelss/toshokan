<script lang="ts">
    import AdultGate from "../../components/AdultGate.svelte";
    import Medialist from "../../components/medialist.svelte";
    import HeroCarousel from "../../components/hero-carousel.svelte";

    import SearchInput from "../../components/SearchInput.svelte";

    let debouncedQuery = "";

    let carouselMedias = [
        { search: "Someone Stop Her!", type: "MANGA" },
        { search: "Secret Class", type: "MANGA"},
        { search: "A Wannabe Golden Gangster", type: "MANGA"},
        { search: "Eroge!: H mo Game mo Kaihatsu Zanmai", type: "ANIME"},
        { search: "Engineering Beauties", type: "MANGA"},
        { search: "Imaizumi's house seems to be a gathering place for gals", type: "ANIME"},
        { search: "Infidelity 101", type: "MANGA"},
        { search: "Himawari wa Yoru ni Saku", type: "MANGA"},
        { search: "My Stepmother's Friends", type: "MANGA"},
        { search: "Akane wa Tsumare Somerareru", type: "ANIME"},
        { search: "Overflow", type: "ANIME"},
        { search: "Ane wa Yanmama Junyuu-chuu", type: "ANIME"},
        { search: "Bunk Beds", type: "MANGA"},
        { search: "100% Personal", type: "MANGA"},
    ];
    
</script>

<AdultGate>
    <HeroCarousel medias={carouselMedias} isAdult={true}/>

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