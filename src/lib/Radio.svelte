<script>
	// @ts-nocheck

	import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@rgossiaux/svelte-headlessui';

	export let radioInput = {
		formFactor: '3U',
		commutation: 'Hall',
		communicationInterface: 'VME',
		channels: '1'
	};
	export let suggestedFormFactor = { title: '', img: '' };

	let formFactor = '3U';
	let formFactorOptions = ['3U', '6U', 'Rugged Box', 'Other'];

	let commutation = 'Hall';
	let commutationOptions = ['Hall', 'Encoder', 'Resolver'];

	let communicationInterface = 'VME';
	let communicationOptions = ['VME', 'VPX', 'Ethernet', 'Serial'];

	let channels = '1';
	let channelsOptions = ['1', '2', '3+'];

	function updateFormFactor(e) {
		formFactor = e.detail;
		radioInput.formFactor = formFactor;
		suggestProduct();
	}

	function updateCommutation(e) {
		commutation = e.detail;
		radioInput.commutation = commutation;
	}

	function updateCommunication(e) {
		communicationInterface = e.detail;
		radioInput.communicationInterface = communicationInterface;
	}

	function updateChannels(e) {
		channels = e.detail;
		radioInput.channels = channels;
	}

	function suggestProduct() {
		const products = [
			{
				title: '68PW1',
				img: '/img/68PW1.webp',
				description: '3U OpenVPX PWM Servo Motor Drive',
				url: 'Model/68PW1'
			},
			{
				title: '64PW2',
				img: '/img/64PW2.webp',
				description: '6U VME PWM Servo Motor Drive/Amplifier Board',
				url: 'Model/64PW2'
			},
			{
				title: 'Rugged PWM Chassis',
				img: '/img/SIU34_FCC.png',
				description:
					'Modify one of our existing COTS products or work with us to build a custom solution',
				url: 'contact'
			},
			{
				title: 'Custom Form Factor',
				img: '/img/NIU3E.png',
				description:
					'Modify one of our existing COTS products or work with us to build a custom solution',
				url: 'contact'
			}
		];
		switch (radioInput.formFactor) {
			case '3U':
				suggestedFormFactor = products[0];
				break;
			case '6U':
				suggestedFormFactor = products[1];
				break;
			case 'Rugged Box':
				suggestedFormFactor = products[2];
				break;
			case 'Other':
				suggestedFormFactor = products[3];
				break;
			default:
				suggestedFormFactor = products[0];
		}
	}
</script>

<!-- Radio Section-->
<div class="w-fit flex flex-col items-start gap-4 p-2 dark:text-gray-800">
	<!-- Form Factor -->
	<RadioGroup value={formFactor} on:change={updateFormFactor}>
		<RadioGroupLabel class="text-sm font-regular text-gray-800">Form Factor</RadioGroupLabel>
		<fieldset class="mt-2">
			<legend class="sr-only">Choose a form factor</legend>
			<div class="flex gap-4">
				{#each formFactorOptions as formFactorOption, i}
					<RadioGroupOption value={formFactorOptions[i]} let:active let:checked>
						<span
							class:active
							class:checked
							class="h-8 rounded-sm px-3 py-2 text-sm font-medium leading-4 text-gray-800 shadow-inner bg-gray-200 hover:bg-gray-300"
						>
							{formFactorOption}
						</span>
					</RadioGroupOption>
				{/each}
			</div>
		</fieldset>
	</RadioGroup>

	<!-- Commutation -->
	<RadioGroup value={commutation} on:change={updateCommutation}>
		<RadioGroupLabel class="text-sm font-regular text-gray-800">Commutation</RadioGroupLabel>
		<fieldset class="mt-2">
			<legend class="sr-only">Choose a commutation type</legend>
			<div class="flex gap-4">
				{#each commutationOptions as commutationOption, i}
					<RadioGroupOption value={commutationOptions[i]} let:active let:checked>
						<span
							class:active
							class:checked
							class="h-8 rounded-sm px-3 py-2 text-sm font-medium leading-4 text-gray-800 shadow-inner bg-gray-200 hover:bg-gray-300"
						>
							{commutationOption}
						</span>
					</RadioGroupOption>
				{/each}
			</div>
		</fieldset>
	</RadioGroup>

	<!-- Communication Interface -->
	<RadioGroup value={communicationInterface} on:change={updateCommunication}>
		<RadioGroupLabel class="text-sm font-regular text-gray-800"
			>Communication Interface</RadioGroupLabel
		>
		<fieldset class="mt-2">
			<legend class="sr-only">Choose a Communication Interface</legend>
			<div class="flex gap-4">
				{#each communicationOptions as communicationOption, i}
					<RadioGroupOption value={communicationOptions[i]} let:active let:checked>
						<span
							class:active
							class:checked
							class="h-8 rounded-sm px-3 py-2 text-sm font-medium leading-4 text-gray-800 shadow-inner bg-gray-200 hover:bg-gray-300"
						>
							{communicationOption}
						</span>
					</RadioGroupOption>
				{/each}
			</div>
		</fieldset>
	</RadioGroup>

	<!-- Channels -->
	<RadioGroup value={channels} on:change={updateChannels}>
		<RadioGroupLabel class="text-sm font-regular text-gray-800">Channels</RadioGroupLabel>
		<fieldset class="mt-2">
			<legend class="sr-only">Choose number of channels</legend>
			<div class="flex gap-4">
				{#each channelsOptions as channelsOption, i}
					<RadioGroupOption value={channelsOptions[i]} let:active let:checked>
						<span
							class:active
							class:checked
							class="h-8 rounded-sm px-3 py-2 text-sm font-medium leading-4 text-gray-800 shadow-inner bg-gray-200 hover:bg-gray-300"
						>
							{channelsOption}
						</span>
					</RadioGroupOption>
				{/each}
			</div>
		</fieldset>
	</RadioGroup>
</div>

<style>
	.active {
		background-color: #0369a1;
	}
	.active:hover {
		background-color: #075985;
	}
	.checked {
		background-color: #0369a1;
		color: white;
	}
	.checked:hover {
		background-color: #075985;
	}
</style>
