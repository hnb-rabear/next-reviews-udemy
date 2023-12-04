import { UserCircleIcon } from '@heroicons/react/20/solid'

const comments = [
  { id: '1', user: 'Alice 1', message: 'Love this game 1!' },
  { id: '2', user: 'Alice 2', message: 'Love this game 2!' },
  { id: '3', user: 'Alice 3', message: 'Love this game 3!' },
  { id: '4', user: 'Alice 4', message: 'Love this game 4!' },
]

function CommentList() {
  return (
    <>
      <ul className="mt-3 rounded border">
        {comments.map((comment) => (
          <li key={comment.id} className="border-b px-3 py-2 last:border-none odd:bg-orange-100">
            <div className="flex gap-3 pb-1 text-slate-500">
              <UserCircleIcon className="h-6 w-6" />
              {comment.user}
            </div>
            <p className="italic">{comment.message}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
export default CommentList
