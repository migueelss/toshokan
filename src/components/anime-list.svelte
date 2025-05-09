<script lang="ts">
    type MediaTitle = { romaji: string };
    type CoverImage = { large: string, extraLarge: string };
    type Media = {
      id: number;
      title: MediaTitle;
      coverImage: CoverImage;
    };
  
    export let search: string = '';
    export let page: number = 1;
    export let perPage: number = 20;
    export let type: string = 'ANIME';
  
    let animes: Media[] = [];
    let loading = false;
    let error: string | null = null;
  
    const QUERY = `
      query (
        $page: Int = 1
        $perPage: Int = 20
        $type: MediaType
        $search: String
        $isAdult: Boolean = false
        $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
      ) {
        Page(page: $page, perPage: $perPage) {
          pageInfo { hasNextPage }
          media(
            type: $type
            search: $search
            isAdult: $isAdult
            sort: $sort
          ) {
            id
            title { romaji }
            coverImage { large extraLarge }
          }
        }
      }
    `;
  
    function buildVariables() {
      const vars: Record<string, any> = {
        page,
        perPage,
        type,
        isAdult: false,
        sort: ['POPULARITY_DESC', 'SCORE_DESC']
      };
      if (search && search.trim() !== '') {
        vars.search = search;
      }
      return vars;
    }
  
    async function fetchAnimes() {
      loading = true;
      error = null;
      try {
        const res = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: QUERY,
            variables: buildVariables(),
          }),
        });
        if (!res.ok) throw new Error('Erro ao buscar animes');
        const json = await res.json();
        animes = json.data.Page.media as Media[];
      } catch (err) {
        error = (err as Error).message;
      } finally {
        loading = false;
      }
    }
  
    // Atualiza sempre que search, page ou type mudarem
    $: fetchAnimes();
  </script>
  
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
    {#each animes as anime}
      <div class="flex flex-col items-center transition-transform duration-150 hover:-translate-y-1.5 hover:scale-[1.035] cursor-pointer group w-full">
        <img
          src={anime.coverImage.large}
          alt={"Capa de " + anime.title.romaji}
          loading="lazy"
          class="w-full aspect-[9/13] object-cover shadow-lg group-hover:shadow-2xl bg-gray-100"
        />
        <strong
          class="mt-1 font-['Roboto',sans-serif] font-semibold text-base sm:text-lg text-gray-900 text-left break-words whitespace-normal w-full px-1"
          title={anime.title.romaji}
        >
          {anime.title.romaji}
        </strong>
      </div>
    {/each}
  </div>
  {/if}