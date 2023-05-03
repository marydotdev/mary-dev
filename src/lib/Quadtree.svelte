<script>
  import {
    createQtGrid,
    randomBias,
    random
  // @ts-ignore
  } from '@georgedoescode/generative-utils';
  import { SVG } from '@svgdotjs/svg.js';
	import { onMount } from 'svelte';

  const width = 192;
  const height = 192;
  /**
	 * @type {import("@svgdotjs/svg.js").Svg}
	 */
  let svg;

  onMount(() => {
    svg = SVG().viewbox(0, 0, width, height).addTo("#qt-grid");
		generateGrid();
	});

  function generateGrid() {
    const focus = {
      x: random(0, width),
      y: random(0, height)
    };

    const points = [...Array(100)].map(() => {
      return {
        x: randomBias(0, width, focus.x, 1),
        y: randomBias(0, height, focus.y, 1),
        width: 1,
        height: 1
      };
    });

    points.forEach((point) => {
      svg.circle(2).cx(point.x).cy(point.y).fill("none");
    });

    const grid = createQtGrid({
      width,
      height,
      points,
      gap: 0,
      maxQtLevels: 6
    });

    grid.areas.forEach((/** @type {{ width: number | undefined; height: number | undefined; x: import("@svgdotjs/svg.js").NumberAlias; y: import("@svgdotjs/svg.js").NumberAlias; }} */ area) => {
      svg
      .rect(area.width, area.height)
      .x(area.x)
      .y(area.y)
      .fill({ color: '#fff', opacity: 0})
      .stroke("currentColor")
      .attr({
            'stroke-width': 0.5,
            // 'stroke-dasharray': 2,
           });
    });
  }

  function handleClick() {
    svg.clear();
    generateGrid();
  }
</script>

<svelte:window on:click={handleClick} />

<div id="qt-grid" class="absolute inset-0 -z-10 text-zinc-200 dark:text-zinc-800 overflow-hidden" />

<!-- text-zinc-200 dark:text-zinc-800 -->
