<script>
  export let data
</script>

<div class=" w-full">
	<div class="pb-4 space-y-1">
		<h3 class="text-lg sm:text-xl font-medium">Blog</h3>
		<p class="text-sm pb-4">
			Maybe someday I will write something here.
		</p>
	</div>

  <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
    {#each data.posts as post}
      <article class="flex flex-col items-start justify-between">
        <div class="relative w-full">
          <img src={post.cover} alt="" class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]">
          <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
        </div>
        <div class="max-w-xl">
          <div class="group relative">
            <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
              <a href={`/blog/${post.slug}`}>
                <span class="absolute inset-0"></span>
                {post.title}
              </a>
            </h3>
            <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
          </div>

        </div>
      </article>
      {/each}
    </div>
</div>


