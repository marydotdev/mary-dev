<script>
  import '../app.css';
	import ThemeToggle from '$lib/ThemeToggle.svelte';

</script>

<div
	class="p-6 lg:px-8"
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
