<script>
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import '../app.css';
</script>

<div
	class="w-full min-h-screen font-space p-6 lg:px-8 flex flex-col bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
>
	<div class="w-full mx-auto pb-12 flex max-w-7xl items-center justify-between">
		<div class="w-fit">
			<a href="/" class="font-semibold text-lg lg:text-2xl">mary.dev</a>
		</div>
		<div class="w-fit">
			<ThemeToggle />
		</div>
	</div>
	<slot />
</div>
