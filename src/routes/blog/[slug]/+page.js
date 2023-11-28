/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  const { slug } = params;
	const response = await fetch(`/api/getBlogPosts/${slug}`);
	const post = await response.json(); // Make sure to await the json() call
	return { post };
}
