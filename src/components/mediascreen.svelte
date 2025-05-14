<script lang="ts">
    import { onMount } from "svelte";
    import { queryMedia } from "../graphql/singlemedia";

    export let id: number;
    let mediaInfo: any = null;

    onMount(async () => {
        const res: any = await queryMedia(id, [
            "id",
            "title:romaji",
            "title:english",
            "title:native",
            "coverImage:large",
            "bannerImage",
            "description",
            "type",
            "status",
            "countryOfOrigin",
            "episodes",
            "genres",
        ]);
        if (res) {
            mediaInfo = res.data?.Page.media[0];
        }
    });
</script>

{#if mediaInfo}
    <img src={mediaInfo.bannerImage} alt={mediaInfo.title.romaji} class="w-full h-auto"/>
    <div>
        <div>
            <img src={mediaInfo.coverImage.large} alt={mediaInfo.title.romaji}/>
            <div>
                <h1>{mediaInfo.title.romaji}</h1>
                <h2>{mediaInfo.title.english}</h2>
                <h3>{mediaInfo.title.native}</h3>
                <p><strong>Type:</strong> {mediaInfo.type}</p>
                <p><strong>Status:</strong> {mediaInfo.status}</p>
                <p><strong>Episodes:</strong> {mediaInfo.episodes}</p>
                <p><strong>Country of Origin:</strong> {mediaInfo.countryOfOrigin}</p>
                <p><strong>Genres:</strong> {mediaInfo.genres.join(', ')}</p>
            </div>
        </div>
        <div>
            <p>{mediaInfo.description}</p>
        </div>
    </div>
{/if}
