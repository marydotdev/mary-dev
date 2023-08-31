<script>
  export let data
</script>

<h2>Thoughts</h2>

{#each data.countries as country}
<p>{country.name}</p>
{/each}
