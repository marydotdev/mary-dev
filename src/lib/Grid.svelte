<script>
	import { cn } from '$lib/utils';
	import NowPlaying from '$lib/NowPlaying.svelte';
	import Mary3DViewer from './Mary3DViewer.svelte';
	import Nav from './Nav.svelte';
	import TopTracks from './TopTracks.svelte';
	import TopArtists from './TopArtists.svelte';
	import BskyPosts from './BskyPosts.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';

	export let greeting;
	export let today;
	export let time;
	export let mounted;
	export let Weather;

	let cells = [1, 2, 3, 4, 5];

	// Array of background color classes
	const bgColors = [
		'bg-zinc-100 dark:bg-zinc-900',
		"bg-blue-200",
		"bg-green-200 dark:bg-green-800",
    'bg-zinc-100 dark:bg-zinc-900',
		'bg-zinc-100 dark:bg-zinc-900',
	];
</script>

<div class="w-full h-full text-black dark:text-white">
	<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-2 h-full">
		{#each cells as item, i}
			<div
				class={cn(
					'p-1 rounded-lg',
					i == 1 && 'lg:col-span-2 lg:row-span-2',
					i == 4 && 'lg:col-start-4'
				)}
			>
				<div
					class={cn(
						'w-full h-full rounded-lg ',
						bgColors[i % bgColors.length]
					)}
				>
					{#if i === 0}
						<div class="w-full h-full">
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
						</div>
					{:else if i === 1}
						<div class="relative w-full h-full flex flex-col justify-center">
              <div class="px-4 absolute top-4 w-full">
                <div class="w-full bg-white hover:bg-neutral-50 relative transition-colors max-w-[600px] min-w-[300px] flex border rounded-xl">
                <a href="https://bsky.app/profile/did:plc:d23ep7mnuzjcl7me5c6f7syg/post/3lasgflwcnc2x?ref_src=embed&amp;ref_url=http%253A%252F%252Flocalhost%253A5173%252F" target="_blank" rel="noopener noreferrer nofollow" class="cursor-pointer ">
                </a>
                <div class="flex-1 px-4 pt-3 pb-2.5">
                <div class="flex-1 flex-col flex gap-2" lang="en">
                  <div class="flex gap-2.5 items-center cursor-pointer">
                    <a href="https://bsky.app/profile/did:plc:d23ep7mnuzjcl7me5c6f7syg?ref_src=embed&amp;ref_url=http%253A%252F%252Flocalhost%253A5173%252F" target="_blank" rel="noopener noreferrer nofollow" class="cursor-pointer rounded-full">
                      <div class="w-10 h-10 overflow-hidden rounded-full bg-neutral-300 shrink-0">
                        <img alt="Bluesky Avatar" src="https://cdn.bsky.app/img/avatar/plain/did:plc:d23ep7mnuzjcl7me5c6f7syg/bafkreiatnyzo4rcovxmbjylul3hztab4ceptn4srrpl6lc3756bymnyhri@jpeg">
                      </div>
                    </a>
                    <div>
                      <a href="https://bsky.app/profile/did:plc:d23ep7mnuzjcl7me5c6f7syg?ref_src=embed&amp;ref_url=http%253A%252F%252Flocalhost%253A5173%252F" target="_blank" rel="noopener noreferrer nofollow" class="cursor-pointer font-bold text-[17px] leading-5 line-clamp-1 hover:underline underline-offset-2 decoration-2"><p>mary</p></a><a href="https://bsky.app/profile/did:plc:d23ep7mnuzjcl7me5c6f7syg?ref_src=embed&amp;ref_url=http%253A%252F%252Flocalhost%253A5173%252F" target="_blank" rel="noopener noreferrer nofollow" class="cursor-pointer text-[15px] text-textLight hover:underline line-clamp-1"><p>@mary.dev</p></a>
                    </div>
                    <div class="flex-1"></div><a href="https://bsky.app/profile/did:plc:d23ep7mnuzjcl7me5c6f7syg/post/3lasgflwcnc2x?ref_src=embed&amp;ref_url=http%253A%252F%252Flocalhost%253A5173%252F" target="_blank" rel="noopener noreferrer nofollow" class="cursor-pointer transition-transform hover:scale-110 shrink-0 self-start">
                      <img alt="Bluesky Logo" src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%20320%20286'%3e%3cpath%20fill='rgb(10,122,255)'%20d='M69.364%2019.146c36.687%2027.806%2076.147%2084.186%2090.636%20114.439%2014.489-30.253%2053.948-86.633%2090.636-114.439C277.107-.917%20320-16.44%20320%2032.957c0%209.865-5.603%2082.875-8.889%2094.729-11.423%2041.208-53.045%2051.719-90.071%2045.357%2064.719%2011.12%2081.182%2047.953%2045.627%2084.785-80%2082.874-106.667-44.333-106.667-44.333s-26.667%20127.207-106.667%2044.333c-35.555-36.832-19.092-73.665%2045.627-84.785-37.026%206.362-78.648-4.149-90.071-45.357C5.603%20115.832%200%2042.822%200%2032.957%200-16.44%2042.893-.917%2069.364%2019.147Z'/%3e%3c/svg%3e" class="h-8">
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              </div>
						</div>
					{:else if i === 2}
						<div class="w-full h-full flex flex-col justify-between">
              <div class="w-full flex justify-end p-4">
                <a>about</a>
              </div>
              <NowPlaying />
						</div>
					{:else if i === 3}
						<div class="w-full">
              <TopTracks />
						</div>
					{:else if i === 4}
						<div class="w-full">
              <TopArtists />
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
