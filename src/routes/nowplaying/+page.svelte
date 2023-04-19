<script>
// @ts-nocheck

    import {onMount} from 'svelte';

    let song;

    async function getNowPlaying() {
        song = await fetch('https://www.mary.dev/api/nowPlaying')
    }

    onMount(async () => {
            getNowPlaying();
    })


    setInterval(() => {
        getNowPlaying();
    }, 5000);
</script>

<p>{song.item.title}</p>
