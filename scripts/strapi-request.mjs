import { writeFileSync } from "node:fs";
import qs from 'qs';

const url = "http://localhost:1337/api/reviews"
    + "?" + qs.stringify({
        filters: { slug: { $eq: "hollow-knight" } },
        fields: ["slug", "title", "subtitle", "publishedAt", "body"],
        populate: { image: { fields: ["url"] } },
        pagination: {
            pageSize: 6,
            page: 1,
            withCount: true
        }
    }, { encodeValuesOnly: true });
const response = await fetch(url);
const body = await response.json();
const fomratted = JSON.stringify(body, null, 2);
const file = 'scripts/strapi-response.json';
writeFileSync(file, fomratted, "utf-8");