<script>
	import '../app.css';
	import Nav from '$lib/Nav.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<div class="w-full max-w-[2000px] mx-auto min-h-screen flex flex-col justify-center">
	<!-- <div class="fixed inset-0 flex justify-center">
		<div class="flex w-full max-w-7xl lg:px-8">
			<div class="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
		</div>
	</div>
	<div
		class="isolate lg:px-8 max-w-6xl mx-auto min-h-screen flex flex-col justify-between text-zinc-900 dark:text-zinc-50"
	>
		<Nav />
		<div class="h-full overflow-x-hidden scroll flex-grow p-4">
			<slot />
		</div>
		<Footer />
	</div> -->
  <slot />
</div>

<style>

	.scroll::-webkit-scrollbar-track {
		background-color: #fafafa;
	}

	.scroll::-webkit-scrollbar {
		width: 10px;
		background-color: #fafafa;
	}

	.scroll::-webkit-scrollbar-thumb {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: #18181b;
	}
</style>
