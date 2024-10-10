import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'fs';
import path from 'path';

const now_playing_endpoint = `https://api.spotify.com/v1/me/player/currently-playing`;
const lastPlayedFile = process.env.VERCEL
	? path.join('/tmp', 'last_played.json')
	: path.join(process.cwd(), 'last_played.json');

interface LastPlayedTrack {
    song: {
        title: string;
        artist: string;
        album: string;
        albumImageUrl: string;
        songUrl: string;
    };
    lastPlayedAt: string;
}

function saveLastPlayed(track: LastPlayedTrack) {
    fs.writeFileSync(lastPlayedFile, JSON.stringify(track));
}

function getLastPlayed(): LastPlayedTrack | null {
    if (fs.existsSync(lastPlayedFile)) {
        const data = fs.readFileSync(lastPlayedFile, 'utf8');
        return JSON.parse(data);
    }
    return null;
}

export const GET: RequestHandler = async ({ fetch }) => {
	const fetchToken = await fetch(`/api/accessToken`);
	const token = await fetchToken.text();

	const headers = {
		Authorization: `Bearer ${token}`
	};

	const nowPlayingRes = await fetch(now_playing_endpoint, { headers });

	if (nowPlayingRes.status === 200) {
		const data = await nowPlayingRes.json();
		const isPlaying = data.is_playing;
		const trackType = data.currently_playing_type;

		if (isPlaying && trackType === 'track') {
			const song = data.item;
			const currentTrack: LastPlayedTrack = {
				song: {
					title: song.name,
					artist: song.artists.map((artist: { name: string }) => artist.name).join(', '),
					album: song.album.name,
					albumImageUrl: song.album.images[0].url,
					songUrl: song.external_urls.spotify
				},
				lastPlayedAt: new Date().toISOString()
			};
			saveLastPlayed(currentTrack);
			return json({
				isPlaying,
				trackType,
				song: currentTrack.song
			});
		}
	}

	// If no track is currently playing, return the last played track
	const lastPlayed = getLastPlayed();
	if (lastPlayed) {
		return json({
			isPlaying: false,
			trackType: 'track',
			song: lastPlayed.song,
			lastPlayedAt: lastPlayed.lastPlayedAt
		});
	}

	// If no current or last played track is found
	return json({ isPlaying: false, noRecentTracks: true });
};
