<script>
	// @ts-nocheck

	import { applyAction, enhance } from '$app/forms';
	import Gauge from '$lib/Gauge.svelte';
	import Radio from '$lib/Radio.svelte';
	import Switch from '$lib/Switch.svelte';

	export let form;

	let r = {
		formFactor: '3U',
		commutation: 'Hall',
		communicationInterface: 'VME',
		channels: '1'
	};

	let s = {
		motorType: 'Brushless',
		operatingTemperature: 'Industrial'
	};

	let g = {
		inputVoltage: 5,
		current: 0,
		power: 0
	};

	let suggested = {
		title: '68PW1',
		img: '/img/68PW1.webp',
		description: '3U OpenVPX PWM Servo Motor Drive',
		url: 'Model/68PW1'
	};

	$: specs = {
		formFactor: r.formFactor,
		commutation: r.commutation,
		communicationInterface: r.communicationInterface,
		channels: r.channels,
		motorType: s.motorType,
		operatingTemperature: s.operatingTemperature,
		inputVoltage: g.inputVoltage,
		current: g.current,
		power: g.power
	};
</script>

<div class="max-w-lg sm:max-w-3xl lg:max-w-6xl mx-auto px-4 py-12 dark:text-gray-600">
	<h2 class="text-2xl font-semibold dark:text-gray-800">Servo Motor Drive Configurator</h2>
	<p class="text-sm text-gray-500 dark:text-gray-500">
		Customize voltage requirements, power levels, form factor, and more.
	</p>

	<div class="flex flex-col lg:flex-row justify-between">
		<div class="max-w-3xl w-full flex flex-col">
			<div class="w-full">
				<div
					class="max-w-md mx-auto sm:max-w-none w-full sm:h-96 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center"
				>
					<div class="flex-shrink-0 h-full space-y-2">
						<Radio bind:radioInput={r} bind:suggestedFormFactor={suggested} />
						<Switch bind:switchInput={s} />
					</div>
					<div class="w-full h-full">
						<div class="relative w-full h-full flex flex-col justify-center overflow-hidden">
							{#if suggested.img}
								<div class="group relative h-full flex flex-col justify-center">
									<div
										class="w-full overflow-hidden rounded-md flex flex-col items-center justify-center"
									>
										<img
											src={suggested.img}
											alt={suggested.title}
											class="h-48 object-cover object-center"
										/>
									</div>
								</div>
							{:else}
								<div class="group relative h-full flex flex-col justify-center">
									<div
										class="w-full overflow-hidden rounded-md flex flex-col items-center justify-center"
									>
										<img
											src={suggested.img}
											alt={suggested.title}
											class="h-48 object-cover object-center"
										/>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
				<div
					class="max-w-md mx-auto sm:max-w-none flex flex-col sm:flex-row sm:justify-between sm:items-center"
				>
					<Gauge bind:gaugeInput={g} />
				</div>
			</div>
		</div>

		<div
			class="max-w-none mx-auto lg:max-w-sm w-full flex flex-col justify-between p-4 bg-gray-50 rounded-sm"
		>
			<div class="relative max-w-sm mx-auto w-full h-full flex flex-col justify-between">
				<div class="w-full">
					<p class="text-xl font-medium pb-2">Your Specifications</p>
					<ul class="h-full space-y-1 text-md">
						<li class="flex justify-between">
							<p class="text-gray-600">Commutation Type</p>
							<p>{r.commutation}</p>
						</li>
						<li class="flex justify-between">
							<p class="text-gray-600">Communication Interface</p>
							<p>{r.communicationInterface}</p>
						</li>
						<li class="flex justify-between">
							<p class="text-gray-600">Number of Channels</p>
							<p>{r.channels}</p>
						</li>
						<li class="flex justify-between">
							<p class="text-gray-600">Motor Type</p>
							<p>{s.motorType}</p>
						</li>
						<li class="flex justify-between">
							<p class="text-gray-600">Operating Temperature</p>
							<p>{s.operatingTemperature}</p>
						</li>
						<li class="flex justify-between">
							<p class="text-gray-600">Input Voltage</p>
							<p>{g.inputVoltage}</p>
						</li>
						<li class="flex justify-between">
							<p class="text-gray-600">Current</p>
							<p>{g.current}</p>
						</li>
						<li class="flex justify-between">
							<p class="text-gray-600">Power</p>
							<p>{g.power}</p>
						</li>
					</ul>
				</div>

				<div class="w-full">
					<div class="mt-4 text-md text-gray-700">
						<p class="pb-2">Recommended Product</p>
						<a href={`https://naii.com/${suggested.url}`} target="_blank" rel="noopener noreferrer">
							<div class="w-full flex justify-between items-center bg-white p-1">
								<div class="flex-shrink-0 flex justify-center w-20 h-full">
									<img
										src={suggested.img}
										alt={suggested.title}
										class="h-12 object-cover object-center"
									/>
								</div>
								<div class="flex flex-col">
									<div class="w-full flex justify-between items-center">
										<p class="text-md font-semibold">{suggested.title}</p>
										<i class="fa-solid fa-xs fa-arrow-up-right-from-square" />
									</div>
									<p>{suggested.description}</p>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>

			<div class="w-full max-w-sm mx-auto">
				<div class="pt-4">
					<p class="text-gray-700">Interested in learning more?</p>
				</div>

				<form
					method="POST"
					action="?/submit"
					class="mt-4"
					use:enhance={({ form, data }) => {
						console.log('email:', data.get('email'));
						console.log(data.get('specs'));

						return async ({ result }) => {
							if (result.type === 'success') {
								form.reset();
							}
							if (result.type === 'invalid') {
								await applyAction(result);
							}
						};
					}}
				>
					<div class="sm:flex sm:items-center lg:flex-col lg:gap-2">
						<div class="w-full">
							<label for="email" class="sr-only">Email</label>
							<input
								type="email"
								name="email"
								id="email"
								value={form?.email ?? ''}
								class="block form-input p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-sky-700 focus:ring-sky-700 sm:text-sm"
								placeholder="you@example.com"
							/>
							<input hidden type="hidden" name="specs" id="specs" value={specs} />
						</div>
						<button
							type="submit"
							class="mt-3 inline-flex w-full min-w-fit items-center justify-center rounded-md border border-transparent bg-sky-700 px-4 py-2 font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm lg:w-full lg:ml-0"
						>
							Submit Inquiry
						</button>
					</div>
					{#if form?.success}
						<p>success</p>
					{/if}
				</form>
			</div>
		</div>
	</div>
</div>
