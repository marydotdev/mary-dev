<script lang="ts">
	import { AtpAgent } from '@atproto/api';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Props
	export let username = 'mary.dev';
	export let appPassword = 'd5oq-wyam-wdhz-o3og';
	export let initialHandle = 'mary.dev';

	// Cache configuration
	const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
	const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
	const MAX_REQUESTS_PER_WINDOW = 100; // Bluesky's default rate limit
	const CACHE_KEY = 'bluesky_posts_cache';

	// Internal state
	let handle = initialHandle;
	let posts: Post[] = [];
	let loading = false;
	let error = '';
	let agent: AtpAgent;
	let isAuthenticated = false;

	// Rate limiting and caching state
	let requestCount = 0;
	let lastRequestTime = 0;
	let rateLimitResetTimeout: NodeJS.Timeout;

	// Types
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

	// Define a type for the record
	interface PostRecord {
		text: string;
		createdAt: string;
	}

	function loadFromCache(): { posts: Post[]; timestamp: number } | null {
		if (!browser) return null;

		try {
			const cached = localStorage.getItem(CACHE_KEY);
			if (cached) {
				const { posts, timestamp } = JSON.parse(cached);
				if (Date.now() - timestamp < CACHE_DURATION) {
					return { posts, timestamp };
				}
			}
		} catch (e) {
			console.error('Error loading from cache:', e);
		}
		return null;
	}

	function saveToCache(posts: Post[]) {
		if (!browser) return;

		try {
			localStorage.setItem(
				CACHE_KEY,
				JSON.stringify({
					posts,
					timestamp: Date.now()
				})
			);
		} catch (e) {
			console.error('Error saving to cache:', e);
		}
	}

	function checkRateLimit(): boolean {
		const now = Date.now();

		if (now - lastRequestTime > RATE_LIMIT_WINDOW) {
			requestCount = 0;
			lastRequestTime = now;
		}

		if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
			const waitTime = RATE_LIMIT_WINDOW - (now - lastRequestTime);
			throw new Error(`Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`);
		}

		requestCount++;
		return true;
	}

	async function ensureAuth() {
		if (!isAuthenticated) {
			try {
				checkRateLimit();
				await agent.login({
					identifier: username,
					password: appPassword
				});
				isAuthenticated = true;
			} catch (error) {
				if (error instanceof Error && 'status' in error && error.status === 429) {
					throw new Error('Rate limit exceeded. Please try again later.');
				}
				console.error('Authentication failed:', error);
				throw new Error('Failed to authenticate with Bluesky');
			}
		}
	}

	async function getAuthorFeed(handle: string): Promise<Post[]> {
		try {
			await ensureAuth();
			checkRateLimit();

			const response = await agent.getAuthorFeed({ actor: handle });
			const processedPosts = response.data.feed.map((item) => {
				const post: Post = {
					uri: item.post.uri || '',
					cid: item.post.cid || '',
					author: {
						did: item.post.author.did || '',
						handle: item.post.author.handle || '',
						displayName: item.post.author.displayName,
						avatar: item.post.author.avatar
					},
					text: (item.post.record as PostRecord).text || '',
					createdAt: (item.post.record as PostRecord).createdAt || new Date().toISOString(),
					indexedAt: item.post.indexedAt || new Date().toISOString(),
					hasImages: false,
					hasVideo: false,
					likeCount: item.post.likeCount || 0,
					repostCount: item.post.repostCount || 0,
					externalLinks: []
				};

				try {
					const media = [];

					if (item.post.embed) {
						if (Array.isArray(item.post.embed.images)) {
							post.hasImages = true;
							media.push(
								...item.post.embed.images.map((img) => ({
									type: 'image' as const,
									alt: img.alt || '',
									url: img.fullsize || img.thumb || ''
								}))
							);
						}

						if (item.post.embed.thumbnail) {
							post.hasVideo = true;
							const videoEmbed = item.post.embed;
							media.push({
								type: 'video' as const,
								alt: videoEmbed.alt || '',
								url: videoEmbed.playlist || '',
								poster: videoEmbed.thumbnail || ''
							});
						}
					}
					if (media.length > 0) {
						post.media = media.map((mediaItem) => ({
							...mediaItem,
							alt: mediaItem.alt || '',
							url: mediaItem.url || '',
							poster:
								mediaItem.type === 'video' && typeof mediaItem.poster === 'string'
									? mediaItem.poster
									: undefined
						}));
					}

					const urlRegex = /(https?:\/\/[^\s]+)/g;
					post.externalLinks = post.text.match(urlRegex) || [];
				} catch (e) {
					console.error('Error processing post attachments:', e);
				}

				return post;
			});

			return processedPosts;
		} catch (error) {
			const err = error as { status?: number }; // Type assertion
			if (err.status === 429) {
				throw new Error('Rate limit exceeded. Please try again later.');
			}
			console.error('Error fetching feed:', error);
			const errorMessage = (error as Error).toString();
			if (errorMessage.includes('Authentication Required')) {
				throw new Error('Authentication failed. Please check your credentials.');
			}
			throw error;
		}
	}

	function formatNumber(num: number): string {
		if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
		if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
		return num.toString();
	}

	async function fetchPosts(silent = false) {
		if (!handle) {
			error = 'Please enter a Bluesky handle';
			return;
		}

		if (!silent) {
			loading = true;
		}
		error = '';

		try {
			const cached = loadFromCache();
			if (cached && !silent) {
				posts = cached.posts;
				loading = false;
			}

			if (!cached || silent) {
				const newPosts = await getAuthorFeed(handle);
				posts = newPosts;
				saveToCache(newPosts);
			}
		} catch (e) {
			const errorMessage = (e as Error).message || 'Error fetching posts. Please try again later.';
			error = errorMessage;
			posts = loadFromCache()?.posts || [];
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		agent = new AtpAgent({
			service: 'https://bsky.social'
		});

		const cached = loadFromCache();
		if (cached) {
			posts = cached.posts;
			setTimeout(() => {
				fetchPosts(true);
			}, 1000);
		} else {
			fetchPosts();
		}

		return () => {
			if (rateLimitResetTimeout) {
				clearTimeout(rateLimitResetTimeout);
			}
		};
	});
</script>

<div class="p-4 h-fit bg-zinc-50 dark:bg-black">
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

	<div class="container mx-auto max-w-2xl relative">
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

		<div class="h-fit sm:max-h-[60vh] xl:max-h-[86vh] overflow-y-scroll scrollbar">
			{#if posts.length > 0}
				<div class="space-y-6">
					{#each posts as post}
						<div
							class="cursor-pointer border rounded-lg p-4 text-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-white dark:hover:bg-zinc-800 dark:text-white dark:border-zinc-800"
						>
							<div class="flex items-center gap-3 mb-3">
								{#if post.author.avatar}
									<img
										src={post.author.avatar}
										alt={post.author.handle}
										class="w-10 h-10 rounded-full object-cover"
									/>
								{:else}
									<div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
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

							<div class="border-t border-zinc-300 dark:border-zinc-400 w-full pt-2.5 flex items-center gap-5 text-sm cursor-pointer">
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

<style>
	.scrollbar::-webkit-scrollbar-track {
		background-color: #fafafa;
	}

	.scrollbar::-webkit-scrollbar {
		width: 0px;
		display: hidden;
	}
</style>
