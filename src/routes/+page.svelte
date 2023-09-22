<script lang="ts">
  import Card from '$lib/Card.svelte';
  import Weather from '$lib/Weather.svelte';
	import projects from '$lib/projects';
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
      console.log(topArtists)
    } else {
      console.error('Failed to fetch top tracks');
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
    fetchTopTracks();
    fetchTopArtists();
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
        <div class="pb-4">
          <a href="/feed" class="text-xl hover:underline underline-offset-8">Feed</a>
        </div>
        <div class="flex flex-col gap-4">
          {#each data.thoughts as thought}
            <Card item={thought}>
            <a href={`/feed/${thought.id}`}>
              <div class="p-4 flex flex-col gap-4">
                <p class="text-lg clamp-3">{thought.text}</p>
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
            </a>
            </Card>
          {/each}
          <div class="flex justify-end">
            <a href='/feed' class="text-md hover:underline underline-offset-8">Read More &rarr;</a>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col">
        <h3 class="pb-4 text-xl">Recent Work</h3>
        <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 w-full gap-4">
          {#each projects as project}
          <Card item={project}>
            <div>
              <a href={project.url} target="_blank" rel="noreferrer" class="block">
                <img src={project.image} alt={project.title} class="object-cover" />
              </a>
            </div>
          </Card>
          {/each}
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col">
      <div class="pb-4">
        <a href="/books" class="text-xl hover:underline underline-offset-8">Recently Read</a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-4">
        {#each recentlyReadBooks as book}
          <Card item={book}>
          <a href={`https://goodreads.com/${book.url}`} target="_blank" rel="noreferrer">
            <div>
              <div class="flex gap-2">
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
          </Card>
        {/each}
      </div>
      <div class="pt-4">
          <a href='/books' class="text-md hover:underline underline-offset-8">View Bookshelf &rarr;</a>
        </div>
    </div>

    <div class="w-full flex flex-col md:flex-row justify-between gap-8 md:gap-4">
      <div class="w-full md:w-1/2">
        <div class="pb-4">
          <a href="/top#tracks" class="text-xl hover:underline underline-offset-8">Top Tracks</a>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-2 w-full gap-4">
          {#await topTracks}
          <p>loading</p>
          {:then}
            {#each topTracks as track}
            <a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
              <Card item={track}>
                <div>
                  <div class="flex gap-2">
                    <img src={track.album.images[1].url} alt={`${track.album.name} Cover`} class="h-36" />
                    <div class="w-full p-4">
                      <div class="space-y-1">
                        <p class="clamp">{track.name}</p>
                        <p class="text-sm">{track.artists[0].name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </a>
            {/each}
            <div class="flex flex-col justify-center">
              <a href='/top#tracks' class="text-md hover:underline underline-offset-8">More Tracks &rarr;</a>
            </div>
          {/await}
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <div class="pb-4">
          <a href="/top#artists" class="text-xl hover:underline underline-offset-8">Top Artists</a>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-2 w-full gap-4">
          {#await topArtists}
            <p>loading</p>
          {:then}
            {#each topArtists as artist}
              <a href={artist.external_urls.spotify} target="_blank" rel="noreferrer">
                <Card item={artist}>
                  <div>
                    <div class="flex gap-2">
                      <img src={artist.images[1].url} alt={`${artist.name}`} class="h-36 aspect-square" />
                      <div class="w-full p-4">
                        <div class="h-full flex flex-col justify-between">
                          <p class="clamp">{artist.name}</p>
                          <p class="clamp">
                            {#each artist.genres as genre, i}
                            <span>
                              {genre}{i < artist.genres.length - 1 ? ', ' : ''}
                            </span>
                            {/each}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </a>
              {/each}
              <div class="flex flex-col justify-center">
                <a href='/top#artists' class="text-md hover:underline underline-offset-8">More artists &rarr;</a>
              </div>
           {/await}
        </div>
      </div>
    </div>
	</div>
</div>
