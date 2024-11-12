import React, { useState, useTransition } from 'react'

const updateName = async (name: string) => {
  // simulate an error
  if (name === 'error') {
    return 'Error updating name'
  }

  // simulate a delay
  return new Promise((resolve) => setTimeout(() => resolve('ok'), 1000))
}

export default function DelayUpdatePage() {
  const [name, setName] = useState('')

  const [error, setError] = useState('')

  const [isPending, startTransition] = useTransition()

  const handleSubmit = async () => {
    const fn = async () => {
      try {
        const ok = await updateName(name)
        console.log(ok)
      } catch (error) {
        setError(error as string)
      }
    }
    startTransition(() => {
      fn()
    })
  }

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  )
}
