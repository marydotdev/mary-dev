<script>
  import '../app.css';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import Noise from '$lib/Noise.svelte';

</script>
<Noise />
<div>
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


