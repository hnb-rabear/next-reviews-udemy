import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

export async function getFeaturedReview() {
	var reviews = getReviews();
	return await getReview(reviews[0]);
}

export async function getReview(name: string) {
	const text = await readFile(`./content/reviews/${name}.md`, "utf-8");
	const {
		content,
		data: { title, date, image },
	} = matter(text);
	const html = marked(content, { mangle: true, headerIds: false });
	return { title, date, image, html };
}

export async function getReviews() {
	const slugs = await getSlugs();
	const reviews = [];
	for (const slug of slugs) {
		const review = await getReview(slug);
		review.slug = slug;
		reviews.push(review);
	}
	// sort reviews by most recent first
	reviews.sort((a, b) => b.date.localeCompare(a.date));
	return reviews;
}

export async function getSlugs() {
	const files = await readdir("./content/reviews/");
	const slugs = files
		.filter((f) => f.endsWith(".md"))
		.map((f) => f.slice(0, -".md".length));
	return slugs;
}
