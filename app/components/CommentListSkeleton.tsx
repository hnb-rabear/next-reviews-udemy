import { getComments } from '@/lib/comments'
import { UserCircleIcon } from '@heroicons/react/20/solid'

async function CommentListSkeleton() {
  return (
    <>
      <ul className="mt-3 animate-pulse rounded border">
        {[1, 2, 3].map((index) => (
          <li key={index} className="border-b px-3 py-2 last:border-none odd:bg-orange-100">
            <div className="flex gap-3 pb-1 text-slate-300">
              <UserCircleIcon className="h-6 w-6" />
              <div className="h-3 w-full rounded bg-slate-300" />
            </div>
            <p className="italic">
              <div className="h-3 w-full rounded bg-slate-300" />
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}
export default CommentListSkeleton
