import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const now_playing_endpoint = `https://api.spotify.com/v1/me/player/currently-playing`;

export const GET: RequestHandler = async ({ fetch }) => {
	const fetchToken = await fetch(`/api/accessToken`);
	const token = await fetchToken.text();

	const headers = {
		Authorization: `Bearer ${token}`
	};

	let nowPlaying = null;
	const recentlyPlayed = null;
	let error = null;

	// Fetch currently playing track
	try {
		const nowPlayingRes = await fetch(now_playing_endpoint, { headers });
		// console.log('Now Playing Response Status:', nowPlayingRes.status);

		if (nowPlayingRes.status === 200) {
			const data = await nowPlayingRes.json();
			if (data.is_playing && data.currently_playing_type === 'track') {
				const song = data.item;
				nowPlaying = {
					isPlaying: true,
					song: {
						title: song.name,
						artist: song.artists.map((artist: { name: string }) => artist.name).join(', '),
						album: song.album.name,
						albumImageUrl: song.album.images[0].url,
						songUrl: song.external_urls.spotify
					}
				};
			}
		} else if (nowPlayingRes.status === 401) {
			error = 'Unauthorized: Please re-authenticate with Spotify';
			console.error('Unauthorized access to now playing endpoint');
		}
	} catch (err) {
		console.error('Error fetching now playing:', err);
		error = 'Error fetching now playing track';
	}

	if (!nowPlaying && !recentlyPlayed && !error) {
		error = 'No track data available';
	}

	return json({
		nowPlaying
	});
};
