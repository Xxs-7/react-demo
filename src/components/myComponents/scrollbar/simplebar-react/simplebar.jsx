import React, { useRef } from 'react'
import Simplebar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import './index.css'
// 工期安排

export default function SimplebarReactDemo() {
  const scrollRef = useRef();

  const handler = () => {
    console.log(scrollRef);
  }
  
  return (
      <Simplebar autoHide={false} style={{ maxHeight: "300px",overflowX:"hidden" }}ref={scrollRef}>
        <button onClick={handler}>
          ssss
        </button>
        {
          new Array(20).fill(0).map((_, i) => (
            <div key={i} className="h-8">hello</div>
          ))
        }
      </Simplebar>
  )
}
