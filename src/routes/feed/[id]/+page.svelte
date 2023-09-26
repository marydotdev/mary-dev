<script>
	export let data;

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

<div class="md:max-w-md lg:max-w-lg w-full flex-shrink-0">
	<div class="flex flex-col gap-4">
		<div>
			<div class="flex flex-col gap-4">
				<p class="text-lg">{data.thought.text}</p>
				{#if data.thought.mediaUrl}
					<div class="">
						<img
							src={data.thought.mediaUrl}
							alt="thought pic"
							class="object-cover h-96 w-full rounded-xl"
						/>
					</div>
				{/if}
				<div class="flex justify-between">
					<p>{formatTime(data.thought.created_at)}</p>
					<p>{formatDate(data.thought.created_at)}</p>
				</div>
			</div>
		</div>
		<hr class="border border-zinc-200 dark:border-zinc-600" />
	</div>

	<div class="pt-4 flex justify-end">
		<a href="/feed" class="text-sm hover:underline underline-offset-8">Back to Feed</a>
	</div>
</div>
