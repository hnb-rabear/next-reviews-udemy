'use server'
import { createComment } from '@/lib/comments'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function submitComment({
  slug,
  user,
  message,
}: {
  slug: string
  user: string
  message: string
}) {
  const data = {
    slug: slug,
    user: user,
    message: message,
  }
  const error = validate(data)
  if (error) {
    return { isError: true, message: error }
  }

  await createComment(data)
  const url = `/reviews/${data.slug}`
  revalidatePath(url)
  redirect(url)
}

function validate(data): string | undefined {
  if (!data.user) {
    return 'Name field is required'
  }
  if (data.user.length > 50) {
    return 'Name field cannot be longer than 50 characters'
  }
  if (!data.message) {
    return 'Comment field is required'
  }
  if (data.message.length > 500) {
    return 'Comment field cannot be longer than 500 characters'
  }
}