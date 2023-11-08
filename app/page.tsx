import { getReviews } from "@/lib/reviews";
import Heading from "./components/Heading";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
	const reviews = await getReviews(4);
	console.log(
		`[HomePage] Rendering ${reviews
			.map((review) => review.slug)
			.join(", ")}`
	);
	return (
		<>
			<Heading>Indie Games</Heading>
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
		</>
	);
}
