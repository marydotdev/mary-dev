<script>
	export let data;
  console.log(data);
	$: songInfo = data.body;
</script>

<pre>{songInfo}</pre>
