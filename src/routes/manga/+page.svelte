<script lang="ts">
    import Medialist from "../../components/medialist.svelte";
</script>


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
