<script lang="ts">
  import Weather from '$lib/Weather.svelte';
	import projects from '$lib/projects';
	import { onMount } from 'svelte';

	export let data;

	let date = new Date();
	let mounted = false;
  let recentlyReadBooks = [];

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
      recentlyReadBooks = allBooks.slice(0, 10); // Get the last 5 books
    } else {
      console.error('Failed to fetch recently read books');
    }
  }

  function formatTime(dateTime) {
    let time = new Date(dateTime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });

    return time
  }

  function formatDate(dateTime) {
    let date = new Date(dateTime).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return date
  }

	onMount(() => {
		mounted = true;
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
	<div class="flex flex-col gap-12">
		{#if mounted}
			<div class="flex justify-between">
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

		<!-- <div class="w-96 ml-auto">
			<h3 class="tracking-tighter text-xl sm:text-2xl font-medium">
				My name is Mary Haedrich, I'm a web developer from NY.
			</h3>

			<div class="w-full flex gap-4 text-sm sm:text-base">
				<a href="mailto:hello@mary.dev" target="_blank" rel="noreferrer"> email </a>

				<a href="https://github.com/marydotdev" target="_blank" rel="noreferrer"> github </a>

				<a href="https://twitter.com/marydotdev" target="_blank" rel="noreferrer"> twitter </a>
			</div>
		</div> -->
    <div class="flex flex-col gap-8 md:flex-row md:gap-4">
      <div class="md:max-w-lg w-full flex-shrink-0">
        <a href="/feed"><h3 class="pb-4 text-xl">Feed</h3></a>
        <div class="flex flex-col gap-4">
          {#each data.thoughts as thought}
            <div class="border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
              <div class="p-4 flex flex-col gap-4">
                <p class="text-lg">{thought.text}</p>
                {#if (thought.mediaUrl)}
                  <div class="">
                    <img src={thought.mediaUrl} alt="thought pic" class="object-cover h-96 w-full rounded-xl" />
                  </div>
                {/if}
                <div class="flex justify-between">
                  <p>{formatTime(thought.created_at)}</p>
                  <p>{formatDate(thought.created_at)}</p>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
      <div class="w-full flex flex-col">
        <h3 class="pb-4 text-xl">Recent Work</h3>
        <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 w-full gap-4">
          {#each projects as project}
            <div class="border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
              <a href={project.url} target="_blank" rel="noreferrer" class="block">
                <img src={project.image} alt={project.title} class="object-cover" />
              </a>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col">
    <a href="/books" class="pb-4 text-xl">Recently Read</a>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-4">
      {#each recentlyReadBooks as book}
        <a href={`https://goodreads.com/${book.url}`} target="_blank" rel="noreferrer">
          <div class="border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
            <div class="flex gap-2 border">
              <img src={book.cover} alt={`${book.title} Cover`} class="h-36" />
              <div class="w-full flex flex-col justify-between p-4">
                <div class="space-y-1">
                  <p class="clamp">{book.title}</p>
                  <p class="text-sm">{book.author}</p>
                </div>
                <p class="w-full text-sm text-right">Read {book.dateRead}</p>
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
	</div>
</div>

<style>
  .clamp {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

</style>
