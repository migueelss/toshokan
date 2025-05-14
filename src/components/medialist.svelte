<script lang="ts">
  import { onMount } from 'svelte';
  import { queryMedia } from "../graphql/media";
	import type { MediaFormat, MediaStatus, MediaType, MediaSource, MediaSeason, MediaSort } from '../types/media';
	import type { FuzzyDateInt } from '../types/FuzzyDateInt';
  import slugify from '../utils/slugify';

  export let mediaListTitle: string = "";

  export let page: number = 1;
  export let perPage: number = 6;
  export let id: number | undefined = undefined;
  export let type: MediaType = "ANIME";
  export let isAdult: boolean = false;
  export let search: string | undefined = undefined;
  export let format: MediaFormat[] | undefined = undefined;
  export let status: MediaStatus | undefined = undefined;
  export let countryOfOrigin: string | undefined = undefined;
  export let source: MediaSource | undefined = undefined;
  export let season: MediaSeason | undefined = undefined;
  export let seasonYear: number | undefined = undefined;
  export let year: string | undefined = undefined;
  export let onList: boolean | undefined = undefined;
  export let yearLesser: FuzzyDateInt | undefined = undefined;
  export let yearGreater: FuzzyDateInt | undefined = undefined;
  export let episodeLesser: number | undefined = undefined;
  export let episodeGreater: number | undefined = undefined;
  export let durationLesser: number | undefined = undefined;
  export let durationGreater: number | undefined = undefined;
  export let chapterLesser: number | undefined = undefined;
  export let chapterGreater: number | undefined = undefined;
  export let volumeLesser: number | undefined = undefined;
  export let volumeGreater: number | undefined = undefined;
  export let licensedBy: number[] | undefined = undefined;
  export let isLicensed: boolean | undefined = undefined;
  export let genres: string[] | undefined = undefined;
  export let excludedGenres: string[] | undefined = undefined;
  export let tags: string[] | undefined = undefined;
  export let excludedTags: string[] | undefined = undefined;
  export let minimumTagRank: number | undefined = undefined;
  export let sort: MediaSort[] | undefined = undefined;
  export let expectedValues: string[] = ["id", "title:romaji", "title:english", "title:native", "coverImage:large"]

  let media: any[] = [];
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
      loading = true;
      error = null;
      try {
      const res = await queryMedia(
          page, // page
          perPage, // perPage
          id, // id
          type, // type
          isAdult, // isAdult
          search, // search
          format, // format
          status, // status
          countryOfOrigin, // countryOfOrigin
          source, // source
          season, // season
          seasonYear, // seasonYear
          year, // year
          onList, // onList
          yearLesser, // yearLesser
          yearGreater, // yearGreater
          episodeLesser, // episodeLesser
          episodeGreater, // episodeGreater
          durationLesser, // durationLesser
          durationGreater, // durationGreater
          chapterLesser, // chapterLesser
          chapterGreater, // chapterGreater
          volumeLesser, // volumeLesser
          volumeGreater, // volumeGreater
          licensedBy, // licensedBy
          isLicensed, // isLicensed
          genres, // genres
          excludedGenres, // excludedGenres
          tags, // tags
          excludedTags, // excludedTags
          minimumTagRank, // minimumTagRank
          sort, // sort
          expectedValues // expectedValues
      );
      media = (res as any).data?.Page?.media ?? [];
      } catch (e) {
          if (e instanceof Error) {
              error = e.message;
          } else {
              error = String(e);
          }
      }
      loading = false;
  });
</script>
<div class="px-3 p-3 lg:p-5">
<h1 class="font-semibold text-xl text-lg tracking-tight mb-5 mt-2 dark:text-gray-300">{mediaListTitle}</h1>
{#if loading}
<div class="min-h-[100px] flex items-center justify-center">
  <svg width="40" height="40" fill="none" viewBox="0 0 40 40" class="animate-spin">
    <circle cx="20" cy="20" r="16" stroke="#6366f1" stroke-width="4" opacity="0.18"/>
    <path d="M36 20A16 16 0 0 0 20 4" stroke="#6366f1" stroke-width="4" stroke-linecap="round"/>
  </svg>
  <span class="ml-4 text-indigo-500 font-medium">Loading...</span>
</div>
{:else if error}
<p class="text-red-600 text-center">Error: {error}</p>
{:else}
<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-8">
  {#each media as m}
  <a
    class="flex flex-col items-center transition-transform duration-150 hover:-translate-y-1.5 hover:scale-[1.035] cursor-pointer group w-full"
    href={`/${m.type === "ANIME" ? "anime" : "manga"}/${m.id}/${slugify(m.title.english || m.title.romaji)}`}
  >
    <img
      src={m.coverImage.large}
      alt={"Capa de " + m.title.romaji}
      loading="lazy"
      class="w-full aspect-[9/13] object-cover shadow-lg group-hover:shadow-2xl bg-gray-100 rounded-sm"
    />
    <strong
      class="mt-1 font-semibold text-base sm:text-lg text-left break-words whitespace-normal w-full px-1 line-clamp-2 uppercase"
      title={m.title.romaji}
    >
      {m.title.english ? m.title.english : m.title.native}
    </strong>
  </a>
{/each}
</div>
{/if}
</div>