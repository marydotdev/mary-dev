/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const posts = (await fetch('/api/getBlogPosts')).json();
	return { posts };
}
