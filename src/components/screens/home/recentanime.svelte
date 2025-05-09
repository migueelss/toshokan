<script lang="ts">
    import { onMount } from 'svelte';
    import { queryMedia } from "../../../graphql/media";

    let media: any[] = [];
    let loading = true;
    let error: string | null = null;

    onMount(async () => {
        loading = true;
        error = null;
        try {
        const res = await queryMedia(
            1, // page
            6, // perPage
            undefined, // id
            "ANIME", // type
            false, // isAdult
            undefined, // search
            undefined, // format
            undefined, // status
            undefined, // countryOfOrigin
            undefined, // source
            undefined, // season
            undefined, // seasonYear
            undefined, // year
            undefined, // onList
            undefined, // yearLesser
            undefined, // yearGreater
            undefined, // episodeLesser
            undefined, // episodeGreater
            undefined, // durationLesser
            undefined, // durationGreater
            undefined, // chaptersLesser
            undefined, // chapterGreater
            undefined, // volumesLesser
            undefined, // volumeGreater
            undefined, // licensedBy
            undefined, // isLicensed
            undefined, // genres
            undefined, // excludeGenres
            undefined, // tags
            undefined, // excludedTags
            undefined, // minimumTagRank
            ["START_DATE_DESC"], // sort
            ["id", "title:romaji", "coverImage:large"] // expectedValues
        );
        media = (res as any).data?.Page?.media ?? [];;
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
Recent Anime
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
<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-8 px-3 p-3">
  {#each media as anime}
    <div class="flex flex-col items-center transition-transform duration-150 hover:-translate-y-1.5 hover:scale-[1.035] cursor-pointer group w-full">
      <img
        src={anime.coverImage.large}
        alt={"Capa de " + anime.title.romaji}
        loading="lazy"
        class="w-full aspect-[9/13] object-cover shadow-lg group-hover:shadow-2xl bg-gray-100"
      />
      <strong
        class="mt-1 font-['Roboto',sans-serif] font-semibold text-base sm:text-lg text-gray-900 text-left break-words whitespace-normal w-full px-1 line-clamp-2"
        title={anime.title.romaji}
      >
        {anime.title.romaji}
      </strong>
    </div>
  {/each}
</div>
{/if}