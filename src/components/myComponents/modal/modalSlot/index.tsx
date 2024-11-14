// import React, { useEffect, useRef, useState } from "react";
// import ReactDOM from "react-dom";

// interface ModelSlotProps {
//   rootId: string;
//   onLoad?: () => void;
// }

// const ModalSlot = ({
//   children,
//   rootId,
//   onLoad,
// }: React.PropsWithChildren<ModelSlotProps>) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const rootRef = useRef<HTMLElement>(null);
//   const elRef = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     // 手动在 rootId 指定的 DOM 节点下创建一个 div 元素，并将该元素作为 Portal 的挂载点
//     // 组件首次渲染创建 div
//     // 组件卸载时手动清理 div
//     // 以此在 div#modal-slot，集中管理 modal 的真实 dom
//     // 而不是像 react 文档的 document.body 那样，modal 的真实 dom 位置难找
//     rootRef.current = document.getElementById(rootId);
//     elRef.current = document.createElement("div");
//     if (!rootRef.current) {
//       throw new Error(`element ${rootId} not found`);
//     }
//     rootRef.current.appendChild(elRef.current);

//     setIsLoaded(true);

//     return () => {
//       rootRef?.current.removeChild(elRef.current);
//     };
//   }, []);

//   // 组件首次渲染时，执行 onLoad 回调，unnecessary
//   useEffect(() => {
//     if (isLoaded) {
//       onLoad && onLoad();
//     }
//   }, [isLoaded]);

//   if (isLoaded) {
//     return ReactDOM.createPortal(children, elRef.current);
//   } else {
//     return null;
//   }
// };

// export default ModalSlot;
