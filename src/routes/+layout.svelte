<script>
	// @ts-nocheck

	import '../app.css';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
</script>

<div class="relative h-screen bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
	<div class="w-full flex justify-end">
		<ThemeToggle />
	</div>
	<slot />
</div>
