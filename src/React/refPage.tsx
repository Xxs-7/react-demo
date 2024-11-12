/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";

// export default function UseRefPage() {
//   const inputEl = useRef(null);
//   const onButtonClick = () => {
//     // `current` 指向已挂载到 DOM 上的文本输入元素
//     inputEl.current.focus();
//   };
//   return (
//     <>
//       <input ref={inputEl} type="text" />
//       <button onClick={onButtonClick}>Focus the input</button>
//     </>
//   );
// }
let globalVariable = 0;

// no update
// 页面显示的永远是 0
// export default function UseRefPage() {
//   const ref = useRef(0);
//   let variable = 0;

//   const onLog = () => {
//     console.log("ref.current:" + ref.current);
//     console.log("variable:" + variable);
//     console.log("globalVariable:" + globalVariable);
//   };

//   const onAdd = () => {
//     ref.current += 1;
//     variable += 1;
//     globalVariable += 1;
//   };

//   return (
//     <div className="container">
//       <h2>useRefs</h2>
//       <div>
//         <button
//           className="px-3 border border-purple-200 rounded-md"
//           onClick={onLog}
//         >
//           log
//         </button>
//         <button
//           className="px-3 border border-purple-200 rounded-md"
//           onClick={onAdd}
//         >
//           +1
//         </button>
//         <div>variable: {variable}</div>
//         <div>ref.current: {ref.current}</div>
//         <div>globalVariable: {globalVariable}</div>
//       </div>
//     </div>
//   );
// }

// with update
// 页面上 ref 会随着 state 更新而更新
export default function UseRefPage() {
  const [count, setCount] = useState(0);
  let variable = 0;
  const ref = useRef(0);

  const onButtonClick = () => {
    setCount(count + 1);
    variable = count + 1;
    ref.current = count + 1;
    globalVariable = count + 1;
  };

  return (
    <div className='container'>
      <h2>useRefs</h2>
      <div>
        <button className='px-3 border border-purple-200 rounded-md' onClick={onButtonClick}>
          +1
        </button>
        <div>state: {count}</div>
        <div>variable: {variable}</div>
        <div>ref.current: {ref.current}</div>
        <div>globalVariable: {globalVariable}</div>
      </div>
      <h2>test Ref</h2>
      <UseRefDemo2 />
    </div>
  );
}

// with update and useEffect
// 页面上 ref 会随着 state 更新而更新，但是 variable 一直为 0
// useEffect 中 ref 会随着 state 更新而更新，但是 variable 一直为 0
// 对比 demo 1，组件更新渲染后，variable 为此时组件的，而非渲染前的组件的 variable，所以为 0
// 组件在 react 源码中更新渲染是执行组件函数声明
// export default function UseRefPage() {
//   let variable = 0;
//   const ref = useRef(0);
//   const [count, setCount] = useState(0);

//   const onButtonClick = () => {
//     setCount(count + 1);
//     variable = count + 1;
//     ref.current = count + 1;
//   };

//   const onLog = () => {
//     console.log("ref", ref.current);
//     console.log("variable", variable);
//     console.log("count", count);
//   };

//   useEffect(() => {
//     console.log("ref", ref.current);
//     console.log("variable", variable);
//     console.log("count", count);
//   }, [count]);

//   return (
//     <div className="container">
//       <h2>useRefs</h2>
//       <div>
//         <button
//           className="px-3 border border-purple-200 rounded-md"
//           onClick={onButtonClick}
//         >
//           +1
//         </button>
//         <button
//           className="px-3 border border-purple-200 rounded-md"
//           onClick={onLog}
//         >
//           log
//         </button>
//         <div>state: {count}</div>
//         <div>variable: {variable}</div>
//         <div>ref.current: {ref.current}</div>
//       </div>
//     </div>
//   );
// }

// 假设业务逻辑是定时器的 start 和 stop，存放 timerId 用 ref

const UseRefDemo2 = () => {
  const [count, setCount] = useState(0);
  const valRef = useRef(1);
  let val = 0;
  const onButtonClick = () => {
    setCount((count) => count + 1);
    valRef.current = count + 1;
    val = count + 1;
  };

  const onLog = () => {
    console.log("valRef", valRef.current);
    console.log("count", count);
    console.log("val", val);
  };

  return (
    <div>
      <div>{count}</div>

      <button className='px-3 border border-purple-200 rounded-md' onClick={onButtonClick}>
        +1
      </button>
      <button className='px-3 border border-purple-200 rounded-md' onClick={onLog}>
        log
      </button>
    </div>
  );
};
