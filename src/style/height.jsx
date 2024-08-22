import React, { useEffect, useRef, useState } from "react";

const BoxDimensions = () => {
  const boxRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (boxRef.current) {
      resizeObserver.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        resizeObserver.unobserve(boxRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        width: "200px",
        height: "200px",
        border: "2px solid black",
        boxSizing: "border-box",
        padding: "20px",
        resize: "both",
        overflow: "auto",
      }}
    >
      <p>Width: {dimensions.width}px</p>
      <p>Height: {dimensions.height}px</p>
    </div>
  );
};

const AllHeightDemo = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    scrollHeight: 0,
    clientHeight: 0,
    offsetHeight: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        setDimensions({
          scrollHeight: container.scrollHeight, //元素
          clientHeight: container.clientHeight,
          offsetHeight: container.offsetHeight,
          height: container.getBoundingClientRect().height,
          scrollTop: container.scrollTop,
          clientTop: container.clientTop,
          offsetTop: container.offsetTop,
          top: container.getBoundingClientRect().top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      handleScroll(); // Initialize dimensions
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div>
      <div
        style={{
          background: "#fff",
        }}
      >
        <p>
          滚动容器可视高 height:400px, padding:10px border:1px,
          即content：378px(border-box)
        </p>
        <p>
          子元素高height:50px, border:1px, padding:20px, margin:10px,共50个元素
        </p>
        <p>
          ScrollHeight: {dimensions.scrollHeight}px, 50*（50+10） +10+10=3020
          包含容器padding+所有子元素高度
        </p>
        <p>ClientHeight: {dimensions.clientHeight}px，不含border，即398px</p>
        <p>OffsetHeight: {dimensions.offsetHeight}px 含border，即为400px</p>
        <p>
          getBoundingClientRect.height: {dimensions.height}
          px，视图内的可视高度，可视内容高度 + padding + border
        </p>
        <p>scrollTop:{dimensions.scrollTop}px，元素滚动到顶部的距离。</p>
        <p>clientTop: {dimensions.clientTop}px，相对于元素 border?</p>
        <p>offsetTop: {dimensions.offsetTop}px，相对于视图左上角</p>
        <p>getBoundingClientRect.top:{dimensions.top}px</p>
      </div>
      <div
        ref={containerRef}
        style={{
          height: "400px", // Set height to make sure scrollable
          width: "400px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {/* Generating a lot of content to make the container scrollable */}
        {Array.from({ length: 50 }, (_, index) => (
          <div
            key={index}
            style={{
              width: "500px",
              height: "50px",
              padding: "20px",
              border: "1px solid #000",
              marginBottom: "10px",
            }}
          >
            Item {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

const HeightDemo = () => {
  return (
    <>
      <BoxDimensions />
      <AllHeightDemo />
    </>
  );
};

export default HeightDemo;
