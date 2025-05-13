<script lang="ts">
    import HeroCarousel from "../components/hero-carousel.svelte";
    import MediaList from "../components/medialist.svelte";
</script>

<div class="fixed z-50 bg-gray-900 rounded-lg p-1 shadow-lg bottom-4 right-4 md:top-4 md:left-4 md:bottom-auto md:right-auto">
    <img src="/favicon.png" alt="Logo" class="w-12 h-12 object-cover rounded-lg" />
</div>
<HeroCarousel />

<h1 class="text-2xl">Recent Anime</h1>
<MediaList type="ANIME" perPage={12} sort={["START_DATE_DESC"]}/>

<h1 class="text-2xl">Top Anime</h1>
<MediaList type="ANIME" perPage={12} sort={["SCORE_DESC"]}/>

<h1 class="text-2xl">Top Manga</h1>
<MediaList type="MANGA" perPage={12} sort={["SCORE_DESC"]}/>

<h1 class="text-2xl">Top Hentai Anime</h1>
<MediaList type="ANIME" perPage={12} genres={["Hentai"]} sort={["POPULARITY_DESC"]} minimumTagRank={1} isAdult={true}/>

<h1 class="text-2xl">Top Hentai Manga</h1>
<MediaList type="MANGA" perPage={12} genres={["Hentai"]} sort={["POPULARITY_DESC"]} minimumTagRank={1} isAdult={true} countryOfOrigin={"JP"}/>

<h1 class="text-2xl">Top Pornwha</h1>
<MediaList type="MANGA" perPage={24} genres={["Hentai"]} sort={["SCORE_DESC"]} minimumTagRank={1} isAdult={true} countryOfOrigin={"KR"}/>