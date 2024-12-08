// src/routes/api/posts/[handle]/+server.ts
import { BskyAgent } from '@atproto/api';
import { error, json } from '@sveltejs/kit';
import { BLUESKY_USERNAME, BLUESKY_PASSWORD } from '$env/static/private';

// Cache configuration
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

interface CacheEntry {
	data: any;
	timestamp: number;
}

// Global state
let agent: BskyAgent | null = null;
let lastAuthTime = 0;
let rateLimitReset = 0;
const feedCache = new Map<string, CacheEntry>();

function getRateLimitResetFromHeaders(headers: any): number {
	const resetTime = headers['ratelimit-reset'];
	if (resetTime) {
		// Convert reset time to milliseconds and add a buffer
		return parseInt(resetTime) * 1000;
	}
	// Default to 6 hours from now if we can't get the reset time
	return Date.now() + 6 * 60 * 60 * 1000;
}

function isRateLimited(): boolean {
	if (rateLimitReset > Date.now()) {
		const waitSeconds = Math.ceil((rateLimitReset - Date.now()) / 1000);
		throw error(429, `Rate limited. Please try again in ${waitSeconds} seconds`);
	}
	return false;
}

async function getFromCacheOrFetch(handle: string) {
	// Check cache first
	const cached = feedCache.get(handle);
	if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
		return cached.data;
	}

	// If we're rate limited, throw error
	if (isRateLimited()) {
		return null;
	}

	// No cache or expired, need to fetch
	if (!agent) {
		agent = new BskyAgent({
			service: 'https://bsky.social'
		});
	}

	try {
		// Check if we need to authenticate
		if (!agent.session || Date.now() - lastAuthTime > 45 * 60 * 1000) {
			await agent.login({
				identifier: BLUESKY_USERNAME,
				password: BLUESKY_PASSWORD
			});
			lastAuthTime = Date.now();
		}

		const response = await agent.getAuthorFeed({
			actor: handle,
			limit: 20
		});

		// Cache the successful response
		feedCache.set(handle, {
			data: response.data,
			timestamp: Date.now()
		});

		return response.data;
	} catch (err: any) {
		console.error('API Error:', err);

		if (err.status === 429) {
			// Update rate limit reset time
			rateLimitReset = getRateLimitResetFromHeaders(err.headers);

			// Clear agent on rate limit
			agent = null;
			lastAuthTime = 0;

			// Try to return cached data even if expired
			const staleCache = feedCache.get(handle);
			if (staleCache) {
				return staleCache.data;
			}

			throw error(
				429,
				`Rate limited. Please try again in ${Math.ceil(
					(rateLimitReset - Date.now()) / 1000
				)} seconds`
			);
		}

		throw err;
	}
}

export async function GET({ params }) {
	try {
		const { handle } = params;
		const data = await getFromCacheOrFetch(handle);

		return json(data);
	} catch (err: any) {
		console.error('Error in GET handler:', err);

		if (err.status === 429) {
			return json(
				{
					error: 'Rate limit exceeded',
					retryAfter: Math.ceil((rateLimitReset - Date.now()) / 1000),
					cached: false
				},
				{ status: 429 }
			);
		}

		throw error(err.status || 500, err.body?.message || err.message || 'Failed to fetch posts');
	}
}

// Clean up old cache entries periodically
const cleanup = setInterval(() => {
	const now = Date.now();
	for (const [handle, entry] of feedCache.entries()) {
		if (now - entry.timestamp > CACHE_DURATION) {
			feedCache.delete(handle);
		}
	}
}, CACHE_DURATION);

// Cleanup on hot module reload
if (import.meta.hot) {
	import.meta.hot.dispose(() => {
		clearInterval(cleanup);
		agent = null;
	});
}
