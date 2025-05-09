<script lang="ts">
    import HeroCarousel from "../components/hero-carousel.svelte";
    import RecentAnimeList from "../components/screens/home/recentanime.svelte";
    import MediaList from "../components/medialist.svelte";
	import Recentanime from "../components/screens/home/recentanime.svelte";
</script>

<div class="fixed z-50 bg-gray-900 rounded-lg p-1 shadow-lg bottom-4 right-4 md:top-4 md:left-4 md:bottom-auto md:right-auto">
    <img src="/favicon.png" alt="Logo" class="w-12 h-12 object-cover rounded-lg" />
</div>
<HeroCarousel />

<RecentAnimeList />

Top Ecchi
<MediaList type="ANIME" search="" perPage={30} genres={["Ecchi"]} sort={["SCORE_DESC"]}/>