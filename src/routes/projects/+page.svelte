<script>
  import projects from '$lib/projects';

</script>

<div class="p-4 flex justify-between">
  {#each projects as project}
  <div>
    <img src={project.image} alt={project.title} class="w-96" />
    <p>{project.title}</p>
  </div>
  {/each}
</div>

