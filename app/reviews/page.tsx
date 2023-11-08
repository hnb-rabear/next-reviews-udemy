import Link from "next/link";
import Image from "next/image";
import Heading from "@/app/components/Heading";
import { getReviews } from "@/lib/reviews";
import Pagination from "../components/Pagination";

export const metadata = {
	title: "Reviews",
};

const PAGE_SIZE = 10;

const ReviewsPage = async ({ searchParams }) => {
	const { reviews, pageCount } = await getReviews(
		PAGE_SIZE,
		searchParams.page
	);

	const page = parsePageParam(searchParams.page, pageCount);

	console.log(
		`[ReviewPage] Rendering ${reviews
			.map((review) => review.slug)
			.join(", ")}`
	);

	return (
		<>
			<Heading>Reviews</Heading>
			<Pagination href="/reviews" page={page} pageCount={pageCount} />
			<ul className="flex flex-row flex-wrap gap-3">
				{reviews.map((review, index) => (
					<li
						key={review.title}
						className="bg-white border w-80 rounded shadow hover:shadow-lg sm:w-full"
					>
						<Link
							href={`/reviews/${review.slug}`}
							className="flex flex-col gap-2 sm:flex-row"
						>
							<Image
								key={index}
								priority={index === 0}
								src={review.image}
								alt={review.title}
								width={320}
								height={180}
								className="rounded-t sm:rounded-l sm:rounded-t-none"
							></Image>
							<div className="px-2 py-1 text-center sm:text-left">
								<p className="font-orbitron py-1">
									{review.title}
								</p>
								<p className="text-slate-500 hidden pt-2 sm:block">
									{review.subtitle}
								</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
			<div className="mt-3">
				<Pagination href="/reviews" page={page} pageCount={pageCount} />
			</div>
		</>
	);
};

function parsePageParam(paramValue, maxValue) {
	if (paramValue) {
		const parsedValue = parseInt(paramValue, 10);
		if (isFinite(parsedValue) && paramValue > 0) {
			return parsedValue > maxValue ? maxValue : parsedValue;
		}
	}
	return 1;
}

export default ReviewsPage;
