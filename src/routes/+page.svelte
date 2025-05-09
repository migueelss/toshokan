<script lang="ts">
    import HeroCarousel from "../components/hero-carousel.svelte";
    import MediaList from "../components/medialist.svelte";
</script>

<div class="fixed z-50 bg-gray-900 rounded-lg p-1 shadow-lg bottom-4 right-4 md:top-4 md:left-4 md:bottom-auto md:right-auto">
    <img src="/favicon.png" alt="Logo" class="w-12 h-12 object-cover rounded-lg" />
</div>
<HeroCarousel />

Recent Anime
<MediaList type="ANIME" search="" perPage={9} sort={["START_DATE_DESC"]}/>

Top Ecchi
<MediaList type="ANIME" search="" perPage={50} genres={["Ecchi"]} sort={["SCORE_DESC"]}/>