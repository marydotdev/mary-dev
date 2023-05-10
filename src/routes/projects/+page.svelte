<script>
  export let data
  //console.log(data)

</script>

{#each data.repos as repo}
<p>{repo.name}</p>

{/each}

