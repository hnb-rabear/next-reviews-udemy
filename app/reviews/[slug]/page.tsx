import { notFound } from 'next/navigation'
import Heading from '@/app/components/Heading'
import { getReview, getSlugs } from '@/lib/reviewsStatic'
import ShareLinkButton from '@/app/components/ShareLinkButton'
import Image from 'next/image'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid'
import CommentList from '@/app/components/CommentList'
import CommentForm from '@/app/components/CommentForm'

export async function generateStaticParams() {
  const slugs = await getSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata(props) {
  const review = await getReview(props.params.slug)
  if (!review) {
    notFound()
  }
  return {
    title: review.title,
  }
}

const ReviewPage = async (props) => {
  const slug = props.params.slug
  console.log(`[ReviewPage] Rendering ${slug}`)
  const review = await getReview(slug)
  if (!review) {
    notFound()
  }
  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="pb-3 font-semibold">{review.subtitle}</p>
      <div className="flex items-baseline gap-3">
        <p className="text-sm italic">{review.date.toString()}</p>
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
      <section className="mt-3 max-w-screen-sm border-t border-dashed py-3">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
          Comments
        </h2>
      </section>
      <CommentForm title={review.title} />
      <CommentList slug={review.slug} />
    </>
  )
}
export default ReviewPage
