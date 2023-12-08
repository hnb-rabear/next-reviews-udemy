import { FormEvent, useEffect, useState } from 'react'

export function useIsClient() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return isClient
}

// export function useFormState(action) {
//   const [state, setState] = useState({ loading: false, error: null })
//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     setState({ loading: true, error: null })
//     const form: HTMLFormElement = event.currentTarget
//     const formData = new FormData(form)
//     // console.log('fromData', Array.from(formData.entries()))
//     const result = await action(formData)
//     if (result?.isError) {
//       setState({ loading: false, error: result })
//     } else {
//       form.reset()
//       setState({ loading: false, error: null })
//     }
//     return [state, handleSubmit]
//   }
// }
export interface SubmissionState {
  loading: boolean
  error: ActionError | null
}
export interface ActionError {
  isError: true
  message: string
}
export type ActionFunction = (formData: FormData) => Promise<undefined | ActionError>
export type UseFormStateResult = [
  SubmissionState,
  (event: FormEvent<HTMLFormElement>) => Promise<void>,
]
export function useFormState(action: ActionFunction): UseFormStateResult {
  const [state, setState] = useState<SubmissionState>({ loading: false, error: null })
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setState({ loading: true, error: null })
    const form = event.currentTarget
    const formData = new FormData(form)
    const result = await action(formData)
    if (result?.isError) {
      setState({ loading: false, error: result })
    } else {
      form.reset()
      setState({ loading: false, error: null })
    }
  }
  return [state, handleSubmit]
}
