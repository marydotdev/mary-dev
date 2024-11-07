// src/lib/bluesky.ts
import { AtpAgent } from '@atproto/api'

export const agent = new AtpAgent({
  service: 'https://bsky.social'
})

const BSKY_USERNAME = 'mary.dev'
const BSKY_APP_PASSWORD = 'd5oq-wyam-wdhz-o3og'

let isAuthenticated = false

export async function ensureAuth() {
  if (!isAuthenticated) {
    try {
      await agent.login({
        identifier: BSKY_USERNAME,
        password: BSKY_APP_PASSWORD
      })
      isAuthenticated = true
    } catch (error) {
      console.error('Authentication failed:', error)
      throw new Error('Failed to authenticate with Bluesky')
    }
  }
}

export interface Post {
  uri: string
  cid: string
  author: {
    did: string
    handle: string
    displayName?: string
    avatar?: string
  }
  text: string
  createdAt: string
  indexedAt: string
  hasImages: boolean
  hasVideo: boolean
  media?: Array<{
    type: 'image' | 'video'
    alt: string
    url: string
    poster?: string // Thumbnail for videos
  }>
  likeCount: number
  repostCount: number
  externalLinks: string[]
}


export async function getAuthorFeed(handle: string): Promise<Post[]> {
	try {
		await ensureAuth();

		const response = await agent.getAuthorFeed({ actor: handle });
		return response.data.feed.map((item) => {
			// Safely extract post data with null checks
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

				// Handle any kind of embed
				if (item.post.embed) {
					// Handle images
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

				// Extract external links
				const urlRegex = /(https?:\/\/[^\s]+)/g;
				post.externalLinks = post.text.match(urlRegex) || [];
			} catch (e) {
				console.error('Error processing post attachments:', e);
				console.log('Problematic post:', item);
			}

      console.log(post.media)

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



