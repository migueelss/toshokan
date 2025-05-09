<script lang="ts">
    import HeroCarousel from "../components/hero-carousel.svelte";
    import AnimeList from "../components/anime-list.svelte";
</script>

<div class="fixed z-50 bg-gray-900 rounded-lg p-1 shadow-lg bottom-4 right-4 md:top-4 md:left-4 md:bottom-auto md:right-auto">
    <img src="/favicon.png" alt="Logo" class="w-12 h-12 object-cover rounded-lg" />
</div>
<HeroCarousel />
<AnimeList type="ANIME" search="Fate" />