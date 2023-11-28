<script>
	import { page } from '$app/stores';
	import ThemeSwitch from './ThemeSwitch.svelte';

  const navLinks = [
		{ href: '/posts', label: 'Posts' },
		{ href: '/about', label: 'About' },
		{ href: '/', label: 'Dashboard' },
		{ href: '/books', label: 'Books' },
		{ href: '/music', label: 'Music' }
	];

	/**
	 * @type {string}
	 */
	$: currentUrl = $page.url.pathname;

</script>
<nav class="z-10">
  <div class="hidden md:block sticky inset-0 top-6 max-w-sm mx-auto">
    <ul class="w-full flex justify-between rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
      {#each navLinks as nav}
      <li class="relative">
        <a href={nav.href} class="block px-3 py-2 {currentUrl === nav.href ? 'text-sky-500 dark:text-sky-400' : 'hover:text-sky-500 dark:hover:text-sky-400'}">
          {nav.label}
          <span class="{currentUrl === nav.href ? 'absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-sky-500/0 via-sky-500/40 to-sky-500/0 dark:from-sky-400/0 dark:via-sky-400/40 dark:to-sky-400/0' : ''}" />
        </a>
      </li>
      {/each}
    </ul>
  </div>
  <div class="w-full p-4 flex items-center justify-between">
    <div class="w-fit">
      <a href="/" class="font-space font-medium text-lg">mary.dev</a>
    </div>
    <div class="w-fit h-6">
      <ThemeSwitch />
    </div>
  </div>
</nav>
