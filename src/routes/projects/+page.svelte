<script>
	import projects from '$lib/projects';
</script>

<div class="w-full flex flex-col gap-4">
	<div class="pb-4 space-y-1">
		<h3 class="text-lg sm:text-xl font-medium">Projects</h3>
		<p class="text-sm pb-4">Stuff I work on for fun!</p>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full gap-4">
		{#each projects as project}
			<div>
				<img src={project.image} alt={project.title} class="w-96" />
				<div class="flex justify-between">
					<a href={project.url} target="_blank" rel="noreferrer" class="block">Live Demo</a>
					{#if project.github}
						<a href={project.github} target="_blank" rel="noreferrer" class="block">source</a>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
