<script lang="ts">
import { AtpAgent } from '@atproto/api';
import { onMount } from 'svelte';
import { browser } from '$app/environment';

// Props
export let username = 'mary.dev';
export let appPassword = 'd5oq-wyam-wdhz-o3og';
export let initialHandle = 'mary.dev';

// Cache for 1 hour
const CACHE_DURATION = 60 * 60 * 1000;
const CACHE_KEY_PREFIX = 'bluesky_posts_';
const POST_LIMIT = 20; // Added post limit constant

interface Post {
    uri: string;
    cid: string;
    author: {
        did: string;
        handle: string;
        displayName?: string;
        avatar?: string;
    };
    text: string;
    createdAt: string;
    indexedAt: string;
    hasImages: boolean;
    hasVideo: boolean;
    media?: Array<{
        type: 'image' | 'video';
        alt: string;
        url: string;
        poster?: string;
    }>;
    likeCount: number;
    repostCount: number;
    externalLinks: string[];
}

interface CacheEntry {
    posts: Post[];
    timestamp: number;
    handle: string;
}

let handle = initialHandle;
let posts: Post[] = [];
let loading = false;
let error = '';
let agent: AtpAgent;

function getCacheKey(handle: string): string {
    return `${CACHE_KEY_PREFIX}${handle}`;
}

function loadFromCache(handle: string): CacheEntry | null {
    if (!browser) return null;

    try {
        const cached = localStorage.getItem(getCacheKey(handle));
        if (cached) {
            const data = JSON.parse(cached) as CacheEntry;
            if (Date.now() - data.timestamp < CACHE_DURATION && data.handle === handle) {
                return data;
            }
        }
    } catch (e) {
        console.error('Cache read error:', e);
    }
    return null;
}

function saveToCache(handle: string, posts: Post[]) {
    if (!browser) return;

    const entry: CacheEntry = {
        posts,
        timestamp: Date.now(),
        handle
    };

    try {
        localStorage.setItem(getCacheKey(handle), JSON.stringify(entry));
    } catch (e) {
        console.error('Cache write error:', e);
    }
}

async function fetchFresh(): Promise<Post[]> {
    if (!agent) {
        agent = new AtpAgent({ service: 'https://bsky.social' });
        await agent.login({ identifier: username, password: appPassword });
    }

    const response = await agent.getAuthorFeed({
        actor: handle,
        limit: POST_LIMIT // Added limit parameter
    });

    return response.data.feed.map((item) => ({
        uri: item.post.uri || '',
        cid: item.post.cid || '',
        author: {
            did: item.post.author.did || '',
            handle: item.post.author.handle || '',
            displayName: item.post.author.displayName,
            avatar: item.post.author.avatar
        },
        text: item.post.record.text || '',
        createdAt: item.post.record.createdAt || new Date().toISOString(),
        indexedAt: item.post.indexedAt || new Date().toISOString(),
        hasImages: !!item.post.embed?.images?.length,
        hasVideo: !!item.post.embed?.thumbnail,
        media: [
            ...(item.post.embed?.images?.map((img) => ({
                type: 'image' as const,
                alt: img.alt || '',
                url: img.fullsize || img.thumb || ''
            })) || []),
            ...(item.post.embed?.thumbnail
                ? [
                    {
                        type: 'video' as const,
                        alt: item.post.embed.alt || '',
                        url: item.post.embed.playlist || '',
                        poster: item.post.embed.thumbnail
                    }
                ]
                : [])
        ],
        likeCount: item.post.likeCount || 0,
        repostCount: item.post.repostCount || 0,
        externalLinks: item.post.record.text?.match(/(https?:\/\/[^\s]+)/g) || []
    }));
}

async function loadPosts() {
    if (!handle) return;

    try {
        loading = true;
        const cached = loadFromCache(handle);

        if (cached) {
            posts = cached.posts;
            return;
        }

        posts = await fetchFresh();
        saveToCache(handle, posts);
    } catch (e) {
        console.error('Failed to load posts:', e);
        error = e instanceof Error ? e.message : 'Failed to load posts';
        const cached = loadFromCache(handle);
        if (cached) posts = cached.posts;
    } finally {
        loading = false;
    }
}

function formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
}

onMount(() => {
    loadPosts();
});
</script>

<div class="p-2 sm:p-4 h-fit bg-zinc-50 dark:bg-black">
	<!-- <div class="mt-4 w-full bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800 dark:text-white relative max-w-2xl min-w-[300px] mx-auto flex rounded-xl">
    <a href="https://bsky.app/profile/mary.dev" target="_blank" rel="noopener noreferrer nofollow" class="cursor-pointer ">
    </a>
    <div class="flex-1 px-4 pt-3 pb-2.5">
    <div class="flex-1 flex-col flex gap-2" lang="en">
      <div class="flex gap-2.5 items-center cursor-pointer">
        <a href="https://bsky.app/profile/mary.dev" target="_blank" rel="noopener noreferrer nofollow" class="cursor-pointer rounded-full">
          <div class="w-10 h-10 overflow-hidden rounded-full bg-neutral-300 shrink-0">
            <img src="https://cdn.bsky.app/img/avatar/plain/did:plc:d23ep7mnuzjcl7me5c6f7syg/bafkreievdvo7vl5jmjtovoajyluqsjj6dxwmrpfot3bq25t2ndlaam5ktm@jpeg">
          </div>
        </a>
        <div>
          <a href="https://bsky.app/profile/mary.dev" target="_blank" rel="noopener noreferrer nofollow" class="cursor-pointer font-bold text-[17px] leading-5 line-clamp-1 hover:underline underline-offset-2 decoration-2"><p>mary</p></a><a href="https://bsky.app/profile/mary.dev" target="_blank" rel="noopener noreferrer nofollow" class="cursor-pointer text-[15px] text-zinc-400 hover:underline line-clamp-1"><p>@mary.dev</p></a>
        </div>
        <div class="flex-1"></div><a href="https://bsky.app/profile/mary.dev" target="_blank" rel="noopener noreferrer nofollow" class="cursor-pointer transition-transform hover:scale-110 shrink-0 self-start">
          <img src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%20320%20286'%3e%3cpath%20fill='rgb(10,122,255)'%20d='M69.364%2019.146c36.687%2027.806%2076.147%2084.186%2090.636%20114.439%2014.489-30.253%2053.948-86.633%2090.636-114.439C277.107-.917%20320-16.44%20320%2032.957c0%209.865-5.603%2082.875-8.889%2094.729-11.423%2041.208-53.045%2051.719-90.071%2045.357%2064.719%2011.12%2081.182%2047.953%2045.627%2084.785-80%2082.874-106.667-44.333-106.667-44.333s-26.667%20127.207-106.667%2044.333c-35.555-36.832-19.092-73.665%2045.627-84.785-37.026%206.362-78.648-4.149-90.071-45.357C5.603%20115.832%200%2042.822%200%2032.957%200-16.44%2042.893-.917%2069.364%2019.147Z'/%3e%3c/svg%3e" class="h-8">
          </a>
        </div>
      </div>
    </div>
  </div> -->

	<div class="container mx-auto max-w-2xl xl:max-w-4xl relative">
		<!-- <div class="flex gap-4 mb-8">
    <input
      type="text"
      bind:value={handle}
      placeholder="Enter Bluesky handle (e.g. jay.bsky.social)"
      class="flex-1 px-4 py-2 border rounded-lg"
      on:keydown={(e) => e.key === 'Enter' && fetchPosts()}
    />
    <button
      on:click={fetchPosts}
      disabled={loading}
      class="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
    >
      {loading ? 'Loading...' : 'View Posts'}
    </button>
  </div>

  {#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
    </div>
  {/if} -->

		<div
			class="relative h-fit sm:max-h-[60vh] xl:max-h-[90vh] sm:bg-zinc-100 sm:dark:bg-zinc-900 rounded-xl sm:p-6 sm:border border-zinc-200 dark:border-zinc-800"
		>
			<div class="overflow-y-scroll scrollbar h-fit sm:max-h-[56vh] xl:max-h-[86vh] rounded-lg">
				{#if posts.length > 0}
					<div class="space-y-6">
						{#each posts.slice(0, POST_LIMIT) as post}
							<div
								class="cursor-pointer border rounded-lg p-4 text-lg bg-zinc-50 dark:bg-black sm:hover:bg-white sm:dark:hover:bg-zinc-800 dark:text-white dark:border-zinc-800"
							>
								<div class="flex items-center gap-3 mb-3">
									{#if post.author.avatar}
										<img
											src={post.author.avatar}
											alt={post.author.handle}
											class="w-10 h-10 rounded-full object-cover"
										/>
									{:else}
										<div
											class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
										>
											<span class="text-xl">{post.author.handle[0].toUpperCase()}</span>
										</div>
									{/if}
									<div>
										<div class="font-semibold">
											{post.author.displayName || post.author.handle}
										</div>
										<div class="text-sm text-zinc-400">@{post.author.handle}</div>
									</div>
								</div>

								<p class="whitespace-pre-wrap mb-4">{post.text}</p>

								{#if post.media && post.media.length > 0}
									<div
										class="grid gap-2 mb-4"
										class:grid-cols-2={post.media.length > 1 && !post.hasVideo}
									>
										{#each post.media as media}
											{#if media.type === 'image'}
												<img
													src={media.url}
													alt={media.alt}
													class="rounded-lg w-full object-cover"
													style="max-height: 400px;"
												/>
											{:else if media.type === 'video'}
												<div
													class="relative w-full bg-black rounded-lg overflow-hidden"
													style="padding-top: 56.25%;"
												>
													{#if media.url}
														<video
															class="absolute top-0 left-0 w-full h-full"
															controls
															poster={media.poster || ''}
															preload="metadata"
															playsinline
														>
															<source src={media.url} type="video/mp4" />
															Your browser does not support the video tag.
														</video>
													{:else}
														<div
															class="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white"
														>
															Video unavailable
														</div>
													{/if}
												</div>
											{/if}
										{/each}
									</div>
								{/if}

								{#if post.externalLinks.length > 0}
									<div class="mb-4">
										{#each post.externalLinks as link}
											<a
												href={link}
												target="_blank"
												rel="noopener noreferrer"
												class="text-blue-500 hover:underline block"
											>
												{link}
											</a>
										{/each}
									</div>
								{/if}

								<div class="flex items-center justify-between text-sm text-zinc-500 pb-2.5">
									<div>
										{new Date(post.createdAt).toLocaleDateString()} at
										{new Date(post.createdAt).toLocaleTimeString()}
									</div>
									<div class="flex gap-4">
										<div title="Likes" class="flex items-center gap-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="h-5"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
												/>
											</svg>
											<p>{formatNumber(post.likeCount)}</p>
										</div>
										<div title="Reposts" class="flex items-center gap-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="h-5"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
												/>
											</svg>
											<p>{formatNumber(post.repostCount)}</p>
										</div>
									</div>
								</div>

								<div
									class="border-t border-zinc-300 dark:border-zinc-400 w-full pt-2.5 flex items-center gap-5 text-sm cursor-pointer"
								>
									<div class="flex items-center gap-2 cursor-pointer">
										<img
											src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='rgb(10,122,255)'%20d='M19.002%203a3%203%200%200%201%203%203v10a3%203%200%200%201-3%203H12.28l-4.762%202.858A1%201%200%200%201%206.002%2021v-2h-1a3%203%200%200%201-3-3V6a3%203%200%200%201%203-3h14Z'/%3e%3c/svg%3e"
											class="w-5 h-5"
											alt="Reply"
										/>
										<p class="font-bold text-neutral-500 mb-px">Reply</p>
									</div>
									<div class="flex-1" />
									<p
										class="cursor-pointer text-[#0A7AFF] font-bold hover:underline hidden min-[450px]:inline"
									>
										View on Bluesky
									</p>
									<p
										class="cursor-pointer text-[#0A7AFF] font-bold hover:underline min-[450px]:hidden"
									>
										<span class="hidden min-[380px]:inline">View on </span>Bluesky
									</p>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.scrollbar::-webkit-scrollbar-track {
		background-color: #fafafa;
	}

	.scrollbar::-webkit-scrollbar {
		width: 0px;
		display: hidden;
	}
</style>
