import React from "react";
import { useSpring, animated } from "@react-spring/web";

function MyComponent() {
  const styles = useSpring({
    from: { x: 0 },
    to: { x: 100 },
  });

  return (
    <animated.div
      style={{
        width: 80,
        height: 80,
        background: "#ff6d6d",
        borderRadius: 8,
        ...styles,
      }}
    />
  );
}

export default function SpringDemo() {
  return (
    <div>
      <MyComponent />
    </div>
  );
}
