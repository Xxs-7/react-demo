// import React from "react";
// import { useSpring, animated } from "@react-spring/web";

// function MyComponent() {
//   const styles = useSpring({
//     from: { x: 0 },
//     to: { x: 100 },
//   });

//   return (
//     <animated.div
//       style={{
//         width: 80,
//         height: 80,
//         background: "#ff6d6d",
//         borderRadius: 8,
//         ...styles,
//       }}
//     />
//   );
// }

// export default function SpringDemo() {
//   return (
//     <div>
//       <MyComponent />
//     </div>
//   );
// }

import React, { useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

const Sidebar: React.FC<{ onIconClick: () => void }> = ({ onIconClick }) => (
  <div style={sidebarStyles}>
    <div style={iconStyles} onClick={onIconClick}>
      🖼️ {/* 图标可以替换为任何你需要的图标 */}
    </div>
  </div>
);

const Popup: React.FC<{ onClose: () => void }> = ({onClose}) => {
  const [spring, api] = useSpring(() => ({
    from: { transform: 'translateX(400px)' }, // 初始位置在右侧
  }));

  const handleClick = () => {
    api.start({
      to: { transform: 'translateX(0)' }, // 向左移动到可见位置
      config: { duration: 1000 }, // 动画持续时间 1000ms
      onRest: onClose, // 动画完成后调用 onClose
    });
  };

  return (
    <animated.div style={{  ...popupStyles,...spring }}>
      <div style={contentStyles}>
        <h2>这是一个弹窗</h2>
        <p>点击旁边的图标以移动此弹窗。</p>
        <button onClick={handleClick}>关闭弹窗</button>
      </div>
    </animated.div>
  );
};

// 弹窗的基础样式
const popupStyles: React.CSSProperties = {
  width: '300px',
  height: '200px',
  backgroundColor: 'white',
  borderRadius: '10px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  top: '50%',
  left: '10%', // 初始位置在左侧
  transform: 'translateY(-50%)', // 垂直居中
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const contentStyles: React.CSSProperties = {
  textAlign: 'center',
};

const sidebarStyles: React.CSSProperties = {
  width: '60px',
  height: '100vh',
  backgroundColor: '#f0f0f0',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.1)',
};

const iconStyles: React.CSSProperties = {
  margin: '20px 0',
  cursor: 'pointer',
  fontSize: '24px',
};

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="App">
      <Sidebar onIconClick={() => setIsPopupOpen(open=>!open)} />
      {isPopupOpen && (
        <Popup onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
}
