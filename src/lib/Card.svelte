<script>
  export let item

  let i;

	function mousemove(i, e) {
		// console.log(e)

		item.x = e.pageX - e.currentTarget.offsetLeft
		item.y = e.pageY - e.currentTarget.offsetTop
	}
</script>


<div
  class="article isolate cursor-pointer relative border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 overflow-clip hover:border-zinc-400 dark:hover:border-zinc-600"
  on:mousemove={e => mousemove(i, e)}
  bind:this={item.node} style="--x: {item.x}px; --y: {item.y}px">
	<div class="shadow z-20"/>
		<div class="content z-0">
      <slot />

		</div>
</div>

