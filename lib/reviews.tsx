import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import qs from "qs";

const CMS_URL = "http://localhost:1337";

export async function getFeaturedReview() {
	var reviews = getReviews();
	return await getReview(reviews[0]);
}

// export async function getReview(name: string) {
// 	const text = await readFile(`./content/reviews/${name}.md`, "utf-8");
// 	const {
// 		content,
// 		data: { title, date, image, slug },
// 	} = matter(text);
// 	const html = marked(content);
// 	return { slug, title, date, image, html };
// }

// export async function getReviews() {
// 	const slugs = await getSlugs();
// 	const reviews = [];
// 	for (const slug of slugs) {
// 		const review = await getReview(slug);
// 		review.slug = slug;
// 		reviews.push(review);
// 	}
// 	// sort reviews by most recent first
// 	reviews.sort((a, b) => b.date.localeCompare(a.date));
// 	return reviews;
// }

export async function getReview(name: string) {
	const url =
		`${CMS_URL}/api/reviews` +
		"?" +
		qs.stringify(
			{
				fields: ["slug", "title", "subtitle", "publishedAt"],
				populate: { image: { fields: ["url"] } },
				sort: ["publishedAt:desc"],
				pagination: {
					pageSize: 10,
				},
			},
			{ encodeValuesOnly: true }
		);
	const response = await fetch(url);
	const { data } = await response.json();
	const results = data.map(({ attributes }) => {
		return {
			slug: attributes.slug,
			title: attributes.title,
			subtitle: attributes.subtitle,
			date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
			image: CMS_URL + attributes.image.data.attributes.url,
			html: attributes.content,
		};
	});
	return results;
}

export async function getReviews() {
	const url =
		`${CMS_URL}/api/reviews` +
		"?" +
		qs.stringify(
			{
				fields: ["slug", "title", "subtitle", "publishedAt"],
				populate: { image: { fields: ["url"] } },
				sort: ["publishedAt:desc"],
				pagination: {
					pageSize: 10,
				},
			},
			{ encodeValuesOnly: true }
		);
	const response = await fetch(url);
	const { data } = await response.json();
	const results = data.map(({ attributes }) => {
		return {
			slug: attributes.slug,
			title: attributes.title,
			subtitle: attributes.subtitle,
			date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
			image: CMS_URL + attributes.image.data.attributes.url,
		};
	});
	return results;
}

export async function getSlugs() {
	const files = await readdir("./content/reviews/");
	const slugs = files
		.filter((f) => f.endsWith(".md"))
		.map((f) => f.slice(0, -".md".length));
	return slugs;
}
