<script lang="ts">
    import Toshokan from "./toshokan.svelte";
    import HeroCarousel from "../components/hero-carousel.svelte";
</script>

<nav class="bg-white p-4 flex justify-center gap-2 dark:bg-gray-800 dark:text-white">
    <span class="text-blue-300 text-3xl">図書館</span><span class="text-black text-3xl font-semibold" style="font-family: 'Times New Roman', serif;"> toshokan</span>
</nav>

<HeroCarousel />
<Toshokan />