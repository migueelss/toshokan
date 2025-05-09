<script lang="ts">
    import MediaList from "../../medialist.svelte";
</script>

Recent Anime
<MediaList type="ANIME" search="" perPage={6} sort={["START_DATE_DESC"]}/>