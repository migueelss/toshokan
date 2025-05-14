<script lang="ts">
    import Medialist from "../../components/medialist.svelte";
</script>


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
