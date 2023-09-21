<script>
  import Card from '$lib/Card.svelte';
  export let data

</script>

<div>
  <div class="pb-4">
    <h2 class=""><a href='https://www.goodreads.com/review/list/107866526?shelf=read' target="_blank" rel="noreferrer" class="text-xl hover:underline underline-offset-8">Read</a></h2>

  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
    {#each data.books as book}
    <Card item={book}>
          <a href={`https://goodreads.com/${book.url}`} target="_blank" rel="noreferrer">
            <div>
              <div class="flex gap-2">
                <img src={book.cover} alt={`${book.title} Cover`} class="h-36" />
                <div class="w-full flex flex-col justify-between p-4">
                  <div class="space-y-1">
                    <p class="clamp">{book.title}</p>
                    <p class="text-sm">{book.author}</p>
                  </div>
                  <p class="w-full text-sm text-right">Read {book.dateRead}</p>
                </div>
              </div>
            </div>
          </a>
          </Card>
    {/each}

  </div>
  <div class="pt-8 flex justify-center">
    <p><a href="https://www.goodreads.com/review/list/107866526-mary-haedrich?ref=nav_mybooks&shelf=read" target="_blank" rel="noreferrer" class="hover:underline underline-offset-4">Visit my goodreads profile to see all the books on my shelf &rarr;</a></p>
  </div>
</div>
