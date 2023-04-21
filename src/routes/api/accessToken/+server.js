import { SPOTIFY_CLIENT_ID } from '$env/static/private';
// import { VITE_SPOTIFY_CLIENT_VITE } from '$env/static/private';
// import { VITE_SPOTIFY_REFRESH_TOKEN } from '$env/static/private';

const client_id = SPOTIFY_CLIENT_ID;

// const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_VITE;
// const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

//const client_id = '718de912f7cc4c56adcc4390e4947ae7';
const client_secret = 'bd03e81580034cd29b78c07426c6dac2';
const refresh_token = 'AQC2McBQYhX1egJUHYGKERqB-6258QpMzaGFY5a-VgkUzCGEsf_Oe-jpO06Ofu6sKaACiVh1GT0W3YeRob806c3bFbvefG2dfr9ejcuRYOPjdclC9dC8jiPeOoY-ANFYAzE';
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
