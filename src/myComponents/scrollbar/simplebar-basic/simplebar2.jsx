import React,{useState,useRef,useEffect} from 'react'
import './simple.css' 
// const Simplebar2 = (style, children) => {
//   return <div>
//       {children}
//   </div>
// }


const Simplebar2 = ({ height ,children}) => {
  return  <div className="simplebar" style={{ height }}>
      {children}
    </div>
};

export default function Simplebar2Demo() {
  return (
   <div className='overflow-hidden'>
      <Simplebar2 height={"100vh"}>
      {
        new Array(100).fill(0).map((_, i) => (
          <div key={i} className="h-8">hello</div>
        ))
      }
      </Simplebar2>
    </div>
  )
}
