<script lang="ts">
    import HeroCarousel from "../components/hero-carousel.svelte";
    import MediaList from "../components/medialist.svelte";

</script>

<HeroCarousel />

<MediaList mediaListTitle="AIRING ANIME" type="ANIME" perPage={12} sort={["TRENDING_DESC"]} status="RELEASING"/>

<MediaList mediaListTitle="TOP ANIME" type="ANIME" perPage={24} sort={["POPULARITY_DESC"]}/>

<MediaList mediaListTitle="TOP MANGA" type="MANGA" perPage={24} sort={["POPULARITY_DESC"]}/>