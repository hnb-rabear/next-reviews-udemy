import Link from "next/link";
import Heading from "@/app/components/Heading";
import { getReviews } from "@/lib/reviews";

export const metadata = {
	title: "Reviews",
};

const ReviewsPage = async () => {
	const reviews = await getReviews();

	return (
		<>
			<Heading>Reviews</Heading>
			<ul className="flex flex-row flex-wrap gap-3">
				{reviews.map((review) => (
					<li
						key={review.title}
						className="bg-white border w-80 rounded shadow hover:shadow-lg"
					>
						<Link
							href={`/reviews/${review.slug}`}
							className="flex flex-col gap-2 "
						>
							<img
								src={review.image}
								alt={review.title}
								width={320}
								height={180}
								className="rounded-t sm:rounded-l sm:rounded-t-none"
							></img>
							<p className="font-orbitron py-1 text-center">
								{review.title}
							</p>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};
export default ReviewsPage;
