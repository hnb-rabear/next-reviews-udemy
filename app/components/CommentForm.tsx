function CommentForm({ title }) {
  return (
    <>
      <form className="mt-3 flex flex-col gap-2 rounded border bg-white px-3 py-2">
        <p className="pb-1">
          Already played <strong>{title}</strong>? Have your say!
        </p>
        <div className="flex">
          <label htmlFor="userField" className="w-32 shrink-0">
            Your name
          </label>
          <input
            type="userField"
            placeholder="Enter your name"
            className="w-full rounded border px-2 py-1"
          />
        </div>
        <div className="flex">
          <label htmlFor="messageField" className="w-32 shrink-0">
            Your comment
          </label>
          <textarea id="messageField" className="w-full rounded border px-2 py-1" />
        </div>
        <button
          type="submit"
          className="w-32 self-center rounded bg-orange-800 px-2 py-1 text-white hover:bg-orange-700"
        >
          Submit
        </button>
      </form>
    </>
  )
}
export default CommentForm
