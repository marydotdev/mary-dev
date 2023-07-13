<script lang="ts">
	import Weather from '$lib/Weather.svelte';
	import WeatherArt from '$lib/WeatherArt.svelte';
	import Wizard from '$lib/Wizard.svelte';
	import { onMount } from 'svelte';

	export let data;

	let date = new Date();
	let mounted = false;

	$: songInfo = data.body;
	$: today = date.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	$: time = date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		second: 'numeric'
	});
	$: hours = date.getHours();

	$: greeting = hours < 12 ? 'Morning' : hours <= 16 && hours >= 12 ? 'Afternoon' : 'Evening';

	onMount(() => {
		mounted = true;
		const interval = setInterval(() => {
			date = new Date();
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<svelte:head>
	<title>mary.dev</title>
	<meta name="description" content="Mary Haedrich's Website" />

</svelte:head>


<div class="h-full flex flex-col">
	{#if mounted}
		<div class="m-4">
				<div class="">

          <div class="w-96 x">
            <h1 class="tracking-tighter text-2xl font-medium">
              <span>Good {greeting},</span>
              <br />
              <span>Visitor.</span>
            </h1>

            <h2 class="text-base">
              {today}
              <br />
              <span class="font-mono">{time}</span>
            </h2>
          </div>
        </div>

				<!-- <div class="w-full flex gap-4 text-sm sm:text-base x">
					<a href="mailto:hello@mary.dev" target="_blank" rel="noreferrer"> email </a>

					<a href="https://github.com/marydotdev" target="_blank" rel="noreferrer"> github </a>

					<a href="https://twitter.com/marydotdev" target="_blank" rel="noreferrer"> twitter </a>
				</div>

        <div class="flex gap-4 items-center text-sm font-mono italic x">
          <div class="min-w-max">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
              <path
                fill="#1ed760"
                d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
              />
              <path
                d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z"
              />
            </svg>
          </div>
          <div>
            {#if data.body.isPlaying && data.body.song}
              <a href={songInfo.songUrl} target="_blank" rel="noreferrer">{songInfo.title} <br /> {songInfo.artist}</a>
            {:else}
              <p>Currently offline</p>
            {/if}
          </div>
			  </div> -->
		</div>
	{/if}
</div>

<!-- <style>
  .x {
    border: 2px red solid;
  }
</style> -->
