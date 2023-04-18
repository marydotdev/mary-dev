<script lang="ts">
  // https://github.com/CaptainCodeman/sveltekit-dark-mode
	import { onMount } from 'svelte'

	// indicate if we're in dark mode or not
	let dark: boolean

	// hide the control until we've decided what the intial mode is
	let hidden = true

	onMount(() => {
		// use the existence of the dark class on the html element for the initial value
		dark = document.documentElement.classList.contains('dark')

		// show UI controls
		hidden = false

		// listen for changes so we auto-adjust based on system settings
		const matcher = window.matchMedia('(prefers-color-scheme: dark)')
		matcher.addEventListener('change', handleChange)
		return () => matcher.removeEventListener('change', handleChange)
	})

	function handleChange({ matches: dark }: MediaQueryListEvent) {
		// only set if we haven't overridden the theme
		if (!localStorage.theme) {
			setMode(dark)
		}
	}

	function toggle() {
		setMode(!dark)
	}

	function setMode(value: boolean) {
		dark = value

		// update page styling
		if (dark) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}

		// store the theme as a local override
		localStorage.theme = dark ? 'dark' : 'light'

		// if the toggled-to theme matches the system defined theme, clear the local override
		// this effectively provides a way to override or revert to "automatic" setting mode
		if (window.matchMedia(`(prefers-color-scheme: ${localStorage.theme})`).matches) {
			localStorage.removeItem('theme')
		}
	}
</script>

<svelte:head>
	<!-- set dark mode class based on user preference / device settings (in head to avoid FOUC) -->
	<script>
		if (localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	</script>
</svelte:head>


<button
	class="cursor-pointer"
	class:hidden
	on:click={toggle}
>
	<!-- moon icon -->
  <!-- <svg class:hidden={dark} width="48" height="48" viewBox="0 0 48 48" fill="currentColor" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4H28V8H24V12H20V8H12V4ZM8 12V8H12V12H8ZM8 32H4V12H8V32ZM12 36H8V32H12V36ZM16 40H12V36H16V40ZM36 40V44H16V40H36ZM40 36V40H36V36H40ZM36 28H40V36H44V20H40V24H36V28ZM24 28V32H36V28H24ZM20 24H24V28H20V24ZM20 24V12H16V24H20Z"

    />
  </svg> -->

  <svg class:hidden={dark} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>


	<!-- sun icon -->
	<!-- <svg class:hidden={!dark} width="48" height="48" viewBox="0 0 48 48" fill="currentColor" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2_2)">
      <path
        d="M26 0H22V8H26V0ZM0 22V26H8V22H0ZM48 22V26H40V22H48ZM26 48H22V40H26V48ZM16 12H32V16H16V12ZM12 16H16V32H12V16ZM16 36V32H32V36H16ZM36 32H32V16H36V32ZM40 4H44V8H40V4ZM40 8V12H36V8H40ZM44 44H40V40H44V44ZM40 40H36V36H40V40ZM8 4H4V8H8V12H12V8H8V4ZM4 44H8V40H12V36H8V40H4V44Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_2_2">
        <rect width="48" height="48"  />
      </clipPath>
    </defs>
  </svg> -->

  <svg class:hidden={!dark} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>

</button>

