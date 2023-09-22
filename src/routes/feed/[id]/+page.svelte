<script>
	import Card from '$lib/Card.svelte';

  export let data

  function formatTime(dateTime) {
    let time = new Date(dateTime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });

    return time
  }

  function formatDate(dateTime) {
    let date = new Date(dateTime).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return date
  }

</script>

<div class="md:max-w-md lg:max-w-lg w-full flex-shrink-0">
  <div class="pb-4">
    <a href="/feed" class="text-xl hover:underline underline-offset-8">Back to Feed</a>
  </div>
  <div class="flex flex-col gap-4">
      <Card item={data.thought}>
        <div>
          <div class="p-4 flex flex-col gap-4">
            <p class="text-lg">{data.thought.text}</p>
            {#if (data.thought.mediaUrl)}
              <div class="">
                <img src={data.thought.mediaUrl} alt="thought pic" class="object-cover h-96 w-full rounded-xl" />
              </div>
            {/if}
            <div class="flex justify-between">
              <p>{formatTime(data.thought.created_at)}</p>
              <p>{formatDate(data.thought.created_at)}</p>
            </div>
          </div>
        </div>
      </Card>
  </div>
</div>
