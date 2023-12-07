'use server'
import { createComment } from '@/lib/comments'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function submitComment(formData) {
  if (!formData.get('user') || !formData.get('message')) {
    return { isError: true, message: 'Please enter your name and comment' }
  }
  const data = {
    slug: formData.get('slug'),
    user: formData.get('user'),
    message: formData.get('message'),
  }
  const comment = await createComment(data)
  const url = `/reviews/${data.slug}`
  revalidatePath(url)
  redirect(url)
}
