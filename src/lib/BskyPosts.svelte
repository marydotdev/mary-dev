<script lang="ts">
  import { AtpAgent } from '@atproto/api';
  import { onMount } from 'svelte';

  // Props
  export let username = 'mary.dev';
  export let appPassword = 'd5oq-wyam-wdhz-o3og';
  export let initialHandle = 'mary.dev';

  // Internal state
  let handle = initialHandle;
  let posts: Post[] = [];
  let loading = false;
  let error = '';
  let agent: AtpAgent;
  let isAuthenticated = false;

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

  onMount(() => {
    agent = new AtpAgent({
      service: 'https://bsky.social'
    });
    fetchPosts()
  });

  async function ensureAuth() {
    if (!isAuthenticated) {
      try {
        await agent.login({
          identifier: username,
          password: appPassword
        });
        isAuthenticated = true;
      } catch (error) {
        console.error('Authentication failed:', error);
        throw new Error('Failed to authenticate with Bluesky');
      }
    }
  }

  async function getAuthorFeed(handle: string): Promise<Post[]> {
    try {
      await ensureAuth();

      const response = await agent.getAuthorFeed({ actor: handle });
      return response.data.feed.map((item) => {
        const post: Post = {
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
          hasImages: false,
          hasVideo: false,
          likeCount: item.post.likeCount || 0,
          repostCount: item.post.repostCount || 0,
          externalLinks: []
        };

        try {
          const media = [];

          if (item.post.embed) {
            if (item.post.embed.images) {
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
            post.media = media;
          }

          const urlRegex = /(https?:\/\/[^\s]+)/g;
          post.externalLinks = post.text.match(urlRegex) || [];
        } catch (e) {
          console.error('Error processing post attachments:', e);
          console.log('Problematic post:', item);
        }

        return post;
      });
    } catch (error) {
      console.error('Error fetching feed:', error);
      if (error.toString().includes('Authentication Required')) {
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

  async function fetchPosts() {
    if (!handle) {
      error = 'Please enter a Bluesky handle';
      return;
    }

    loading = true;
    error = '';

    try {
      posts = await getAuthorFeed(handle);
      if (posts.length === 0) {
        error = 'No posts found or user not found';
      }
    } catch (e) {
      error = e.message || 'Error fetching posts. Please check the handle and try again.';
      posts = [];
    } finally {
      loading = false;
    }
  }
</script>

<div class="container mx-auto px-4 py-8 max-w-2xl relative border-2 border-red-300">
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

  <div class="h-[620px] overflow-auto">
    {#if posts.length > 0}
    <div class="space-y-6">
      {#each posts as post}
        <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-3 mb-3">
            {#if post.author.avatar}
              <img
                src={post.author.avatar}
                alt={post.author.handle}
                class="w-10 h-10 rounded-full object-cover"
              />
            {:else}
              <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span class="text-gray-500 text-xl">{post.author.handle[0].toUpperCase()}</span>
              </div>
            {/if}
            <div>
              <div class="font-semibold">
                {post.author.displayName || post.author.handle}
              </div>
              <div class="text-sm text-gray-500">@{post.author.handle}</div>
            </div>
          </div>

          <p class="text-gray-800 whitespace-pre-wrap mb-4">{post.text}</p>

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

          <div class="flex items-center justify-between text-sm text-gray-500">
            <div>
              {new Date(post.createdAt).toLocaleDateString()} at
              {new Date(post.createdAt).toLocaleTimeString()}
            </div>
            <div class="flex gap-4">
              <span title="Likes">❤️ {formatNumber(post.likeCount)}</span>
              <span title="Reposts">🔄 {formatNumber(post.repostCount)}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  </div>
</div>
