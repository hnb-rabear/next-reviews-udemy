import { readFile } from "node:fs/promises";
import Heading from "@/app/components/Heading";
import { getReview, getSlugs } from "@/lib/reviews";
import ShareLinkButton from "@/app/components/ShareLinkButton";
import Image from "next/image";

export async function generateStaticParams() {
	const slugs = await getSlugs();
	return slugs.map((slug) => ({
		slug,
	}));
}

export async function generateMetadata(props) {
	const review = await getReview(props.params.slug);
	return {
		title: review.title,
	};
}

const ReviewPage = async (props) => {
	const review = await getReview(props.params.slug);
	return (
		<>
			<Heading>{review.title}</Heading>
			<div className="flex gap-3 items-baseline">
				<p className="italic text-sm">{review.date}</p>
				<ShareLinkButton />
			</div>
			<Image
				src={review.image}
				alt={review.title}
				width={640}
				height={360}
				className="mb-2 rounded pt-2"
			/>
			<article
				dangerouslySetInnerHTML={{ __html: review.body }}
				className="prose prose-slate max-w-screen-sm"
			/>
		</>
	);
};
export default ReviewPage;
