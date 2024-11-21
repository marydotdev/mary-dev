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
		const interval = setInterval(fetchTrackData, 30000); // Update every 30 seconds
		return () => clearInterval(interval);
	});
</script>

<div class="flex justify-center items-center min-h-[240px]">
	<div class="w-full h-full flex justify-start items-center p-4">
		{#if trackData}
			{#if trackData.nowPlaying}
				<div class="w-fit flex flex-col md:flex-row gap-2">
					<div class="flex justify-center sm:justify-start items-end">
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
        <div class="w-fit flex flex-col md:flex-row gap-2">
					<div class="flex justify-center sm:justify-start items-end">
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
              <p class="text-zinc-500 text-xs mt-2">Last played {formatTimeSince(trackData.recentlyPlayed.playedAt)}</p>
            </div>
          </div>
			  </div>
			{:else}
				<p>No recent tracks played</p>
			{/if}
		{:else if error}
			<p class="text-red-500">{error}</p>
		{:else}
			<div class="w-full flex gap-2">
					<div class="w-24 flex items-end">
						<div
							class="skeleton skeleton-card"
						/>
					</div>
					<div class="w-48">
            <div class="skeleton skeleton-card" />
          </div>
			  </div>
		{/if}
	</div>
</div>

<style>
	/* Skeleton styles */
	.skeleton {
		background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}

	.skeleton-card {
		width: 100%;
    height: 6rem;
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
