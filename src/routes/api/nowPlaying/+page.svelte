<script>
	export let data;
  console.log(data);
	$: songInfo = data.body;
</script>
{#await data}
<pre>{songInfo}</pre>
{/await}
