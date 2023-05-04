<script>
	export let switchInput = {
		motorType: 'Brushed',
		operatingTemperature: 'Commercial'
	};

	let motorType = false; // false = 'Brushed', true = 'Brushless'
	let operatingTemperature = false; // false = 'Commercial', true = 'Industrial'
</script>

<div class="w-full h-full flex flex-row justify-between items-start gap-3 p-2">
	<div class="flex flex-col border-gray-300">
		<span class="font-regular text-sm text-gray-800">Motor Type</span>
		<div class="mt-1 flex items-center">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="w-fit h-fit"
				on:click={() => {
					motorType = !motorType;
				}}
				on:click={() => {
					motorType ? (switchInput.motorType = 'Brushed') : (switchInput.motorType = 'Brushless');
				}}>
				{#if motorType}
					<button
						type="button"
						class="bg-gray-200 relative inline-flex h-10 w-32 flex-shrink-0 cursor-pointer rounded-sm border-4 border-transparent"
						role="switch"
						aria-checked="false">
						<div
							class="translate-x-0 pointer-events-none relative inline-block h-8 w-16 transform rounded-sm bg-white shadow-inner">
							<span
								class="absolute inset-0 flex h-full w-full items-center justify-center text-xs tracking-tight font-medium"
								aria-hidden="true">
								Brushed
							</span>
						</div>
					</button>
				{:else}
					<button
						type="button"
						class="bg-gray-200 relative inline-flex h-10 w-32 flex-shrink-0 cursor-pointer rounded-sm border-4 border-transparent"
						role="switch"
						aria-checked="false">
						<div
							class="translate-x-14 pointer-events-none relative inline-block h-8 w-16 transform rounded-sm bg-white shadow-inner">
							<span
								class="absolute inset-0 flex h-full w-full items-center justify-center text-xs tracking-tight font-medium"
								aria-hidden="true">
								Brushless
							</span>
						</div>
					</button>
				{/if}
			</div>
		</div>
	</div>

	<div class="flex flex-col">
		<span class="font-regular text-sm text-gray-800">Temperature</span>
		<div class="mt-1 flex items-center">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="w-fit h-fit"
				on:click={() => {
					operatingTemperature = !operatingTemperature;
				}}
				on:click={() => {
					operatingTemperature
						? (switchInput.operatingTemperature = 'Commercial')
						: (switchInput.operatingTemperature = 'Industrial');
				}}>
				{#if operatingTemperature}
					<button
						type="button"
						class="bg-gray-200 relative inline-flex h-10 w-32 flex-shrink-0 cursor-pointer rounded-sm border-4 border-transparent"
						role="switch"
						aria-checked="false">
						<div
							class="translate-x-0 pointer-events-none relative inline-block h-8 w-16 transform rounded-sm bg-white shadow-inner">
							<span
								class="absolute inset-0 flex h-full w-full items-center justify-center text-xs tracking-tight font-medium"
								aria-hidden="true">
								Standard
							</span>
						</div>
					</button>
				{:else}
					<button
						type="button"
						class="bg-gray-200 relative inline-flex h-10 w-32 flex-shrink-0 cursor-pointer rounded-sm border-4 border-transparent"
						role="switch"
						aria-checked="false">
						<div
							class="translate-x-14 pointer-events-none relative inline-block h-8 w-16 transform rounded-sm bg-white shadow-inner">
							<span
								class="absolute inset-0 flex h-full w-full items-center justify-center text-xs tracking-tight font-medium"
								aria-hidden="true">
								Industrial
							</span>
						</div>
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
