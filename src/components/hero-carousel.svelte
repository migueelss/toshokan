<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  type MediaType = "ANIME" | "MANGA";

  type MediaBanner = {
    title: string;
    banner: string;
  };

  const medias: { search: string; type: MediaType }[] = [
    { search: "Sakamoto Days", type: "ANIME" },
    { search: "Naruto Shippuden", type: "ANIME" },
    { search: "One Piece", type: "ANIME" },
    { search: "Vagabond", type: "MANGA" },
    { search: "Chainsaw Man", type: "ANIME" },
    { search: "Oyasumi Punpun", type: "MANGA"},
    { search: "Neon Genesis Evangelion", type: "ANIME" },
    { search: "Mushoku Tensei: Isekai Ittara Honki Dasu", type: "ANIME" },
    { search: "Tensei Shitara Slime Datta Ken 2nd Season Part 2", type: "ANIME" },
    { search: "Attack on Titan", type: "ANIME" },
    { search: "Fate Stay Night Unlimited Blade Works", type: "ANIME" },
    { search: "My Hero Academia", type: "ANIME" },
    { search: "Tokyo Revengers", type: "ANIME" },
    { search: "MAGI", type: "MANGA" },
    { search: "Spy x Family", type: "ANIME" },
    { search: "Cyberpunk: Edgerunners", type: "ANIME" },
    { search: "Vinland Saga", type: "ANIME" },
    { search: "Death Note", type: "ANIME" },
    { search: "Solo Leveling", type: "ANIME" },
    { search: "Tokyo Ghoul", type: "ANIME" },
    { search: "Noragami", type: "ANIME" },
    { search: "The Promised Neverland", type: "ANIME" },
    { search: "Steins;Gate", type: "ANIME" },
    { search: "Kaguya-sama: Love Is War", type: "ANIME" },
    { search: "GANTZ", type: "MANGA" },
    { search: "Berserk", type: "MANGA" },
    { search: "Ajin", type: "MANGA" },
  ];

  let banners: MediaBanner[] = [];
  let current = 0;
  let loading = true;
  let interval: ReturnType<typeof setInterval>;

  async function fetchBanners() {
    const queryFields = medias.map(
      (m, i) => `
        m${i}: Media(search: "${m.search.replace(/"/g, '\\"')}", type: ${m.type}) {
          title {
            english
            romaji
          }
          bannerImage
        }
      `
    ).join("\n");

    const query = `
      query {
        ${queryFields}
      }
    `;

    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();

    const temp: MediaBanner[] = [];
    for (let i = 0; i < medias.length; i++) {
      const media = data.data[`m${i}`];
      if (media?.bannerImage) {
        temp.push({
          title: media.title.english || media.title.romaji,
          banner: media.bannerImage,
        });
      }
    }
    banners = temp;
    loading = false;
  }

  onMount(() => {
    fetchBanners().then(() => {
      if (banners.length > 1) {
        interval = setInterval(() => {
          current = (current + 1) % banners.length;
        }, 4000);
      }
    });
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

{#if loading}
  <div class="h-64 flex items-center justify-center">
    <span class="text-gray-500">Loading...</span>
  </div>
{:else if banners.length}
  <div class="relative w-full h-64 overflow-hidden shadow-lg">
    <div
      class="absolute inset-0 bg-cover bg-center transition-[background-image] duration-700"
      style="background-image: url({banners[current].banner})"
    ></div>
    <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
      <h2 class="text-white text-3xl font-bold font-roboto text-center drop-shadow-md">
        {banners[current].title}
      </h2>
    </div>
  </div>
{:else}
  <div class="h-64 flex items-center justify-center">
    <span class="text-red-500">Error.</span>
  </div>
{/if}