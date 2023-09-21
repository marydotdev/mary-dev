const top_artists_endpoint = `https://api.spotify.com/v1/me/top/artists`;

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch }) {
  const fetchToken = await fetch(`/api/accessToken`);
  const token = await fetchToken.text();

  const response = await fetch(top_artists_endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  return new Response(JSON.stringify(data));
}
