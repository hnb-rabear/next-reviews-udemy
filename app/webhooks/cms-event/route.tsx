import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { CACHE_TAG_REVIEW } from "@/lib/reviews";

export async function POST(request) {
	const payload = await request.json();
	if (payload.model === "review") {
		revalidateTag(CACHE_TAG_REVIEW);
		console.log("payload", payload);
	}
	return new Response(null, { status: 204 });
}

// export async function GET(request) {
//     return NextResponse.json({ healthy: true });
// }
