<script lang="ts">
	export let data;
  // console.log(data);

  let nowPlaying: any;
	$: songInfo = data.body;

  setInterval(() => {
    nowPlaying = songInfo
  }, 1000)
</script>

<p>{songInfo.title}</p>
<p>{songInfo.artist}</p>

<p>{nowPlaying.title}</p>
