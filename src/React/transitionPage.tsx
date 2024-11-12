/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
import React, { ChangeEvent, useState, useTransition } from 'react'

const Component = ({ num = 0 }: { num: number }) => {
  const startTime = Date.now()
  while (performance.now() - startTime < 100) {}
  return <div>num:{num}</div>
}

const TransitionUse = () => {
  const [input, setInput] = useState<string>('')
  const [list, setList] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)

    startTransition(() => {
      const newList = Array.from(
        { length: 2000 },
        (_, index) => `${value} - Item ${index + 1}`
      )
      setList(newList)
    })
  }

  return (
    <div>
      <input type='text' value={input} onChange={handleChange} />
      {isPending ? <p>Loading...</p> : null}
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function TransitionUse2() {
  const [count, setCount] = React.useState(0)
  const [isPending, startTransition] = React.useTransition()

  const plus = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <h2>transitionPage</h2>
      <div>
        <div>count:{count}</div>
        <button onClick={plus}>+1</button>
        <div>{/* <Component num={count} /> */}</div>
      </div>
    </div>
  )
}

export default function TransitionPage() {
  return (
    <div className='w-screen border m-2 p-2 rounded-md'>
      <TransitionUse />
      {/* <TransitionUse2 /> */}
    </div>
  )
}
