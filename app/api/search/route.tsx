import { NextResponse } from "next/server";
import { searchData } from "./searchData.js";

export async function GET(request) {
	const query = request.nextUrl.searchParams.get("query");
	const results = searchData.filter((item) => {
		return item.slug.includes(query) || item.title.includes(query);
	});
	return NextResponse.json(results);
}
