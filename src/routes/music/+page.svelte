<script lang="ts">
	import Card from '$lib/Card.svelte';
	import { onMount } from 'svelte';

	let mounted = false;
	let topTracks: any[] = [];
	let topArtists: any[] = [];
	let fetchDataPromise: Promise<void>;

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
		} else {
			console.error('Failed to fetch top tracks');
		}
	}

	onMount(() => {
		fetchDataPromise = (async () => {
			await fetchTopTracks();
			await fetchTopArtists();
		})();
	});
</script>

{#await fetchDataPromise}
	<div class="w-full flex flex-col gap-4">
		<div class="w-full">
			<div class="pb-4 space-y-1">
				<h3 class="text-lg sm:text-xl font-medium">Top Tracks</h3>
				<p class="text-sm pb-4">Based on my recent Spotify data.</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-4">
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
			</div>
		</div>
	</div>
{:then _}
	<div class="w-full flex flex-col gap-12">
		<div class="w-full">
			<div class="pb-4 space-y-1">
				<h3 class="text-lg sm:text-xl font-medium">Top Tracks</h3>
				<p class="text-sm pb-4">Based on my recent Spotify data.</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-4">
				<!-- {#await topTracks}
        <p>loading</p>
      {:then} -->
				{#each topTracks as track}
					<Card item={track}>
						<a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
							<div>
								<div class="flex gap-2">
									<img
										src={track.album.images[1].url}
										alt={`${track.album.name} Cover`}
										class="h-36"
									/>
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
				<!-- {/await} -->
			</div>
		</div>
		<div class="w-full">
			<div class="pb-4 space-y-1">
				<h3 class="text-lg sm:text-xl font-medium">Top Artists</h3>
				<p class="text-sm pb-4">Based on my recent Spotify data.</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-4">
				<!-- {#await topArtists}
        <p>loading</p>
      {:then} -->
				{#each topArtists as artist}
					<Card item={artist}>
						<a href={artist.external_urls.spotify} target="_blank" rel="noreferrer">
							<div>
								<div class="flex gap-2">
									<img
										src={artist.images[1].url}
										alt={`${artist.name}`}
										class="h-36 aspect-square"
									/>
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
				<!-- {/await} -->
			</div>
		</div>
	</div>
{:catch error}
	<p>Error loading data: {error.message}</p>
{/await}

<style>
	/* Skeleton styles */
	.skeleton {
		background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}

	.skeleton-card {
		height: 150px; /* Adjust based on your card's height */
		width: 100%;
	}

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}
</style>
