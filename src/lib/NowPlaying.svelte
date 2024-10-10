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
    isPlaying: boolean;
    trackType?: string;
    song?: Track;
    lastPlayedAt?: string;
    noRecentTracks?: boolean;
  }

  let currentTrack: NowPlayingData | null = null;
  let lastPlayedTrack: Track | null = null;
  let error: string | null = null;
  let timeSinceLastPlay: string = '';

  function formatTimeSince(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }

  function saveLastPlayedTrack(track: Track) {
    localStorage.setItem('lastPlayedTrack', JSON.stringify(track));
  }

  function loadLastPlayedTrack(): Track | null {
    const savedTrack = localStorage.getItem('lastPlayedTrack');
    return savedTrack ? JSON.parse(savedTrack) : null;
  }

  async function fetchNowPlaying() {
    try {
      const response = await fetch('/api/nowPlaying');
      const data: NowPlayingData = await response.json();

      if (response.ok) {
        console.log('Parsed API response:', data);

        if (data.isPlaying && data.song) {
          currentTrack = data;
          lastPlayedTrack = data.song;
          saveLastPlayedTrack(data.song);
        } else if (data.noRecentTracks) {
          lastPlayedTrack = loadLastPlayedTrack();
          currentTrack = lastPlayedTrack ? { ...data, song: lastPlayedTrack } : data;
        } else {
          currentTrack = data;
        }

        if (data.lastPlayedAt) {
          timeSinceLastPlay = formatTimeSince(data.lastPlayedAt);
        }
        error = null;
      } else {
        error = `Failed to fetch now playing data: ${response.status} ${response.statusText}`;
        console.error(error);
      }
    } catch (fetchError: unknown) {
      if (fetchError instanceof Error) {
        error = `Error fetching now playing data: ${fetchError.message}`;
      } else {
        error = 'An unknown error occurred while fetching now playing data';
      }
      console.error(error);
    }
  }

  onMount(() => {
    lastPlayedTrack = loadLastPlayedTrack();
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  });
</script>

<div class="w-full h-full flex items-center justify-center p-4">
  {#if currentTrack && (currentTrack.song || lastPlayedTrack)}
    <div class="flex flex-col items-center text-center">
      <img src={currentTrack.song?.albumImageUrl || lastPlayedTrack?.albumImageUrl} alt="Album Art" class="w-24 h-24 rounded-lg mb-2" />
      <p class="font-bold">{currentTrack.song?.title || lastPlayedTrack?.title}</p>
      <p class="text-sm">{currentTrack.song?.artist || lastPlayedTrack?.artist}</p>
      {#if !currentTrack.isPlaying && timeSinceLastPlay}
        <p class="text-xs text-gray-500 mt-2">Last played {timeSinceLastPlay}</p>
      {/if}
      {#if currentTrack.noRecentTracks}
        <p class="text-xs text-gray-500 mt-2">No current track playing</p>
      {/if}
    </div>
  {:else if currentTrack && currentTrack.noRecentTracks && !lastPlayedTrack}
    <p>No recent tracks played</p>
  {:else if error}
    <p class="text-red-500">{error}</p>
  {:else}
    <p>Loading...</p>
  {/if}
</div>
