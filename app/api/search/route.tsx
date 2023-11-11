import { searchReviews } from "@/lib/reviewsStatic";
import { NextResponse } from "next/server";

export async function GET(request) {
	const query = request.nextUrl.searchParams.get("query");
	const reviews = await searchReviews(query);
	return NextResponse.json(reviews);
}
