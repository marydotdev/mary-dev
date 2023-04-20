<script>
  import '../app.css';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import Quadtree from '$lib/Quadtree.svelte';

</script>

<Quadtree />
<div class="pattern h-full">
	<div class="w-full mx-auto max-w-lg px-4 pt-4 pb-12 flex items-center justify-between">
		<div class="w-fit">
			<a href="/" class="font-semibold text-lg">mary.dev</a>
		</div>
		<div class="w-fit">
      <ThemeToggle />
		</div>
	</div>
	<slot />
</div>

<style>
  /* .pattern {
		background-image: url('/brilliant.png');
	} */
</style>
