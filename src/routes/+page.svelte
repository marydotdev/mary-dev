<script lang="ts">
	import Weather from '$lib/Weather.svelte';
	import { onMount } from 'svelte';

	export let data;

	let date = new Date();
	let mounted = false;
	let recentlyReadBooks: any[] = [];
	let topTracks: any[] = [];
	let topArtists: any[] = [];

	// $: songInfo = data.body;
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

	// Fetch recently read books
	async function fetchRecentlyReadBooks() {
		const response = await fetch('/api/read');
		if (response.ok) {
			const allBooks = await response.json();
			recentlyReadBooks = allBooks.slice(0, 10);
		} else {
			console.error('Failed to fetch recently read books');
		}
	}

	// Fetch top tracks
	async function fetchTopTracks() {
		const response = await fetch('/api/topTracks');
		if (response.ok) {
			const data = await response.json();
			topTracks = data.items.slice(0, 10);
		} else {
			console.error('Failed to fetch top tracks');
		}
	}

	// Fetch top artists
	async function fetchTopArtists() {
		const response = await fetch('/api/topArtists');
		if (response.ok) {
			const data = await response.json();
			topArtists = data.items.slice(0, 10);
			console.log(topArtists);
		} else {
			console.error('Failed to fetch top tracks');
		}
	}

	function formatTime(dateTime) {
		let time = new Date(dateTime).toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit'
		});

		return time;
	}

	function formatDate(dateTime) {
		let date = new Date(dateTime).toLocaleDateString('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});

		return date;
	}

	onMount(() => {
		mounted = true;
		fetchTopTracks();
		fetchRecentlyReadBooks();
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

<div class="h-full">
	<div class="flex flex-col gap-4">
		{#if mounted}
			<div class="flex justify-between font-space">
				<div class="w-72">
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
				<div class="flex justify-end">
					<Weather />
				</div>
			</div>
		{/if}

		<div class="flex flex-col gap-8 md:flex-row md:justify-between md:gap-4">
			<div class="py-4 md:max-w-xl w-full">
				<div class="pb-4">
					<h3 class="text-lg sm:text-xl font-medium"><a href="/feed" class="hover:underline underline-offset-8">Feed</a></h3>
				</div>
				<div class="flex flex-col gap-4">
					{#each data.thoughts as thought}
						<a href={`/feed/${thought.id}`}>
							<div class="flex flex-col gap-4">
								<p class="text-lg clamp-3">{thought.text}</p>
								{#if thought.mediaUrl}
									<div class="">
										<img
											src={thought.mediaUrl}
											alt="thought pic"
											class="object-cover h-96 w-full rounded-xl"
										/>
									</div>
								{/if}
								<div class="flex justify-between">
									<p>{formatTime(thought.created_at)}</p>
									<p>{formatDate(thought.created_at)}</p>
								</div>
							</div>
						</a>
						<hr class="border border-zinc-200 dark:border-zinc-600" />
					{/each}
				</div>
				<div class="pt-4 flex justify-end">
					<a href="/feed" class="text-base hover:underline underline-offset-8">Read More &rarr;</a>
				</div>
			</div>

			<div
				class="p-4 flex-shrink-0 md:max-w-xs lg:max-w-sm w-full bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50 rounded-xl shadow-inner">
				<div class="pb-4">
					<h3 class="text-lg sm:text-xl font-medium"><a href="/top#tracks" class="hover:underline underline-offset-8">Top Tracks</a></h3>
				</div>
				<ol class="flex flex-col gap-4">
					{#await topTracks}
						<p>loading</p>
					{:then}
						{#each topTracks as track}
							<li>
								<a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
									<div>
										<div class="space-y-1">
											<p class="clamp">{track.name}</p>
											<p class="text-sm">{track.artists[0].name}</p>
										</div>
									</div>
								</a>
							</li>
							<hr class="last:hidden border border-zinc-200 dark:border-zinc-600" />
						{/each}
					{/await}
				</ol>
			</div>
		</div>

		<div class="w-full">
			<div class="pb-4">
				<h3 class="text-lg sm:text-xl font-medium"><a href="/books" class="hover:underline underline-offset-8">Recently Read</a></h3>
			</div>
			<div class="w-full marquee marquee--fit-content marquee--hover-pause">
				<ul class="marquee__content">
					{#each recentlyReadBooks as book}
						<li class="flex-shrink-0 relative group">
							<a href={`https://goodreads.com/${book.url}`} target="_blank" rel="noreferrer">
								<img src={book.cover} alt={`${book.title} Cover`} class="h-36 xl:h-48 mx-auto" />
								<div class="absolute inset-0 hover:bg-zinc-50/60 dark:hover:bg-zinc-900/80  hover:backdrop-blur-sm">
									<div class="h-full p-1 flex flex-col justify-between invisible group-hover:visible">
										<div>
                      <p class="clamp text-sm">{book.title}</p>
										  <p class="text-sm">{book.author}</p>
                    </div>
                    <p class="w-full text-xs">Read {book.dateRead}</p>
									</div>
								</div>
							</a>
						</li>
					{/each}
				</ul>
				<ul class="marquee__content">
					{#each recentlyReadBooks as book}
						<li class="flex-shrink-0 relative group">
							<a href={`https://goodreads.com/${book.url}`} target="_blank" rel="noreferrer">
								<img src={book.cover} alt={`${book.title} Cover`} class="h-36 xl:h-48 mx-auto" />
								<div class="absolute inset-0 hover:bg-zinc-50/60 dark:hover:bg-zinc-900/80 hover:backdrop-blur-sm">
									<div class="h-full p-1 flex flex-col justify-between invisible group-hover:visible">
										<div>
                      <p class="clamp text-sm">{book.title}</p>
										  <p class="text-sm">{book.author}</p>
                    </div>
                    <p class="w-full text-xs">Read {book.dateRead}</p>
									</div>
								</div>
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="pt-4">
				<a href="/books" class="text-md hover:underline underline-offset-8">View Bookshelf &rarr;</a
				>
			</div>
		</div>
	</div>
</div>

<style>
	/* Marquee styles */
	.marquee {
		--gap: 2rem;
		position: relative;
		display: flex;
		overflow: hidden;
		user-select: none;
		gap: var(--gap);
		width: 100vw;
	}

	.marquee__content {
		flex-shrink: 0;
		display: flex;
		justify-content: space-around;
		gap: var(--gap);
		min-width: 100%;
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}

	/* Pause animation when reduced-motion is set */
	@media (prefers-reduced-motion: reduce) {
		.marquee__content {
			animation-play-state: paused !important;
		}
	}

	/* Enable animation */
	.marquee__content {
		animation: scroll 100s linear infinite;
	}

	/* Pause on hover */
	.marquee--hover-pause:hover .marquee__content {
		animation-play-state: paused;
	}

	/* Attempt to size parent based on content. Keep in mind that the parent width is equal to both content containers that stretch to fill the parent. */
	.marquee--fit-content {
		max-width: fit-content;
	}

	@keyframes scroll-abs {
		from {
			transform: translateX(calc(100% + var(--gap)));
		}
		to {
			transform: translateX(0);
		}
	}
</style>
