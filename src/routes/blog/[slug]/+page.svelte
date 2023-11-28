<script>
  export let data

  let frontmatter = data.post.frontmatter
  let post = data.post.content

</script>

<div class="w-full flex-shrink-0">
	<div class="flex flex-col gap-4">
		<div>
      <div class="prose mx-auto">
        <h1>{frontmatter.title}</h1>
        {@html post}
      </div>
		</div>
		<hr class="border border-zinc-200 dark:border-zinc-600" />
	</div>

	<div class="pt-4 flex justify-end">
		<a href="/blog" class="text-sm hover:underline underline-offset-8">Back to Blog</a>
	</div>
</div>
