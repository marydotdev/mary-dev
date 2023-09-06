<script lang="ts">
	import Weather from '$lib/Weather.svelte';
	import projects from '$lib/projects';
	import { onMount } from 'svelte';

	// export let data;

	let date = new Date();
	let mounted = false;

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

<div class="h-full">
	<div class="flex flex-col gap-12">
		{#if mounted}
			<div class="flex justify-between">
				<div class="w-96">
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
				<Weather />
			</div>
		{/if}

		<div class="w-96 ml-auto">
			<h3 class="tracking-tighter text-xl sm:text-2xl font-medium">
				My name is Mary Haedrich, I'm a web developer from NY.
			</h3>

			<div class="w-full flex gap-4 text-sm sm:text-base">
				<a href="mailto:hello@mary.dev" target="_blank" rel="noreferrer"> email </a>

				<a href="https://github.com/marydotdev" target="_blank" rel="noreferrer"> github </a>

				<a href="https://twitter.com/marydotdev" target="_blank" rel="noreferrer"> twitter </a>
			</div>
		</div>

		<div class="max-w-7xl mx-auto md:mr-auto flex flex-col">
      <h3 class="pb-4 text-xl">Recent Work</h3>
			<div class="flex flex-col md:flex-row justify-between w-fit md:w-full gap-4">
				{#each projects as project}
					<div class="">
            <a href={project.url} target="_blank" rel="noreferrer" class="block border-4 border-zinc-800 dark:border-zinc-100">
						  <img src={project.image} alt={project.title} class="w-96" />
					  </a>
          </div>
				{/each}
			</div>
		</div>
	</div>
</div>
