/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  Suspense,
  useDeferredValue,
  useState,
  useTransition,
} from 'react'
import { flushSync } from 'react-dom'

function BatchUpdateUse() {
  const [count, setCount] = React.useState(0)
  const onPlus = () => {
    setCount(count + 1)
    // 结果覆盖了前者
    setCount(count + 2)
  }

  const onPlusWithSync = () => {
    // 结果覆盖了前者
    setCount(count + 1)
    flushSync(() => {
      setCount(count + 2)
    })
  }

  return (
    <div>
      <div>count:{count}</div>
      <button className='px-2 border rounded-md' onClick={onPlus}>
        +1
      </button>
      <button className='px-2 border rounded-md' onClick={onPlusWithSync}>
        +1 with sync
      </button>
    </div>
  )
}

function FlushSyncUse() {
  const [count, setCount] = React.useState(0)
  const onPlus = () => {
    console.log('before:', count)
    setCount(count + 1)
    console.log('after:', count)
  }

  const onPlusWithSync = () => {
    console.log('before:', count)
    // flushSync 确保 setCount 的更新在函数执行时立即生效，而不是在事件处理程序结束后批量处理。这在需要同步更新的情况下非常有用
    flushSync(() => {
      setCount(count + 1)
    })
    // 这么用是错误的，flushSync 不是这么用的。
    // 拿最新值用 useRef
    console.log('after:', count)
  }

  return (
    <div>
      <h2>flushSync</h2>
      <div>
        <div>{count}</div>
        <button className='px-2 border rounded-md mr-2' onClick={onPlus}>
          +1
        </button>
        <button className='px-2 border rounded-md' onClick={onPlusWithSync}>
          +1 with sync
        </button>
      </div>
    </div>
  )
}

async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data loaded')
    }, 2000)
  })
}

const promiseWrapper = (promise: any, delay = 3000) => {
  let status = 'pending'
  let result: any

  const s = promise
    .then((value: any) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          status = 'success'
          result = value
          resolve(value)
        }, delay)
      })
    })
    .catch((error: string) => {
      status = 'error'
      result = error
    })

  return () => {
    switch (status) {
      case 'pending':
        throw s
      case 'success':
        return result
      case 'error':
        throw result
      default:
        throw new Error('Unknown status')
    }
  }
}

const MyComponent = React.lazy(() => import('./component'))

function DataComponent() {
  const data = promiseWrapper(fetchData)

  // return <div>{data as string}</div>
  return <div>一坨狗屎</div>
}

function SuspenseUse() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MyComponent />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <DataComponent />
      </Suspense>
    </div>
  )
}

function SearchResults({ query }: { query: string }) {
  const startTime = performance.now()
  while (performance.now() - startTime < 200) {
    // 人为模拟的卡顿
  }

  return <div>no matches for {query}</div>
}

function DeferredValueUse() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  return (
    <div>
      <h2>DeferredValue</h2>
      <div>
        <label>
          Search albums:
          <input value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <Suspense fallback={<h2>Loading...</h2>}>
          <SearchResults query={deferredQuery} />
        </Suspense>
      </div>
    </div>
  )
}
export default function React18Page() {
  return (
    <div className='h-screen w-screen m-2 p-2 border rounded-md space-y-4 divide-y-2'>
      <BatchUpdateUse />
      <FlushSyncUse />
      <SuspenseUse />
      <DeferredValueUse />
    </div>
  )
}
