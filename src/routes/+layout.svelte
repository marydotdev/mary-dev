<script>
  import '../app.css';
</script>

<div class="w-full max-w-[2000px] mx-auto min-h-screen flex flex-col justify-center">
  <div class="px-2 pt-4 sm:p-4 md:p-8 w-full h-screen dark:text-zinc-200">
    <slot />
  </div>
</div>

<style>

	.scroll::-webkit-scrollbar-track {
		background-color: #fafafa;
	}

	.scroll::-webkit-scrollbar {
		width: 10px;
		background-color: #fafafa;
	}

	.scroll::-webkit-scrollbar-thumb {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: #18181b;
	}
</style>
