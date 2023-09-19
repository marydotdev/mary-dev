/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const books = (await fetch("/api/read")).json()
	return { books }
}
