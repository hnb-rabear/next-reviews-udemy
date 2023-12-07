'use client'
import { useState } from 'react'
import { submitComment } from '../reviews/[slug]/action'

function CommentForm({ slug, title }) {
  const [state, setState] = useState({ loading: false, error: null })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setState({ loading: true, error: null })
    const form: HTMLFormElement = event.currentTarget
    const formData = new FormData(form)
    const user = formData.get('user') as string
    const message = formData.get('message') as string
    // console.log('fromData', Array.from(formData.entries()))
    const result = await submitComment({ slug, user, message })
    if (result?.isError) {
      setState({ loading: false, error: result.message })
    } else {
      form.reset()
      setState({ loading: false, error: null })
    }
    return result
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 flex flex-col gap-2 rounded border bg-white px-3 py-2"
    >
      <p className="pb-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <input type="hidden" name="slug" value={slug} />
      <div className="flex">
        <label htmlFor="userField" className="w-32 shrink-0">
          Your name
        </label>
        <input
          type="userField"
          name="user"
          required
          maxLength={50}
          placeholder="Enter your name"
          className="w-full rounded border px-2 py-1"
        />
      </div>
      <div className="flex">
        <label htmlFor="messageField" className="w-32 shrink-0">
          Your comment
        </label>
        <textarea
          id="messageField"
          name="message"
          required
          maxLength={500}
          className="w-full rounded border px-2 py-1"
        />
      </div>
      {state.error && <p className="text-red-500">{state.error}</p>}
      <button
        type="submit"
        disabled={state.loading}
        className="w-32 self-center rounded bg-orange-800 px-2 py-1 text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-500"
      >
        Submit
      </button>
    </form>
  )
}
export default CommentForm
