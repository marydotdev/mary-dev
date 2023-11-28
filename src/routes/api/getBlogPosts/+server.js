import { Client } from '@notionhq/client';

const notion = new Client({ auth: import.meta.env.VITE_NOTION_KEY });

export const GET = async () => {
	const blogPostQuery = await notion.databases.query({
		database_id: import.meta.env.VITE_NOTION_BLOG_DB,
		filter: {
			property: 'Published',
			checkbox: {
				equals: true
			}
		}
	});

	if (blogPostQuery?.results.length === 0) {
		return {
			status: 404,
			body: { message: 'Sorry, there are no blog posts yet' }
		};
	}

	const postFrontmatters = blogPostQuery.results.map((post) => {
		const frontmatter = {
			id: post.id,
			title: post.properties.Title.title[0].plain_text,
			description: post.properties.Description.rich_text[0].plain_text,
			date: post.properties.Date.date.start,
			slug: post.properties.Slug.rich_text[0].plain_text,
			cover: post.cover.external.url
		};

		return frontmatter;
	});

	// sort the posts by date
	const sortedPostFrontmatters = postFrontmatters.sort((a, b) => {
		return new Date(b.date).valueOf() - new Date(a.date).valueOf();
	});

	const res = JSON.stringify(sortedPostFrontmatters);

	return new Response(res);
};
