import { parseHTML } from 'linkedom';
import fs from 'fs/promises';
import path from 'path';

async function getBooks() {
    const api = `https://www.goodreads.com/review/list/107866526-mary-haedrich?per_page=40&shelf=read&shelves=read&utf8=%E2%9C%93`;
    const response = await fetch(api);

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }

    return await response.text();
}

function parseBooks(html) {
    const { document } = parseHTML(html);
    const rows = document.querySelectorAll('tbody > tr');
    const books = [];

    for (const row of rows) {
        let title = row.querySelector('td.title')?.textContent.trim();
        let author = row.querySelector('td.author')?.textContent.trim();
        let cover = row.querySelector('td.cover img')?.getAttribute('src');
        let dateRead = row.querySelector('td.date_read')?.textContent.trim();
        const urlElement = row.querySelector('td.title a');
        const url = urlElement ? urlElement.getAttribute('href') : '';

        title = title ? title.replace("title\n  ", "").trim() : "";
        author = author ? author.replace("author\n ", "").replace(/\*$/, "").trim() : "";
        dateRead = dateRead ? dateRead.replace("date read\n \n \n ", "").replace("not set", "").trim() : "";
        cover = cover ? cover.replace('_SY75_', '_SY180_').replace('_SX50_', '_SY180_') : '';

        if (title && author) {
            books.push({ title, author, cover, dateRead, url });
        }
    }

    return books;
}

async function fetchAndStoreBooks() {
    try {
        const html = await getBooks();
        const books = parseBooks(html);
        const jsonData = JSON.stringify(books, null, 2);

        const filePath = path.join(process.cwd(), 'src', 'lib', 'recentlyReadBooks.json');
        await fs.writeFile(filePath, jsonData, 'utf8');

        console.log('Recently read books data has been updated and stored.');
    } catch (error) {
        console.error('Error fetching or storing books:', error);
    }
}

fetchAndStoreBooks();
