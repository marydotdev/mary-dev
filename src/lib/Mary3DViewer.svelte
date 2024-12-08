<script>
    import { onMount } from 'svelte';

    let viewerContainer;

    onMount(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer/build/spline-viewer.js';
        document.head.appendChild(script);

        script.onload = () => {
            const viewer = document.createElement('spline-viewer');
            viewer.url = 'https://prod.spline.design/dQLdcWhHZELqMKwu/scene.splinecode';
            viewerContainer.appendChild(viewer);
        };
    });
</script>

<div bind:this={viewerContainer} class="w-full h-full"></div>
