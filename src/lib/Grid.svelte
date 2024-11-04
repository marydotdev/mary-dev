<script>
  import { cn } from "$lib/utils";
  import NowPlaying from '$lib/NowPlaying.svelte';
	import Mary3DViewer from './Mary3DViewer.svelte';
	import Nav from './Nav.svelte';
  import TopTracks from './TopTracks.svelte';
	import TopArtists from './TopArtists.svelte';

  export let greeting;
  export let today;
  export let time;
  export let mounted;
  export let Weather;

  let cells = [1, 2, 3, 4, 5];

  // Array of background color classes
  const bgColors = [
    "bg-zinc-100 dark:bg-zinc-900",
    // "bg-red-200 dark:bg-red-800",
    // "bg-blue-200 dark:bg-blue-800",
    // "bg-yellow-200 dark:bg-yellow-800",
    // "bg-green-200 dark:bg-green-800",
    // "bg-purple-200 dark:bg-purple-800"
  ];
</script>

<div class='w-full h-full text-black dark:text-white'>
  <div class="grid md:grid-cols-4 gap-2 h-full">
    {#each cells as item, i}
      <div
        class={cn(
          "p-1 rounded-lg",
          i == 1 && "md:col-span-2 md:row-span-2",
          i == 4 && "md:col-start-4"
        )}
      >
        <div
          class={cn(
            "w-full h-full rounded-lg flex items-center justify-center",
            bgColors[i % bgColors.length]
          )}
        >
          {#if i === 0}
            {#if mounted}
              <div class="w-full flex flex-col items-center justify-around h-full p-4 font-space">
                <div class="w-full">
                  <h1 class="tracking-tighter text-xl sm:text-2xl font-medium">
                    <span>Good {greeting},</span>
                    <br />
                    <span>Visitor.</span>
                  </h1>

                  <h2 class="text-sm sm:text-base">
                    {today}
                    <br />
                    <span class="font-mono">{time}</span>
                  </h2>
                </div>

               <div class="w-full flex justify-end">
                 <svelte:component this={Weather} />
               </div>
              </div>
            {/if}
          {:else if i === 1}
            <div class="relative w-full h-full">
              <Mary3DViewer />
            </div>
          {:else if i === 2}
            <div class="w-full h-full">
              <Nav />
            </div>
          {:else if i === 3}
            <div class="w-full h-full">
              <!-- <NowPlaying /> -->
               <TopArtists />
            </div>
          {:else if i === 4}
            <div class="w-full h-full">
              <TopTracks />
            </div>
          {:else}
            <div class="relative w-full h-full">
              <Mary3DViewer />
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
