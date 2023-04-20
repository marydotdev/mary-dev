<script>
  // import Quadtree from '@timohausmann/quadtree-js';

import {
  createQtGrid,
  randomBias,
  random
} from '@georgedoescode/generative-utils';
  import { SVG } from '@svgdotjs/svg.js';
	import { onMount } from 'svelte';

  //let width;
  //let height;

  const width = 192;
  const height = 192;

  // function generatePoints() {
  //   const focus = {
  //       x: random(0, width),
  //       y: random(0, height)
  //     };

  //     const points = [...Array(100)].map(() => {
  //       return {
  //         x: randomBias(0, width, focus.x, 1),
  //         y: randomBias(0, height, focus.y, 1),
  //         width: 1,
  //         height: 1
  //       };
  //     });
  //   return points
  // }


  function handleClick() {
    console.log("click");
    svg.clear();
    generatePoints();
  }

  onMount(() => {
    // const width = 192;
    // const height = 192;

    const svg = SVG().viewbox(0, 0, width, height).addTo("#qt-grid");

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
        gap: 1,
        maxQtLevels: 6
      });

      grid.areas.forEach((area) => {
        svg
          .rect(area.width, area.height)
          .x(area.x)
          .y(area.y)
          .fill("currentColor")
          .stroke("blue");
      });
    }
		generateGrid();

	});


</script>

<svelte:window on:click={handleClick} />
<div id="qt-grid" class="absolute inset-0 -z-10 text-zinc-100 dark:text-zinc-900 overflow-hidden" />
