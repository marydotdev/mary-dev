/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const posts = (await fetch('/api/getPosts')).json();
	return { posts };
}
