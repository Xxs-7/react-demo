import React from "react";

// 固定高度元素滚动条
// 弹性元素滚动条
// 滚动条内 sticky 布局
const ScrollDemo = () => {
  return (
    <div className='h-screen w-full flex overflow-y-hidden bg-slate-200 '>
      <div className='w-[100px] h-[100px] bg-slate-300 '>固定高度元素滚动条</div>
      <div className='flex-1 flex flex-row bg-green-400 '>
        <div className='w-[100px] h-[100px] bg-slate-500 '>固定高度元素滚动条</div>
        <div className='w-full overflow-y-scroll'>
          <div className='flex-1 flex flex-col space-y-2 '>
            {Array.from({ length: 100 }).map((_, index) => (
              <div key={index} className='h-20 self-stretch bg-slate-500'>
                {index}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollDemo;
