import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import searchData from "./searchData";

export async function getReview(name: string) {
	const text = await readFile(
		process.cwd() + `/public/content/${name}.md`,
		"utf-8"
	);
	const {
		content,
		data: { slug, title, subtitle, image, publishedAt },
	} = matter(text);
	const body = marked(content);
	return {
		slug,
		title,
		subtitle,
		image: image,
		date: publishedAt,
		body,
	};
}

export async function fetchReview(name: string) {
	const currentDomain = process.env.NEXT_PUBLIC_URL;
	const response = await fetch(`${currentDomain}/content/${name}.md`);
	const text = await response.text();
	const {
		content,
		data: { slug, title, subtitle, image, publishedAt },
	} = matter(text);
	const body = marked(content);
	return {
		slug,
		title,
		subtitle,
		image: image,
		date: publishedAt,
		body,
	};
}

export async function getReviews(pageSize, page = 1, staticLoad = true) {
	const slugs = await getSlugs();
	const startIndex = (page - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const reviews = [];
	for (let i = startIndex; i < endIndex && i < slugs.length; i++) {
		const slug = slugs[i];
		let review;
		if (staticLoad) review = await getReview(slug);
		else review = await fetchReview(slug);
		review.slug = slug;
		reviews.push(review);
	}
	// sort reviews by most recent first
	// reviews.sort((a, b) => b.publishedAt.localeCompare(a.date));
	const result = {
		reviews,
		pageCount: Math.ceil(slugs.length / pageSize),
	};
	return result;
}

export async function getSlugs() {
	// get slugs from directory
	// const files = await readdir(process.cwd() + "/public/content/");
	// const slugs = files
	// 	.filter((f) => f.endsWith(".md"))
	// 	.map((f) => f.slice(0, -".md".length));

	// get slugs from searchData
	const slugs = searchData.map((item) => item.slug);
	return slugs;
}

export async function getSearchableReviews() {
	return searchData;
}

export async function searchReviews(query, limit = 10) {
	const result = searchData
		.filter((item) => item.slug.includes(query) || item.title.includes(query))
		.slice(0, limit);
	return result;
}
