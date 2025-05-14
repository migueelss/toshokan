<script lang="ts">
    import { onMount } from "svelte";
    import Medialist from "../../components/medialist.svelte";
</script>

<Medialist
    mediaListTitle="ADULT ANIME"
    type="ANIME"
    perPage={12}
    sort={["TRENDING_DESC"]}
    isAdult={true} />

<Medialist
    mediaListTitle="ADULT MANGA"
    type="MANGA"
    perPage={24}
    sort={["TRENDING_DESC"]}
    isAdult={true}
    countryOfOrigin={"JP"} />

<Medialist
    mediaListTitle="ADULT MANHWA"
    type="MANGA"
    perPage={24}
    sort={["TRENDING_DESC"]}
    isAdult={true}
    countryOfOrigin={"KR"} />