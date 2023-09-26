<script>
  import { onMount } from 'svelte';
  let dark = false;


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  onMount(() => {
		// use the existence of the dark class on the html element for the initial value
		dark = document.documentElement.classList.contains('dark');


		// listen for changes so we auto-adjust based on system settings
		const matcher = window.matchMedia('(prefers-color-scheme: dark)');
		matcher.addEventListener('change', handleChange);
		return () => matcher.removeEventListener('change', handleChange);
	});

	function handleChange({ matches: dark }) {
		// only set if we haven't overridden the theme
		if (!localStorage.theme) {
			setMode(dark);
		}
	}

	function toggle() {
		setMode(!dark);
	}

	function setMode(value) {
		dark = value;

		// update page styling
		if (dark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		// store the theme as a local override
		localStorage.theme = dark ? 'dark' : 'light';

		// if the toggled-to theme matches the system defined theme, clear the local override
		// this effectively provides a way to override or revert to "automatic" setting mode
		if (window.matchMedia(`(prefers-color-scheme: ${localStorage.theme})`).matches) {
			localStorage.removeItem('theme');
		}
	}
</script>

<button
  class="{classNames(
    dark ? 'bg-black' : 'bg-zinc-100',
    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2'
  )}"
  on:click="{toggle}"
>
  <span class="sr-only">Use setting</span>
  <span
    class="{classNames(
      dark ? 'translate-x-5' : 'translate-x-0',
      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
    )}"
  >
    <span
      class="{classNames(
        dark ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
      )}"
      aria-hidden="true"
    >
      <svg class="h-4 w-4 text-zinc-600" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span
      class="{classNames(
        dark ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
      )}"
      aria-hidden="true"
    >
      <svg class="h-4 w-4 text-zinc-900" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
         />
      </svg>
    </span>
  </span>
</button>
