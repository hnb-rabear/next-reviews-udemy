import { marked } from "marked";
import qs from "qs";

export const CMS_URL = "http://localhost:1337";
export const CACHE_TAG_REVIEW = "review";

// export async function getFeaturedReview() {
// 	var reviews = getReviews(1);
// 	return await getReview(reviews[0]);
// }

// export async function getReview(name: string) {
// 	const text = await readFile(`./content/reviews/${name}.md`, "utf-8");
// 	const {
// 		content,
// 		data: { title, date, image, slug },
// 	} = matter(text);
// 	const body = marked(content);
// 	return { slug, title, date, image, body };
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

export async function getReview(slug) {
	const { data, meta } = await fetchReviews({
		filters: { slug: { $eq: slug } },
		fields: ["slug", "title", "subtitle", "publishedAt", "body"],
		populate: { image: { fields: ["url"] } },
		pagination: {
			pageSize: 1,
		},
	});
	if (data.length === 0) return null;
	const item = data[0];
	return {
		...toReview(item),
		body: marked(item.attributes.body),
	};
}

export async function getReviews(pageSize, page) {
	const { data, meta } = await fetchReviews({
		fields: ["slug", "title", "subtitle", "publishedAt"],
		populate: { image: { fields: ["url"] } },
		sort: ["publishedAt:desc"],
		pagination: {
			pageSize,
			page,
		},
	});
	const results = {
		reviews: data.map(toReview),
		pageCount: meta.pagination.pageCount,
	};
	return results;
}

async function fetchReviews(params) {
	const url =
		`${CMS_URL}/api/reviews?` +
		qs.stringify(params, { encodeValuesOnly: true });
	const response = await fetch(url, {
		// cache: "no-store",
		next: {
			// revalidate: 600,
			tags: [CACHE_TAG_REVIEW],
		},
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status} for ${url}`);
	}
	return await response.json();
}

// export async function getSlugs() {
// 	const files = await readdir("./content/reviews/");
// 	const slugs = files
// 		.filter((f) => f.endsWith(".md"))
// 		.map((f) => f.slice(0, -".md".length));
// 	return slugs;
// }

export async function getSlugs() {
	const { data } = await fetchReviews({
		fields: ["slug"],
		sort: ["publishedAt:desc"],
		pagination: {
			pageSize: 100,
		},
	});
	return data.map((item) => item.attributes.slug);
}

export async function getSearchableReviews() {
	const { data } = await fetchReviews({
		fields: ["slug", "title"],
		sort: ["publishedAt:desc"],
		pagination: {
			pageSize: 100,
		},
	});
	return data.map((item) => ({
		slug: item.attributes.slug,
		title: item.attributes.title,
	}));
}

export async function searchReviews(query) {
	const { data } = await fetchReviews({
		filters: {
			title: { $contains: query },
			slug: { $contains: query },
		},
		fields: ["slug", "title"],
		sort: ["title"],
		pagination: {
			pageSize: 7,
		},
	});
	return data.map((item) => ({
		slug: item.attributes.slug,
		title: item.attributes.title,
	}));
}

function toReview(item) {
	const { attributes } = item;
	return {
		slug: attributes.slug,
		title: attributes.title,
		subtitle: attributes.subtitle,
		date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
		image: CMS_URL + attributes.image.data.attributes.url,
	};
}
