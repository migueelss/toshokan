<script lang="ts">
    import AdultGate from "../../components/AdultGate.svelte";
    import Medialist from "../../components/medialist.svelte";
</script>

<AdultGate>
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
</AdultGate>