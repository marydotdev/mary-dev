import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { mdToHtml } from '$lib/markdown';

const notion = new Client({ auth: import.meta.env.VITE_NOTION_KEY });
const n2md = new NotionToMarkdown({ notionClient: notion });

export const GET = async ({ params }) => {
	const { slug } = params;
	const blogPostQuery = await notion.databases.query({
		database_id: import.meta.env.VITE_NOTION_BLOG_DB, //
		filter: {
			property: 'Slug',
			rich_text: {
				equals: slug
			}
		}
	});

	if (blogPostQuery?.results.length === 0) {
		return {
			status: 404,
			body: { message: 'Sorry, there are no blog posts yet' }
		};
	}

	const blogPostNotionResponse = blogPostQuery.results[0];
	const mdBlocks = await n2md.pageToMarkdown(blogPostNotionResponse.id);
	// change code indentation to 2 spaces
	mdBlocks.forEach((block) => {
		if (block.type === 'code') {
			block.parent = block.parent.replace(/\t/g, '  ');
		}
	});
	const mdString = n2md.toMarkdownString(mdBlocks).parent.replace(/```plain text/g, '```txt');

	// const htmlString = mdToHtml(mdString);
  const htmlString = mdToHtml(mdString).replace(
		/<a href=/g,
		`<a rel="noopener noreferrer" target="_blank" href=`
	);

	// // write outputs to some test files to see what they look like
	// fs.writeFile("test.md", mdString, () => {
	// 	console.log("reponse md file written");
	// });

	// fs.writeFile("test.html", htmlString, () => {
	// 	console.log("reponse html file written");
	// });

	const frontmatter = {
		id: blogPostNotionResponse.id,
		title: blogPostNotionResponse.properties.Title.title[0].plain_text,
		description: blogPostNotionResponse.properties.Description.rich_text[0].plain_text,
		date: blogPostNotionResponse.properties.Date.date.start,
		slug: blogPostNotionResponse.properties.Slug.rich_text[0].plain_text,
		cover: blogPostNotionResponse.cover.external.url
	};

	const blogPost = {
		frontmatter,
		content: htmlString
	};

	// return {
	// 	body: blogPost
	// };

	const res = JSON.stringify(blogPost);

	return new Response(res);
};
