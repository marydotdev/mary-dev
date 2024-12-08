<script lang="ts">
	import { onMount } from 'svelte';

	interface Track {
		title: string;
		artist: string;
		album: string;
		albumImageUrl: string;
		songUrl: string;
	}

	interface NowPlayingData {
		nowPlaying: {
			isPlaying: boolean;
			song: Track;
		} | null;
		recentlyPlayed: {
			song: Track;
			playedAt: string;
		} | null;
	}

	let trackData: NowPlayingData | null = null;
	let error: string | null = null;

  let fetchDataPromise: Promise<void>;

  let topTracks: any[] = [];

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

	function formatTimeSince(dateString: string): string {
		const date = new Date(dateString);
		const now = new Date();
		const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

		if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
		if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
		if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
		return `${Math.floor(diffInSeconds / 86400)} days ago`;
	}

	function saveRecentlyPlayed(song: Track) {
		const recentlyPlayed = {
			song,
			playedAt: new Date().toISOString()
		};
		console.log('Saving recently played track:', recentlyPlayed);
		localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
	}

	function loadRecentlyPlayed(): { song: Track; playedAt: string } | null {
		const data = localStorage.getItem('recentlyPlayed');
    // const data = null;
		console.log('Loaded recently played track from local storage:', data);
		return data ? JSON.parse(data) : null;
	}

	async function fetchTrackData() {
		try {
			const response = await fetch('/api/nowPlaying');
			const data: NowPlayingData = await response.json();

			if (response.ok) {
				console.log('Parsed API response:', data);
				if (data.nowPlaying && data.nowPlaying.song) {
					saveRecentlyPlayed(data.nowPlaying.song);
				}
				trackData = {
					...data,
					recentlyPlayed: loadRecentlyPlayed()
				};
				error = null;
			} else {
				error = `Failed to fetch track data: ${response.status} ${response.statusText}`;
				console.error(error);
			}
		} catch (fetchError: unknown) {
			if (fetchError instanceof Error) {
				error = `Error fetching track data: ${fetchError.message}`;
			} else {
				error = 'An unknown error occurred while fetching track data';
			}
			console.error(error);
		}
	}

	onMount(() => {
		fetchTrackData();
    fetchDataPromise = (async () => {
			await fetchTopTracks();
		})();
		const interval = setInterval(fetchTrackData, 30000); // Update every 30 seconds
		return () => clearInterval(interval);
	});
</script>

<div class="relative flex justify-center items-center min-h-[240px] rounded-xl">
	<div class="w-full h-full flex justify-start items-center p-2">
		<div
			class="w-full h-full p-6 flex justify-start items-center border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 rounded-xl"
		>
			{#if trackData}
				{#if trackData.nowPlaying}
					<div
						class="text-center md:text-left w-fit flex flex-col mx-auto md:mx-0 md:flex-row gap-2 hover:bg-zinc-200 pr-4 rounded-xl hover:cursor-pointer dark:hover:bg-zinc-800"
					>
						<div class="flex justify-center items-end">
							<img
								src={trackData.nowPlaying.song.albumImageUrl}
								alt="Album Art"
								class="w-24 h-24 rounded-lg"
							/>
						</div>
						<div class="w-fit flex flex-col justify-center">
							<div>
								<p class="font-bold">{trackData.nowPlaying.song.title}</p>
								<p class="text-sm">{trackData.nowPlaying.song.artist}</p>
								<p class="text-[#1DB954] text-xs mt-2">Now Playing</p>
							</div>
						</div>
					</div>
				{:else if trackData.recentlyPlayed}
					<div
						class="text-center md:text-left w-fit flex flex-col mx-auto md:mx-0 md:flex-row gap-2 hover:bg-zinc-200 pr-4 rounded-xl hover:cursor-pointer dark:hover:bg-zinc-800"
					>
						<div class="flex justify-center items-end">
							<img
								src={trackData.recentlyPlayed.song.albumImageUrl}
								alt="Album Art"
								class="w-24 h-24 rounded-lg"
							/>
						</div>
						<div class="w-fit flex flex-col justify-center">
							<div>
								<p class="font-bold">{trackData.recentlyPlayed.song.title}</p>
								<p class="text-sm">{trackData.recentlyPlayed.song.artist}</p>
								<p class="text-zinc-500 text-xs mt-2">
									Last played {formatTimeSince(trackData.recentlyPlayed.playedAt)}
								</p>
							</div>
						</div>
					</div>
				{:else}
					{#await fetchDataPromise}
            <div class="w-full flex flex-col gap-4">
              <div class="w-full">
                <div class="flex flex-col max-w-sm w-full gap-4">
                  {#each Array(1) as _, i}
                    <div class="flex items-center gap-2">

                      <div class="skeleton h-24 aspect-square rounded bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800" />

                      <div class="flex-1 flex flex-col gap-2">

                        <div class="skeleton h-6 w-3/4 rounded bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800" />

                        <div class="skeleton h-3 w-1/2 rounded bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800" />
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          {:then _}
            <div class="w-full flex flex-col gap-12">
              <div class="w-full">
                <div class="text-center md:text-left w-fit flex flex-col mx-auto md:mx-0 md:flex-row gap-2 hover:bg-zinc-200 pr-4 rounded-xl hover:cursor-pointer dark:hover:bg-zinc-800">
                  {#each topTracks.slice(7, 8) as track}
                    <a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
                      <div class="group">
                        <div class="flex items-center gap-2 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800 rounded-lg">
                          <img
                            src={track.album.images[1].url}
                            alt={`${track.album.name} Cover`}
                            class="h-24 aspect-square rounded-lg"
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
				{/if}
			{:else if error}
				<p class="text-red-500">{error}</p>
			{:else}
				<div class="text-center md:text-left w-fit flex flex-col mx-auto md:mx-0 md:flex-row gap-2">
					<!-- Album art skeleton -->
					<div class="flex justify-center items-end">
						<div
							class="skeleton w-24 h-24 rounded-lg bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800"
						/>
					</div>
					<!-- Text content skeleton -->
					<div class="w-fit flex flex-col justify-center gap-2">
						<!-- Title skeleton -->
						<div
							class="skeleton h-5 w-48 sm:w-32 xl:w-48 rounded bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800"
						/>
						<!-- Artist skeleton -->
						<div
							class="skeleton h-4 w-32 rounded bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800"
						/>
						<!-- Status skeleton -->
						<div
							class="skeleton h-3 w-24 mt-1 rounded bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800"
						/>
					</div>
				</div>
			{/if}
		</div>
	</div>
  <div class="absolute bottom-6 right-6 group sm:hover:cursor-pointer">
    <div class="w-6 h-6 text-zinc-700 dark:text-zinc-400 sm:group-hover:text-[#1DB954]">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ><title>Spotify</title><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
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
