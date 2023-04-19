// import { VITE_SPOTIFY_CLIENT_ID } from '$env/static/private';
// import { VITE_SPOTIFY_CLIENT_VITE } from '$env/static/private';
// import { VITE_SPOTIFY_REFRESH_TOKEN } from '$env/static/private';

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_VITE = import.meta.env.VITE_SPOTIFY_CLIENT_VITE;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;
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
			client_VITE,
		})
	}).then(res => res.json());

	return new Response(access_token)
};
