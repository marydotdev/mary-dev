import { PRIVATE_SPOTIFY_CLIENT_ID } from '$env/static/private';
import { PRIVATE_SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { PRIVATE_SPOTIFY_REFRESH_TOKEN } from '$env/static/private';

const client_id = PRIVATE_SPOTIFY_CLIENT_ID;
const client_secret = PRIVATE_SPOTIFY_CLIENT_SECRET;
const refresh_token = PRIVATE_SPOTIFY_REFRESH_TOKEN;
const redirect_uri = "http://localhost:3000/"
const token_endpoint = `https://accounts.spotify.com/api/token`;

export const GET = async () => {
	const { access_token } = await fetch(token_endpoint, {
		method: 'POST',
		headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token,
			redirect_uri,
			client_id,
			client_secret,
		})
	}).then(res => res.json());

	return new Response(access_token)
};
