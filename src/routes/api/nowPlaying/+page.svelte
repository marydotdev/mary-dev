<script>
	export let data;
  // console.log(data);
	$: songInfo = data.body;
</script>

<p>{songInfo.title}</p>
<p>{songInfo.artist}</p>
