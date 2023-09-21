// const top_artists_endpoint = `https://api.spotify.com/v1/me/top/artists`;


// /** @type {import('./$types').PageLoad} */
// export async function load({ fetch }) {
//     const fetchToken = await fetch(`/api/accessToken`);
//     const token = await fetchToken.text();
//     console.log(token)

//     const data = await fetch(top_artists_endpoint, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }).then(res => res.json());

// 	return {
// 		status: 200,
// 		body: {top_artists: data.items},
// 	}
//   }

