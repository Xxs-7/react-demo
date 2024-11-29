// 支持 body 滚动，任意元素滚动条替换
// 样式自定义，宽度，颜色，圆角等
// 支持主题切换，暗黑模式
import React, { useState, useEffect } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import "./index.css";

// Switch 组件，用于切换亮色和暗色模式
function ThemeSwitch({ onChange }) {
  return (
    <label className='switch'>
      <input type='checkbox' onChange={onChange} />
      <span className='slider round'></span>
    </label>
  );
}

export default function ScrollbarOverlay() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 切换主题
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 更新 data-theme 来切换主题
  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`flex items-center justify-center h-screen w-screen overflow-hidden ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className='absolute top-5 right-5'>
        <ThemeSwitch onChange={toggleTheme} />
      </div>
      <div className='w-1/2 h-1/2 border rounded-md'>
        <OverlayScrollbarsComponent
          style={{ maxHeight: "100%", width: "100%" }}
          options={{
            scrollbars: {
              theme: "my-custom-theme",
            },
          }}
          defer
        >
          <div className='w-full'>
            {new Array(100).fill(0).map((_, i) => (
              <div key={i} className='h-8'>
                hello
              </div>
            ))}
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
}
