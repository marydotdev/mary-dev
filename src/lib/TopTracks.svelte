<script lang="ts">
	import { onMount } from 'svelte';

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

<div class="rounded-xl p-2">
	<div class="relative border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
		{#await fetchDataPromise}
			<div class="w-full flex flex-col gap-4">
				<div class="w-full p-6">
					<div class="pb-4 space-y-1">
						<h3 class="text-base font-medium xl:text-xl">Top Tracks</h3>
					</div>
					<div class="flex flex-col max-w-sm w-full gap-4">
						{#each Array(3) as _, i}
							<div class="flex items-center gap-2">

								<div class="skeleton h-12 xl:h-24 aspect-square rounded bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800" />

								<div class="flex-1 flex flex-col gap-2">

									<div class="skeleton h-4 xl:h-6 w-3/4 rounded bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800" />

									<div class="skeleton h-3 xl:h-5 w-1/2 rounded bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800" />
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{:then _}
			<div class="w-full flex flex-col gap-12">
				<div class="w-full pl-6 pr-4 py-6">
					<div class="pb-4 space-y-1">
              <h3 class="text-base font-medium xl:text-xl sm:hover:underline sm:underline-offset-8 w-fit">
                <a href="/music#toptracks">
                  Top Tracks
                </a>
              </h3>
					</div>
					<div class="flex flex-col max-w-sm gap-4">
						{#each topTracks.slice(0, 3) as track}
							<a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
								<div class="group">
									<div class="flex items-center gap-2 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800 rounded-lg">
										<img
											src={track.album.images[1].url}
											alt={`${track.album.name} Cover`}
											class="h-12 xl:h-20 aspect-square rounded-lg"
										/>
										<div class="w-full flex flex-col justify-between">
											<div class="">
												<p class="clamp text-base xl:text-lg text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">{track.name}</p>
												<p class="text-zinc-500 dark:text-zinc-400 text-sm xl:text-base group-hover:text-zinc-700 dark:group-hover:text-zinc-200">{track.artists[0].name}</p>
											</div>
										</div>
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			</div>
		{:catch error}
			<p>Error loading data: {error.message}</p>
		{/await}

    <div class="absolute top-4 right-4 group hover:cursor-pointer">
      <div class="w-6 h-6 text-zinc-700 dark:text-zinc-400 group-hover:text-[#1DB954]">
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ><title>Spotify</title><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
      </div>
    </div>
	</div>
</div>

<style>
	/* Skeleton styles */
	.skeleton {
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
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
