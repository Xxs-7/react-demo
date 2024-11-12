import React, { Suspense } from 'react'

const Compoennt = React.lazy(() => import('./component'))
export default function SuspendPage() {
  return (
    <React.Suspense fallback={<div>loading</div>}>
      <Compoennt />
    </React.Suspense>
  )
}
