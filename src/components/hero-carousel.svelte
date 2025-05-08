<script lang="ts">
    type Anime = {
      id: number;
      title: {
        romaji: string;
        english: string;
        native: string;
      };
      bannerImage: string;
    };
  
    let anime: Anime[] = [];
  
    fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query ($search: String!) {
            Page {
              media(search: $search, type: ANIME) {
                id
                title {
                  romaji
                  english
                  native
                }
                bannerImage
              }
            }
          }
        `,
        variables: { search: "Fate/stay night: Unlimited Blade Works" }
      })
    })
    .then(res => res.json())
    .then(data => {
      anime = data.data.Page.media;
    })
    .catch(err => console.error(err));
  </script>
  
  {#if anime.length}
    <img src={anime[1].bannerImage} alt={anime[0].title.romaji} class="w-1/1 h-auto" />
  {/if}
  