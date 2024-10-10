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

<div class="w-full h-full flex items-center justify-center p-4">
  {#if trackData}
    {#if trackData.nowPlaying}
      <div class="flex flex-col items-center text-center">
        <img src={trackData.nowPlaying.song.albumImageUrl} alt="Album Art" class="w-24 h-24 rounded-lg mb-2" />
        <p class="font-bold">{trackData.nowPlaying.song.title}</p>
        <p class="text-sm">{trackData.nowPlaying.song.artist}</p>
        <p class="text-xs text-green-500 mt-2">Now Playing</p>
      </div>
    {:else if trackData.recentlyPlayed}
      <div class="flex flex-col items-center text-center">
        <img src={trackData.recentlyPlayed.song.albumImageUrl} alt="Album Art" class="w-24 h-24 rounded-lg mb-2" />
        <p class="font-bold">{trackData.recentlyPlayed.song.title}</p>
        <p class="text-sm">{trackData.recentlyPlayed.song.artist}</p>
        <p class="text-xs text-gray-500 mt-2">Last played {formatTimeSince(trackData.recentlyPlayed.playedAt)}</p>
      </div>
    {:else}
      <p>No recent tracks played</p>
    {/if}
  {:else if error}
    <p class="text-red-500">{error}</p>
  {:else}
    <p>Loading...</p>
  {/if}
</div>
