<script lang="ts">
	import Book from '$lib/Book.svelte';
  import BskyPosts from '$lib/BskyPosts.svelte';
	import NowPlaying from '$lib/NowPlaying.svelte';
	import ThemeSwitch from '$lib/ThemeSwitch.svelte';
	import TopArtists from '$lib/TopArtists.svelte';
	import TopTracks from '$lib/TopTracks.svelte';
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
			const recentBooks = allBooks.slice(0, 8);
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
		// fetchTopTracks();

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

<div>
  <!-- Top Section - Greeting, Weather, Now Playing, Theme Switch -->
  <div class="grid grid-cols-12">
    <div class="col-span-12 sm:col-span-5 lg:col-span-5 xl:col-span-3 w-full h-fit mt-auto">
      <div class="flex w-full sm:hidden justify-end pr-6 pt-6 pb-2">
        {#if mounted}
          <ThemeSwitch />
        {/if}
      </div>
      <div class="w-full flex flex-col items-center justify-around h-full p-2 font-space rounded-xl">
        <div class="w-full flex flex-col items-center justify-between min-h-[240px] p-6 font-space border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
          {#if mounted}
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
          {:else}
            <div class="w-full h-full">
              <!-- Greeting text skeletons -->
              <div class="space-y-2">
                <div class="skeleton h-7 sm:h-8 w-48 rounded bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800" />
                <div class="skeleton h-7 sm:h-8 w-24 rounded bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800" />
              </div>

              <!-- Date/Time skeletons -->
              <div class="mt-4 space-y-1">
                <div class="skeleton h-5 sm:h-6 w-36 rounded bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800" />
                <div class="skeleton h-5 sm:h-6 w-24 rounded bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800" />
              </div>
            </div>

            <!-- Weather component skeleton -->
            <div class="w-full flex justify-end">
              <div class="skeleton w-24 h-24 rounded bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800" />
            </div>
          {/if}
        </div>
      </div>
    </div>


    <div class="hidden sm:block sm:col-span-2 lg:block lg:col-span-2 xl:col-span-6" />
    <div class="col-span-12 sm:col-span-5 lg:col-span-5 xl:col-span-3 flex flex-col">
       <div class="hidden w-full sm:flex justify-end pr-6 py-2">
        <ThemeSwitch />
       </div>
      <NowPlaying />
    </div>
  </div>

  <!-- Middle Section - Top Tracks, Top Artists, Bsky Posts, Recently Read -->
  <div class="grid grid-cols-1 sm:grid-cols-12 ">
    <!-- Top Tracks and Artists -->
    <div class="hidden lg:block sm:col-span-3">
      <TopTracks />
      <TopArtists />
    </div>
    <!-- Bsky Posts -->
    <div class="xl:-mt-[17rem] col-span-12 lg:col-span-6">
      <BskyPosts />
    </div>
    <!-- Recently Read -->
    <div class="hidden lg:block sm:col-span-3">
      <div class="p-2">
        <div class="relative w-full p-6 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
          <div class="pb-4">
            <h3 class="text-base font-medium xl:text-xl">
              <a href="/books" class="sm:hover:underline sm:underline-offset-8">Recently Read</a>
            </h3>
          </div>
          <div class="w-full min-h-[540px] xl:min-h-[620px]">
            <ul class="relative w-full grid grid-cols-2 justify-center place-content-around gap-4 xl:gap-6 overflow-hidden">
              {#each recentlyReadBooks as book}
                <li class="relative group mx-auto lg:h-32 xl:h-40">
                  <a href={`https://goodreads.com/${book.url}`} target="_blank" rel="noreferrer">
                    <img src={book.cover} alt={`${book.title} Cover`} class="w-full h-full rounded-sm group-hover:shadow-xl group-hover:transform group-hover:scale-[102%]" />
                  </a>
                </li>
                <!-- <Book {book} /> -->
              {/each}
            </ul>
          </div>

          <div class="absolute top-4 right-4 group hover:cursor-pointer">
            <div class="w-6 h-6 text-zinc-700 dark:text-zinc-400 group-hover:text-[#372213] dark:group-hover:text-[#ebe7d0]">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Goodreads</title><path d="M11.43 23.995c-3.608-.208-6.274-2.077-6.448-5.078.695.007 1.375-.013 2.07-.006.224 1.342 1.065 2.43 2.683 3.026 1.583.496 3.737.46 5.082-.174 1.351-.636 2.145-1.822 2.503-3.577.212-1.042.236-1.734.231-2.92l-.005-1.631h-.059c-1.245 2.564-3.315 3.53-5.59 3.475-5.74-.054-7.68-4.534-7.528-8.606.01-5.241 3.22-8.537 7.557-8.495 2.354-.14 4.605 1.362 5.554 3.37l.059.002.002-2.918 2.099.004-.002 15.717c-.193 7.04-4.376 7.89-8.209 7.811zm6.1-15.633c-.096-3.26-1.601-6.62-5.503-6.645-3.954-.017-5.625 3.592-5.604 6.85-.013 3.439 1.643 6.305 4.703 6.762 4.532.591 6.551-3.411 6.404-6.967z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<style>
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
