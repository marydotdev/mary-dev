<script>
	import { onMount } from 'svelte';
	import createGlobe from 'cobe';

	/**
	 * @type {HTMLCanvasElement}
	 */
	let canvas;
	let phi = 0;

	onMount(() => {
		const globe = createGlobe(canvas, {
			devicePixelRatio: 2,
			width: 200 * 2,
			height: 200 * 2,
			phi: 0,
			theta: 0.1,
      opacity: 0.8,
			dark: 1,
			diffuse: 1,
			mapSamples: 10000,
			mapBrightness: 4,
			baseColor: [1, 1, 1],
      markerColor: [1, 1, 1],
      glowColor: [0.7, 0.7, 0.7],
			markers: [
				{ location: [41.2307, -73.064], size: 0.03 },
				{ location: [40.7062, -73.3062], size: 0.05 }
			],
			onRender: (state) => {
				state.phi = phi;
				phi += 0.005;
			}
		});
	});
</script>

<div class="-mt-4">
	<canvas bind:this={canvas} style="width: 200px; height: 200px" />
</div>
