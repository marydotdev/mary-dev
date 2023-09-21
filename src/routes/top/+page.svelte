<script lang="ts">
	import Card from '$lib/Card.svelte';
  import { onMount } from 'svelte';

	export let data;

	let mounted = false;
  let topTracks: any[] = [];
  let topArtists: any[] = [];

  // Fetch top tracks
  async function fetchTopTracks() {
    const response = await fetch('/api/topTracks');
    if (response.ok) {
      const data = await response.json();
      topTracks = data.items;
    } else {
      console.error('Failed to fetch top tracks');
    }
  }

  // Fetch top artists
  async function fetchTopArtists() {
    const response = await fetch('/api/topArtists');
    if (response.ok) {
      const data = await response.json();
      topArtists = data.items;
      console.log(topArtists)
    } else {
      console.error('Failed to fetch top tracks');
    }
  }


	onMount(() => {
		mounted = true;
    // fetchRecentlyReadBooks();
    fetchTopTracks();
    fetchTopArtists();
		// const interval = setInterval(() => {
		// 	date = new Date();
		// }, 1000);
		// return () => {
		// 	clearInterval(interval);
		// };
	});
</script>

<div class="w-full flex flex-col gap-4">
  <div class="w-full">
    <h4 id="tracks" class="pb-4 text-xl">Top Tracks</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-4">
      {#await topTracks}
      <p>loading</p>
      {:then}
        {#each topTracks as track}
        <Card item={track}>
          <a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
            <div>
              <div class="flex gap-2">
                <img src={track.album.images[1].url} alt={`${track.album.name} Cover`} class="h-36" />
                <div class="w-full flex flex-col justify-between p-4">
                  <div class="space-y-1">
                    <p class="clamp">{track.name}</p>
                    <p class="text-sm">{track.artists[0].name}</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Card>
        {/each}
      {/await}
    </div>
  </div>
  <div class="w-full">
    <h4 id="artists" class="pb-4 text-xl">Top Artists</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-4">
      {#await topArtists}
        <p>loading</p>
      {:then}
        {#each topArtists as artist}
          <Card item={artist}>
          <a href={artist.external_urls.spotify} target="_blank" rel="noreferrer">
            <div>
              <div class="flex gap-2">
                <img src={artist.images[1].url} alt={`${artist.name}`} class="h-36 aspect-square" />
                <div class="w-full flex flex-col justify-between p-4">
                  <div class="space-y-1">
                    <p class="clamp">{artist.name}</p>
                    <p class="clamp">
                      {#each artist.genres as genre, i}
                      <span>
                        {genre}{i < artist.genres.length - 1 ? ', ' : ''}
                      </span>
                      {/each}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
          </Card>
          {/each}
       {/await}
    </div>
  </div>
</div>
