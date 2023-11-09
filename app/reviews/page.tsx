import Link from "next/link";
import Image from "next/image";
import Heading from "@/app/components/Heading";
import { getReviews, getSearchableReviews } from "@/lib/reviews";
import Pagination from "../components/Pagination";
import SearchBox from "../components/SearchBox";

export const metadata = {
	title: "Reviews",
};

const PAGE_SIZE = 10;

const ReviewsPage = async ({ searchParams }) => {
	const { reviews, pageCount } = await getReviews(
		PAGE_SIZE,
		searchParams.page
	);
	const searchableReviews = await getSearchableReviews();

	const page = parsePageParam(searchParams.page, pageCount);

	console.log(
		`[ReviewPage] Rendering ${reviews
			.map((review) => review.slug)
			.join(", ")}`
	);
	// console.log(
	// 	"reviews: ",
	// 	reviews.map(({ slug, title }) => ({ slug, title }))
	// );

	return (
		<>
			<Heading>Reviews</Heading>
			<div className="flex justify-between items-center">
				<SearchBox reviews={searchableReviews} />
				<Pagination href="/reviews" page={page} pageCount={pageCount} />
			</div>
			<ul className="flex flex-row flex-wrap gap-3 pt-2">
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
								className="rounded-t sm:rounded-l sm:rounded-r-none"
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
			<div className="mt-3 flex justify-end">
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
