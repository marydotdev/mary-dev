<script>
  import '../app.css';
	import Nav from '$lib/Nav.svelte';
	import Footer from '$lib/Footer.svelte';

</script>

<div class="w-full h-screen font-mono flex flex-col justify-between">
  <Nav />
  <div class="h-full overflow-auto scroll">
    <slot />
  </div>
  <Footer />
</div>

<style>
  /* .pattern {
		background-image: url('/otis-redding.png');
	}*/
  
  .scroll::-webkit-scrollbar-track
  {
    background-color: #fafafa;
  }

  .scroll::-webkit-scrollbar
  {
    width: 10px;
    background-color: #fafafa;
  }

  .scroll::-webkit-scrollbar-thumb
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #18181b;
  }
</style>
