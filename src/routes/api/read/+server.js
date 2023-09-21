import { parseHTML } from 'linkedom'
import { json } from '@sveltejs/kit'


/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const html = await getBooks()
	return json(parseBooks(html))
}

async function getBooks() {
	const api = `https://www.goodreads.com/review/list/107866526-mary-haedrich?per_page=40&shelf=read&shelves=read&utf8=%E2%9C%93`
	const response = await fetch(api)

	if (!response.ok) {
		throw new Error(`Failed to fetch: ${response.status}`)
	}

	return await response.text()
}

/**
 * @param {string} html
 */
function parseBooks(html) {
	const { document } = parseHTML(html)

	const rows = document.querySelectorAll('tbody > tr')

	const books = []

	for (const row of rows) {
    let title = row.querySelector('td.title')?.innerText.trim()
    let author = row.querySelector('td.author')?.innerText.trim()
    let cover = row.querySelector('td.cover img')?.src
    let dateRead = row.querySelector('td.date_read')?.innerText.trim()
    const urlElement = row.querySelector('td.title a');
    const url = urlElement ? urlElement.href : ''; // Extract the href attribute

    // Clean up the extracted values
    title = title ? title.replace("title\n  ", "").trim() : "";
    author = author ? author.replace("author\n ", "").replace(/\*$/, "").trim() : "";
    dateRead = dateRead ? dateRead.replace("date read\n \n \n ", "").replace("not set", "").trim() : "";
    cover = cover ? cover.replace("_SY75_", "_SY180_") : "";

    if (title && author) {
      const book = {
        title,
        author,
        cover,
        dateRead,
        url
      }
      books.push(book)
    }
  }


  // console.log(books)
	return books
}
