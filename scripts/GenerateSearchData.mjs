import { writeFileSync } from "node:fs";
import qs from 'qs';

const url = "http://localhost:1337/api/reviews"
    + "?" + qs.stringify({
        fields: ["slug", "title"],
        sort: ['title:asc'],
        pagination: {
            pageSize: 1000,
            page: 1,
        }
    }, { encodeValuesOnly: true });
const response = await fetch(url);
const body = await response.json();
const searchData = body.data.map(({ attributes }) => attributes);

writeFileSync('lib/searchData.js', `export const searchData = ${JSON.stringify(searchData, null, 2)};
export default searchData;`, 'utf-8');