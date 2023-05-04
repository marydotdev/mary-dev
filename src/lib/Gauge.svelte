<script>
	export let gaugeInput = {
		inputVoltage: 5,
		current: 0,
		power: 0
	};

	let inputVoltage = 5;
	let current = 0;
	let power = 0;

	$: inputAngle = Math.floor((180 * inputVoltage) / 270);
	$: currentAngle = Math.floor((180 * current) / 10);
	$: powerAngle = Math.floor((180 * power) / 2000);
	$: maxVoltage = inputVoltage > 269 ? true : false;
	$: maxCurrent = current > 9 ? true : false;
	$: maxPower = power > 1999 ? true : false;

	function updateVoltage() {
		gaugeInput.inputVoltage = inputVoltage;
	}

	function updateCurrent() {
		gaugeInput.current = current;
	}

	function updatePower() {
		gaugeInput.power = power;
	}
</script>

<!-- Gauge Section -->
<div class="w-full flex flex-grow flex-col sm:flex-row sm:justify-between sm:gap-3">
	<div class="w-full flex items-center gap-4 p-2 text-gray-800">
		<!-- Input Voltage -->
		<div class="w-full">
			<h2 class="text-sm sm:text-center">Input Voltage</h2>
			<fieldset class="mt-1 sm:mt-2">
				<legend class="sr-only">Choose an input voltage</legend>
				<div class="relative">
					<div class="hidden sm:block relative mx-auto w-32 md:w-36">
						<svg
							class="w-full h-auto text-gray-800"
							viewBox="0 0 100 60"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g id="gauge">
								<path
									id="semicircle"
									d="M0.581197 56.7744V57.1932H1H99H99.4188V56.7744V52C99.4188 24.7067 77.2933 2.5812 50 2.5812C22.7067 2.5812 0.581197 24.7067 0.581197 52V56.7744Z"
									stroke="currentColor"
									stroke-width="1"
									fill="#fff"
									class="relative text-gray-800"
								/>
								<path
									id="ticks"
									d="M97.8273 52C97.8273 25.4932 76.3393 4.00513 49.8325 4.00513C23.3256 4.00513 1.83759 25.4932 1.83759 52"
									stroke="currentColor"
									stroke-width="3"
									stroke-dasharray="0.5 5.5"
								/>
								<path
									id="needle"
									class="absolute inset-0 origin-[50%_86.5%] text-gray-800"
									fill="currentColor"
									style="transform: rotate({inputAngle}deg)"
									d="M46.9145 51.7487C46.9145 53.2215 48.1084 54.4154 49.5812 54.4154C51.054 54.4154 52.2479 53.2215 52.2479 51.7487C52.2479 50.276 51.054 49.0821 49.5812 49.0821C48.1084 49.0821 46.9145 50.276 46.9145 51.7487ZM24.453 52.2487L49.5812 52.2487V51.2487L24.453 51.2487V52.2487Z"
								/>
							</g>
						</svg>
					</div>
					<div class="hidden sm:block mx-auto pt-2 text-center text-lg font-mono font-bold">
						<input
							type="text"
							inputmode="numeric"
							pattern="[0-9]*"
							class="w-16 h-full mx-auto flex justify-center text-center border-transparent"
							bind:value={inputVoltage}
							on:change={updateVoltage}
							min="5"
							max="270"
						/>
					</div>
					<div>
						<div class="flex items-center h-16 gap-2 -mt-3 sm:-mt-4">
							<div
								class="w-full flex-col items-center justify-center text-sm font-medium cursor-pointer focus:outline-none"
							>
								<input
									type="range"
									bind:value={inputVoltage}
									on:change={updateVoltage}
									min="5"
									max="270"
									step="5"
									list="input-tickmarks"
									class="w-full"
								/>
							</div>
							<div class="w-20 h-full sm:hidden text-lg font-mono font-bold">
								<div class="w-fit h-full bg-gray-300 flex justify-center items-center">
									<input
										type="text"
										inputmode="numeric"
										pattern="[0-9]*"
										class="w-16 h-full flex justify-center text-center border-transparent"
										bind:value={inputVoltage}
										on:change={updateVoltage}
										min="5"
										max="270"
									/>
								</div>
							</div>
						</div>
						<div class="flex items-start -mt-4 h-6 gap-2">
							<div class="w-full flex-col text-sm font-medium cursor-pointer focus:outline-none">
								<datalist id="input-tickmarks" class="flex justify-between px-1 text-gray-500">
									<option value="5" label="5V" class="text-xs font-medium" />
									<option value="270" label="270V" class="text-xs font-medium" />
								</datalist>
								{#if maxVoltage}
									<div class="flex justify-center">
										<p class="text-xs text-gray-600">
											Need more voltage? <a href="/contact" class="text-sky-500 hover:text-sky-600"
												>No problem!</a
											>
										</p>
									</div>
								{/if}
							</div>
							<div class="w-20 sm:hidden" />
						</div>
					</div>
				</div>
			</fieldset>
		</div>
	</div>

	<div class="w-full flex items-center gap-4 p-2 text-gray-800">
		<!-- Current -->
		<div class="w-full">
			<h2 class="text-sm sm:text-center">Current</h2>
			<fieldset class="mt-1 sm:mt-2">
				<legend class="sr-only">Choose a current</legend>
				<div class="relative">
					<div class="hidden sm:block relative mx-auto w-32 md:w-36">
						<svg
							class="w-full h-auto text-gray-800"
							viewBox="0 0 100 60"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g id="gauge">
								<path
									id="semicircle"
									d="M0.581197 56.7744V57.1932H1H99H99.4188V56.7744V52C99.4188 24.7067 77.2933 2.5812 50 2.5812C22.7067 2.5812 0.581197 24.7067 0.581197 52V56.7744Z"
									stroke="currentColor"
									stroke-width="1"
									fill="#fff"
									class="relative text-gray-800"
								/>
								<path
									id="ticks"
									d="M97.8273 52C97.8273 25.4932 76.3393 4.00513 49.8325 4.00513C23.3256 4.00513 1.83759 25.4932 1.83759 52"
									stroke="currentColor"
									stroke-width="3"
									stroke-dasharray="0.5 5.5"
								/>
								<path
									id="needle"
									class="absolute inset-0 origin-[50%_86.5%] text-gray-800"
									fill="currentColor"
									style="transform: rotate({currentAngle}deg)"
									d="M46.9145 51.7487C46.9145 53.2215 48.1084 54.4154 49.5812 54.4154C51.054 54.4154 52.2479 53.2215 52.2479 51.7487C52.2479 50.276 51.054 49.0821 49.5812 49.0821C48.1084 49.0821 46.9145 50.276 46.9145 51.7487ZM24.453 52.2487L49.5812 52.2487V51.2487L24.453 51.2487V52.2487Z"
								/>
							</g>
						</svg>
					</div>
					<div class="hidden sm:block mx-auto pt-2 text-center text-lg font-mono font-bold">
						<input
							type="text"
							inputmode="numeric"
							pattern="[0-9]*"
							class="w-16 mx-auto h-full flex justify-center text-center border-transparent"
							bind:value={current}
							on:change={updateCurrent}
							min="0"
							max="10"
						/>
					</div>
					<div>
						<div class="flex items-center h-16 gap-2 -mt-3 sm:-mt-4">
							<div
								class="w-full flex-col items-center justify-center text-sm font-medium cursor-pointer focus:outline-none"
							>
								<input
									type="range"
									bind:value={current}
									on:change={updateCurrent}
									min="0"
									max="10"
									step="1"
									list="input-tickmarks"
									class="w-full"
								/>
							</div>
							<div class="w-20 h-full sm:hidden text-lg font-mono font-bold">
								<div class="w-fit h-full bg-gray-300 flex justify-center items-center">
									<input
										type="text"
										inputmode="numeric"
										pattern="[0-9]*"
										class="w-16 h-full flex justify-center text-center border-transparent"
										bind:value={current}
										on:change={updateCurrent}
										min="0"
										max="10"
									/>
								</div>
							</div>
						</div>

						<div class="flex items-start -mt-4 h-6 gap-2">
							<div class="w-full flex-col text-sm font-medium cursor-pointer focus:outline-none">
								<datalist id="input-tickmarks" class="flex justify-between px-1 text-gray-500">
									<option value="0" label="0A" class="text-xs font-medium" />
									<option value="10" label="10A" class="text-xs font-medium" />
								</datalist>
								{#if maxCurrent}
									<div class="flex justify-center">
										<p class="text-xs text-gray-600">
											Need more current? <a href="/contact" class="text-sky-500 hover:text-sky-600"
												>No problem!</a
											>
										</p>
									</div>
								{/if}
							</div>
							<div class="w-20 sm:hidden" />
						</div>
					</div>
				</div>
			</fieldset>
		</div>
	</div>

	<div class="w-full flex items-center gap-4 p-2 text-gray-800">
		<!-- Power -->
		<div class="w-full">
			<h2 class="text-sm sm:text-center">Power</h2>
			<fieldset class="mt-1 sm:mt-2">
				<legend class="sr-only">Choose power level</legend>
				<div class="relative">
					<div class="hidden sm:block relative mx-auto w-32 md:w-36">
						<svg
							class="w-full h-auto text-gray-800"
							viewBox="0 0 100 60"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g id="gauge">
								<path
									id="semicircle"
									d="M0.581197 56.7744V57.1932H1H99H99.4188V56.7744V52C99.4188 24.7067 77.2933 2.5812 50 2.5812C22.7067 2.5812 0.581197 24.7067 0.581197 52V56.7744Z"
									stroke="currentColor"
									stroke-width="1"
									fill="#fff"
									class="relative text-gray-800"
								/>
								<path
									id="ticks"
									d="M97.8273 52C97.8273 25.4932 76.3393 4.00513 49.8325 4.00513C23.3256 4.00513 1.83759 25.4932 1.83759 52"
									stroke="currentColor"
									stroke-width="3"
									stroke-dasharray="0.5 5.5"
								/>
								<path
									id="needle"
									class="absolute inset-0 origin-[50%_86.5%] text-gray-800"
									fill="currentColor"
									style="transform: rotate({powerAngle}deg)"
									d="M46.9145 51.7487C46.9145 53.2215 48.1084 54.4154 49.5812 54.4154C51.054 54.4154 52.2479 53.2215 52.2479 51.7487C52.2479 50.276 51.054 49.0821 49.5812 49.0821C48.1084 49.0821 46.9145 50.276 46.9145 51.7487ZM24.453 52.2487L49.5812 52.2487V51.2487L24.453 51.2487V52.2487Z"
								/>
							</g>
						</svg>
					</div>
					<div class="hidden sm:block mx-auto pt-2 text-center text-lg font-mono font-bold">
						<input
							type="text"
							inputmode="numeric"
							pattern="[0-9]*"
							class="w-16 mx-auto h-full flex justify-center text-center border-transparent"
							bind:value={power}
							on:change={updatePower}
							min="0"
							max="2000"
						/>
					</div>
					<div>
						<div class="flex items-center h-16 gap-2 -mt-3 sm:-mt-4">
							<div
								class="w-full flex-col items-center justify-center text-sm font-medium cursor-pointer focus:outline-none"
							>
								<input
									type="range"
									bind:value={power}
									on:change={updatePower}
									min="0"
									max="2000"
									step="10"
									list="input-tickmarks"
									class="w-full"
								/>
							</div>
							<div class="w-20 h-full sm:hidden text-lg font-mono font-bold">
								<div class="w-fit h-full bg-gray-300 flex justify-center items-center">
									<input
										type="text"
										inputmode="numeric"
										pattern="[0-9]*"
										class="w-16 h-full flex justify-center text-center border-transparent"
										bind:value={power}
										on:change={updatePower}
										min="0"
										max="2000"
									/>
								</div>
							</div>
						</div>

						<div class="flex items-start -mt-4 h-6 gap-2">
							<div class="w-full flex-col text-sm font-medium cursor-pointer focus:outline-none">
								<datalist id="input-tickmarks" class="flex justify-between px-1 text-gray-500">
									<option value="0" label="0W" class="text-xs font-medium" />
									<option value="2000" label="2000W" class="text-xs font-medium" />
								</datalist>
								{#if maxPower}
									<div class="flex justify-center">
										<p class="text-xs text-gray-600">
											Need more power? <a href="/contact" class="text-sky-500 hover:text-sky-600"
												>No problem!</a
											>
										</p>
									</div>
								{/if}
							</div>
							<div class="w-20 sm:hidden" />
						</div>
					</div>
				</div>
			</fieldset>
		</div>
	</div>
</div>

<style>
	:root {
		--track-color: rgb(231, 231, 231);
		--thumb-color: #0369a1;
	}

	input[type='range'] {
		appearance: none;
		-webkit-appearance: none;
		margin: 10px 0;
		width: 100%;
	}
	input[type='range']:focus {
		outline: none;
	}
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 12.8px;
		cursor: pointer;
		box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
		background: var(--track-color);
		border-radius: 25px;
		border: 0px solid #000101;
	}
	input[type='range']::-webkit-slider-thumb {
		box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
		border: 0px solid #000000;
		height: 20px;
		width: 39px;
		border-radius: 7px;
		background: var(--thumb-color);
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: -3.6px;
	}
	input[type='range']:focus::-webkit-slider-runnable-track {
		background: var(--track-color);
	}
	input[type='range']::-moz-range-track {
		width: 100%;
		height: 12.8px;
		cursor: pointer;
		box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
		background: var(--track-color);
		border-radius: 25px;
		border: 0px solid #000101;
	}
	input[type='range']::-moz-range-thumb {
		box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
		border: 0px solid #000000;
		height: 20px;
		width: 39px;
		border-radius: 7px;
		background: var(--thumb-color);
		cursor: pointer;
	}
	input[type='range']::-ms-track {
		width: 100%;
		height: 12.8px;
		cursor: pointer;
		background: transparent;
		border-color: transparent;
		border-width: 39px 0;
		color: transparent;
	}
	input[type='range']::-ms-fill-lower {
		background: var(--track-color);
		border: 0px solid #000101;
		border-radius: 50px;
		box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
	}
	input[type='range']::-ms-fill-upper {
		background: var(--track-color);
		border: 0px solid #000101;
		border-radius: 50px;
		box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
	}
	input[type='range']::-ms-thumb {
		box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
		border: 0px solid #000000;
		height: 20px;
		width: 39px;
		border-radius: 7px;
		background: var(--thumb-color);
		cursor: pointer;
	}
	input[type='range']:focus::-ms-fill-lower {
		background: var(--track-color);
	}
	input[type='range']:focus::-ms-fill-upper {
		background: var(--track-color);
	}
</style>
