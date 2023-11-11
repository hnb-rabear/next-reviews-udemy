import { NextResponse } from "next/server";
import { searchData } from "@/lib/searchData";

export async function GET(request) {
	const query = request.nextUrl.searchParams.get("query");
	const results = searchData.filter((item) => {
		return item.slug.includes(query) || item.title.includes(query);
	});
	return NextResponse.json(results);
}
