<script lang="ts">
    type Anime = {
      id: number;
      title: {
        romaji: string;
        english: string;
        native: string;
      };
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
    <div>{anime[1].title.native}</div>
  {:else}
    <div>Loading...</div>
  {/if}
  