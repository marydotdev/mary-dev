<script>
  export let data

  	/**
	 * @param {string | number | Date} dateTime
	 */
	function formatTime(dateTime) {
		let time = new Date(dateTime).toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit'
		});

		return time;
	}

	/**
	 * @param {string | number | Date} dateTime
	 */
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


<div class="md:max-w-xl w-full mx-auto">
	<div class="pt-12 flex flex-col gap-4">
		{#each data.posts as post}
				<div class="flex flex-col gap-4">
					<p class="text-lg">{post.text}</p>
					<div class="flex justify-between">
						<p>{formatTime(post.date)}</p>
						<p>{formatDate(post.date)}</p>
					</div>
				</div>

			<hr class="border border-zinc-200 dark:border-zinc-600" />
		{/each}
	</div>
</div>
