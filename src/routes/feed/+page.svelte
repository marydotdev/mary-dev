<script>
	export let data;

	function formatTime(dateTime) {
		let time = new Date(dateTime).toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit'
		});

		return time;
	}

	function formatDate(dateTime) {
		let date = new Date(dateTime).toLocaleDateString('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});

		return date;
	}
</script>

<div class="max-w-lg w-full flex-shrink-0">
	<!-- <h3 class="pb-4 text-xl">Feed</h3> -->
	<div class="flex flex-col gap-4">
		{#each data.thoughts as thought}
			<a href={`/feed/${thought.id}`}>
				<div class="flex flex-col gap-4">
					<p class="text-lg">{thought.text}</p>
					{#if thought.mediaUrl}
						<div class="">
							<img
								src={thought.mediaUrl}
								alt="thought pic"
								class="object-cover h-96 w-full rounded-xl"
							/>
						</div>
					{/if}
					<div class="flex justify-between">
						<p>{formatTime(thought.created_at)}</p>
						<p>{formatDate(thought.created_at)}</p>
					</div>
				</div>
			</a>
			<hr class="border border-zinc-200 dark:border-zinc-600" />
		{/each}
	</div>
</div>
