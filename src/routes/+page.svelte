<script lang="ts">
	import Grid from '$lib/Grid.svelte';
	import Weather from '$lib/Weather.svelte';
	import { onMount } from 'svelte';

	let date = new Date();
	let mounted = false;
	let recentPosts: any[] = [];
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
	async function fetchPosts() {
		const response = await fetch('/api/getPosts');
		if (response.ok) {
			const allPosts = await response.json();
			recentPosts = allPosts.slice(0, 10);
		} else {
			console.error('Failed to fetch recently read books');
		}
	}

	// Function to save books to local storage
	function saveBooksToLocalStorage(books: any[]) {
		localStorage.setItem('recentlyReadBooks', JSON.stringify(books));
	}

	// Function to get books from local storage
	function getBooksFromLocalStorage(): any[] {
		const storedBooks = localStorage.getItem('recentlyReadBooks');
		return storedBooks ? JSON.parse(storedBooks) : [];
	}

	// Fetch recently read books
	async function fetchRecentlyReadBooks() {
		const response = await fetch('/api/read');
		if (response.ok) {
			const allBooks = await response.json();
			const recentBooks = allBooks.slice(0, 10);
			recentlyReadBooks = recentBooks;
			saveBooksToLocalStorage(recentBooks);
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

	function formatTime(dateTime: string | number | Date) {
		let time = new Date(dateTime).toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit'
		});

		return time;
	}

	function formatDate(dateTime: string | number | Date) {
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
		fetchPosts();
		fetchTopTracks();

		// Load books from local storage first
		recentlyReadBooks = getBooksFromLocalStorage();

		// Then fetch the latest data
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

<div class="p-2 sm:p-4 md:p-8 w-full">
	<div class="w-full h-[600px] lg:h-[800px]">
		<Grid {greeting} {today} {time} {mounted} {Weather} />
	</div>
	<div>
		<div class="w-full p-4 mt-2 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white">
			<div class="pb-4">
				<h3 class="text-lg sm:text-xl font-medium">
					<a href="/books" class="hover:underline underline-offset-8">Recently Read</a>
				</h3>
			</div>
			<div class="w-full marquee marquee--fit-content marquee--hover-pause">
				<ul class="marquee__content">
					{#each recentlyReadBooks as book}
						<li class="flex-shrink-0 relative group">
							<a href={`https://goodreads.com/${book.url}`} target="_blank" rel="noreferrer">
								<img src={book.cover} alt={`${book.title} Cover`} class="h-36 xl:h-48 mx-auto" />
								<div
									class="absolute inset-0 hover:bg-zinc-50/60 dark:hover:bg-zinc-900/80 hover:backdrop-blur-sm"
								>
									<div
										class="h-full p-1 flex flex-col justify-between invisible group-hover:visible"
									>
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
								<div
									class="absolute inset-0 hover:bg-zinc-50/60 dark:hover:bg-zinc-900/80 hover:backdrop-blur-sm"
								>
									<div
										class="h-full p-1 flex flex-col justify-between invisible group-hover:visible"
									>
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

	/* Mobile styles */
	@media (max-width: 768px) {
		.marquee {
			overflow-x: auto;
			overflow-y: hidden;
			white-space: nowrap;
			scrollbar-width: thin;
			scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
		}

		.marquee__content {
			animation-play-state: paused !important;
		}
	}
</style>
