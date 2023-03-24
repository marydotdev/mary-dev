<script lang="ts">
	import { onMount } from 'svelte';

	let date = new Date();

	$: today = date.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	$: time = date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit'
	});
	$: hours = date.getHours();

	$: greeting = hours < 12 ? 'Morning' : hours <= 16 && hours >= 12 ? 'Afternoon' : 'Evening';

	onMount(() => {
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
	<div class="mx-auto max-w-2xl py-32 px-4">
		<div class="font-space">
			<h1 class="text-3xl font-bold">
				Good {greeting},
				<br />
				Visitor.
			</h1>

			<h2 class="pt-4">{today}<br />{time}</h2>

			<div class="pt-8 w-full flex gap-4">
        <a href="mailto:hello@mary.dev" target="_blank">
          email
        </a>

        <a href="https://github.com/marydotdev" target="_blank">
          github
        </a>

        <a href="https://twitter.com/marydotdev" target="_blank">
          twitter
        </a>
      </div>
		</div>
	</div>
</div>
