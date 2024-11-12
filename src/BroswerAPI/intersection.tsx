import React, { useCallback, useEffect, useRef, useState } from 'react'

// 定义 useIntersectionObserver 的类型
type UseIntersectionObserver = (
  callback: () => void,
  options: IntersectionObserverInit
) => [React.RefObject<HTMLDivElement>, boolean]

const useIntersectionObserver: UseIntersectionObserver = (
  callback,
  options
) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observerRefValue = null

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        callback()
      } else {
        setIsIntersecting(false)
      }
    }, options)

    if (targetRef.current) {
      observer.observe(targetRef.current)
      observerRefValue
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue)
      }
    }
  }, [callback, options])

  return [targetRef, isIntersecting]
}

const IntersectionDemo: React.FC = () => {
  const handleIntersection = useCallback(() => {
    console.log('Element is in view!')
  }, [])

  const [targetRef, isIntersecting] = useIntersectionObserver(
    handleIntersection,
    { threshold: 0.1 }
  )

  return (
    <div style={{ height: '150vh' }}>
      <div
        ref={targetRef}
        style={{
          height: '100px',
          background: isIntersecting ? 'green' : 'red',
        }}
      >
        {isIntersecting ? 'In view' : 'Out of view'}
      </div>
    </div>
  )
}

export default IntersectionDemo
