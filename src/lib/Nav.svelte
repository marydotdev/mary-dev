<script>
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';

	let showMenu = false;

	function toggleMenu() {
		showMenu = !showMenu;
	}
</script>
<nav class="z-10">
  <div class="w-full p-4 flex items-center justify-between">
    <div class="w-fit">
      <a href="/" class="font-space font-medium text-lg">mary.dev</a>
    </div>
    <div class="w-fit h-6">
      <!-- <ThemeToggle /> -->
      <ThemeSwitch />
      <!-- <div on:click={toggleMenu} class="w-8">
        {#if !showMenu}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {/if}
      </div> -->
    </div>
  </div>
  <!-- {#if showMenu}
	<div class="absolute right-0 flex flex-col border-2 border-green-500">
			<ul>
				<li>/home</li>
				<li>/about</li>
				<li>/projects</li>
				<li>/links</li>
			</ul>
	</div>
	{/if} -->
</nav>
