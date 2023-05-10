<script>
  import '../app.css';
	import Quadtree from '$lib/Quadtree.svelte';
	import Nav from '$lib/Nav.svelte';
	import Footer from '$lib/Footer.svelte';

</script>

<!-- <Quadtree /> -->
<div class="w-full h-screen font-mono flex flex-col justify-between">
  <div class="">
    <Nav />
    <slot />
  </div>
  <Footer />
</div>

<style>
  .pattern {
		background-image: url('/otis-redding.png');
	}
</style>
