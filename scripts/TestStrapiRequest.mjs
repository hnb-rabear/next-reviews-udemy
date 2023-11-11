import { writeFileSync } from "node:fs";
import qs from "qs";

const CMS_URL = "http://localhost:1337";

async function generateMdData() {
    const url =
        CMS_URL +
        "/api/reviews" +
        "?" +
        qs.stringify(
            {
                //fields: ["slug", "title", "subtitle", "publishedAt", "body"],
                sort: ["publishedAt:desc"],
                populate: { image: { fields: ["url"] } },
                pagination: {
                    pageSize: 100,
                    page: 1,
                    withCount: true,
                },
            },
            { encodeValuesOnly: true }
        );
    const response = await fetch(url);
    const { data } = await response.json();
    data.map(async ({ attributes }) => {
        const slug = attributes.slug;
        const title = attributes.title;
        const subtitle = attributes.subtitle;
        const image = attributes.image.data.attributes.url;
        const body = attributes.body;
        const publishedAt = attributes.publishedAt.slice(
            0,
            "yyyy-mm-dd".length
        );
        const createdAt = attributes.createdAt.slice(0, "yyyy-mm-dd".length);
        const updatedAt = attributes.updatedAt.slice(0, "yyyy-mm-dd".length);

        writeFileSync(
            `content/${slug}.md`,
            `---
slug: ${slug}
title: "${title}"
subtitle: "${subtitle}"
image: ${image}
publishedAt: ${publishedAt}
createdAt: ${createdAt}
updatedAt: ${updatedAt}
---

${body}`,
            "utf-8"
        );

        await downloadImage(CMS_URL + image, `public/images/${slug}.png`);
    });
}

async function downloadImage(url, outputPath) {
    try {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        writeFileSync(outputPath, Buffer.from(buffer));
        console.log(`Image ${url} downloaded successfully!`);
    } catch (error) {
        console.error(`Error downloading image ${url}:`, error);
    }
}

generateMdData();

// const fomratted = JSON.stringify(attributes, null, 2);
// const file = 'scripts/StrapiResponse.json';
// writeFileSync(file, fomratted, "utf-8");
