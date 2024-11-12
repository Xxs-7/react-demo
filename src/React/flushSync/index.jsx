/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

export default function Demo() {
  let [count, setCount] = useState(0)
  let countCache = useRef(count)
  countCache.current = count

  const handle = () => {
    setCount(count + 1)
    console.log(count)
    console.log(countCache)
  }

  const handleWithTimeout = () => {
    setTimeout(() => {
      handle()
    }, 0)
  }

  const handleWithFlushSync = () => {
    flushSync(() => {
      setCount(count + 1)
      console.log(count)
    })
    console.log(count)
    console.log(countCache)
  }

  const handleRef = () => {
    console.log(countCache)
  }

  return (
    <div className='container mx-auto bg-gray-300 min-h-screen'>
      <button className='p-1 m-1 rounded bg-black ' onClick={handle}>
        normal
      </button>
      <button className='p-1 m-1 rounded bg-black ' onClick={handleWithTimeout}>
        timeout
      </button>
      <button
        className='p-1 m-1 rounded bg-black '
        onClick={handleWithFlushSync}
      >
        flushSync
      </button>
      <button className='p-1 m-1 rounded bg-black ' onClick={handleRef}>
        ref
      </button>
      <div className='p-1 m-1 bg-black'>{count}</div>
    </div>
  )
}
