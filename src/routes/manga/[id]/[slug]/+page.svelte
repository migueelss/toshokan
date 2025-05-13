<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { queryMedia } from "../../../../graphql/media";

    $: id = parseInt($page.params.id);
    $: slug = $page.params.slug;

    let media: any[] = [];
    let loading = true;
    let error: string | null = null;
    let expectedValues: string[] = ["id", "title:romaji", "title:english", "title:native", "coverImage:large"];

    onMount(async () => {
      loading = true;
      error = null;
      try {
      const res = await queryMedia(
          1, // page
          1, // perPage
          id, // id
          undefined, // type
          undefined, // isAdult
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
          undefined, // chapterLesser
          undefined, // chapterGreater
          undefined, // volumeLesser
          undefined, // volumeGreater
          undefined, // licensedBy
          undefined, // isLicensed
          undefined, // genres
          undefined, // excludedGenres
          undefined, // tags
          undefined, // excludedTags
          undefined, // minimumTagRank
          undefined, // sort
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

    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p>Error: {error}</p>
    {:else}
        <ul>
        {#each media as m}
            <h1
                class="text-2xl"
            >
                {m.title.english}</h1>
            <img src={m.coverImage.large} alt={m.title.romaji} />
        {/each}
        </ul>
    {/if}
