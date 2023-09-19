<script>
  export let data

</script>

<div>
  <div class="pb-4">
    <h2 class="text-xl">Read</h2>
    <p>Some books from my <a href="https://www.goodreads.com/review/list/107866526-mary-haedrich?ref=nav_mybooks&shelf=read" target="_blank" rel="noreferrer">goodreads shelf</a></p>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
    {#each data.books as book}
    <div class="flex gap-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700">
      <img src={book.cover} alt={`${book.title} Cover`} class="h-36" />
      <div class="max-w-sm p-4 flex flex-col gap-2">
        <p>{book.title}</p>
        <p>{book.author}</p>
      </div>
    </div>
    {/each}
  </div>
</div>
