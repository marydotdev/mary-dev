<script lang="ts">
	import Card from '$lib/Card.svelte';
	import { onMount } from 'svelte';

	let mounted = false;
	let topArtists: any[] = [];
	let fetchDataPromise: Promise<void>;


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
			await fetchTopArtists();
		})();
	});
</script>

{#await fetchDataPromise}
	<div class="w-full flex flex-col gap-4">
		<div class="w-full p-4">
			<div class="pb-4 space-y-1">
				<h3 class="text-base font-medium xl:text-xl">Top Artists</h3>
			</div>
			<div class="flex flex-col w-full max-w-sm gap-4">
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
				<div class="skeleton skeleton-card" />
			</div>
		</div>
	</div>
{:then _}
	<div class="w-full flex flex-col gap-12">

		<div class="w-full p-4">
			<div class="pb-4 space-y-1">
				<h3 class="text-base font-medium xl:text-xl">Top Artists</h3>
			</div>
			<div class="flex flex-col w-full max-w-sm gap-4">
				<!-- {#await topArtists}
        <p>loading</p>
      {:then} -->
				{#each topArtists.slice(0, 3) as artist}
					<a href={artist.external_urls.spotify} target="_blank" rel="noreferrer" class="">
							<div>
								<div class="flex items-center gap-2">
									<img
										src={artist.images[1].url}
										alt={`${artist.name}`}
										class="h-12 xl:h-24 aspect-square"
									/>
									<div class="w-full flex flex-col justify-between">
										<div class="">
											<p class="clamp text-base xl:text-xl">{artist.name}</p>
											<p class="clamp text-sm xl:text-lg">
												<!-- {#each artist.genres.slice(0, 2) as genre, i}
													<span>
														{genre}{i < artist.genres.length - 1 ? ', ' : ''}
													</span>
												{/each} -->
                        {artist.genres[0]}
											</p>
										</div>
									</div>
								</div>
							</div>
						</a>
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
		height: 3rem; /* Adjust based on your card's height */
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
