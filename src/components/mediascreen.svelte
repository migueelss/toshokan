<script lang="ts">
    import { onMount } from "svelte";
    import { queryMedia } from "../graphql/singlemedia";

    export let id: number;
    export let type: string;
    let mediaInfo: any = null;

    onMount(async () => {
        const fields = [
            "id", "title:romaji", "title:english", "title:native",
            "coverImage:large", "coverImage:extraLarge","bannerImage", "description",
            "type", "status", "countryOfOrigin", "genres", "streamingEpisodes:title", "streamingEpisodes:url", "streamingEpisodes:thumbnail", "streamingEpisodes:site",
            "trailer:thumbnail", "trailer:site", "trailer:id",
        ];

        if (type === "ANIME") {
            fields.push("episodes");
        } else if (type === "MANGA") {
            fields.push("volumes", "chapters");
        }

        const res: any = await queryMedia(id, fields);
        if (res) {
            mediaInfo = res.data?.Page.media[0];
        }
    });
</script>

{#if mediaInfo}
    <div class="w-full">
        <img 
            src={mediaInfo.bannerImage || '/placeholder-banner.png'} 
            alt={mediaInfo.title.romaji} 
            class="w-full h-64 object-cover shadow-md"
        />
        
        <div class="max-w-5xl mx-auto mt-6 p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <img src={mediaInfo.coverImage.extraLarge} alt={mediaInfo.title.romaji} class="w-full rounded-xl shadow-lg"/>

            <div class="md:col-span-2 space-y-2">
                <h1 class="text-3xl font-bold">{mediaInfo.title.romaji}</h1>
                <h2 class="text-xl text-gray-600">{mediaInfo.title.english}</h2>
                <h3 class="text-md text-gray-500 italic">{mediaInfo.title.native}</h3>

                <p><strong>Type:</strong> {mediaInfo.type}</p>
                <p><strong>Status:</strong> {mediaInfo.status}</p>
                {#if type === "ANIME"}
                    <p><strong>Episodes:</strong> {mediaInfo.episodes}</p>
                {:else if type === "MANGA" && mediaInfo.status !== "RELEASING"}
                    <p><strong>Chapters:</strong> {mediaInfo.chapters}</p>
                {/if}
                <p><strong>Country:</strong> {mediaInfo.countryOfOrigin}</p>
                <p><strong>Genres:</strong> {mediaInfo.genres.join(', ')}</p>
            </div>
        </div>

        <div class="max-w-5xl mx-auto p-4 mt-4 bg-gray-100 rounded-lg shadow-sm dark:bg-gray-800">
            <div class="text-justify">
                {@html mediaInfo.description}
            </div>
        </div>

        {#if mediaInfo.trailer?.id && mediaInfo.trailer.site === "youtube"}
            <div class="max-w-5xl mx-auto mt-6">
                <h2 class="text-2xl font-semibold mb-2">Trailer</h2>
                <div class="relative w-full" style="padding-top: 56.25%;">
                    <iframe
                        src={`https://www.youtube.com/embed/${mediaInfo.trailer.id}`}
                        title="Trailer"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        class="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                </div>
            </div>
        {/if}


        {#if type === "ANIME" && mediaInfo.streamingEpisodes?.length}
            <div class="max-w-5xl mx-auto p-4 mt-6 space-y-4">
                <h2 class="text-2xl font-semibold">Streaming Episodes</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {#each mediaInfo.streamingEpisodes.slice(-30) as ep}
                        <a href={ep.url} target="_blank" rel="noopener noreferrer" class="block rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                            <img src={ep.thumbnail} alt={ep.title} class="w-full h-40 object-cover"/>
                            <div class="p-2 bg-white dark:bg-gray-900">
                                <p class="text-sm font-medium text-center">{ep.title} <span class="text-xs text-gray-500">({ep.site})</span></p>
                            </div>
                        </a>
                    {/each}
                </div>
            </div>
        {/if}

    </div>
{/if}
