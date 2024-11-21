<script lang="ts">
	import Card from '$lib/Card.svelte';
	import { onMount } from 'svelte';

	let mounted = false;
	let topTracks: any[] = [];
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

	onMount(() => {
		fetchDataPromise = (async () => {
			await fetchTopTracks();
		})();
	});
</script>

<div class="">
  {#await fetchDataPromise}
	<div class="w-full flex flex-col gap-4">
		<div class="w-full p-4">
			<div class="pb-4 space-y-1">
				<h3 class="text-base font-medium xl:text-xl">Top Tracks</h3>
			</div>
			<div class="flex flex-col  max-w-sm w-full gap-4">
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
				<h3 class="text-base font-medium xl:text-xl">Top Tracks</h3>
			</div>
			<div class="flex flex-col max-w-sm gap-4">
				<!-- {#await topTracks}
        <p>loading</p>
      {:then} -->
				{#each topTracks.slice(0, 3) as track}
					<a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
							<div class="">
								<div class="flex items-center gap-2">
									<img
										src={track.album.images[1].url}
										alt={`${track.album.name} Cover`}
										class="h-12 xl:h-24 aspect-square"
									/>
									<div class="w-full flex flex-col justify-between">
										<div class="">
											<p class="clamp text-base xl:text-xl">{track.name}</p>
											<p class="text-sm xl:text-lg">{track.artists[0].name}</p>
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
</div>

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
