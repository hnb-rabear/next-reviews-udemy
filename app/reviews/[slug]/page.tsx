import { notFound } from "next/navigation";
import Heading from "@/app/components/Heading";
import { getReview, getSlugs } from "@/lib/reviewsStatic";
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
	if (!review) {
		notFound();
	}
	return {
		title: review.title,
	};
}

const ReviewPage = async (props) => {
	const slug = props.params.slug;
	console.log(`[ReviewPage] Rendering ${slug}`);
	const review = await getReview(slug);
	if (!review) {
		notFound();
	}
	return (
		<>
			<Heading>{review.title}</Heading>
			<p className="font-semibold pb-3">{review.subtitle}</p>
			<div className="flex gap-3 items-baseline">
				<p className="italic text-sm">{review.date.toString()}</p>
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
