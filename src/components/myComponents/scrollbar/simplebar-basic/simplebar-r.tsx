import React, { useEffect, useRef, useState } from "react";
import "./index.less";
import cls from "classnames";

const Scrollbar: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollbarThumbRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  function debounceFn(fn: (...args: any[]) => void, delay: number) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function (this: any, ...args: any[]) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  const hideScrollbar = debounceFn(() => {
    setIsVisible(false);
    console.log("unVisible");
  }, 1000);

  useEffect(() => {
    const content = contentRef.current;
    const scrollbarThumb = scrollbarThumbRef.current;

    if (!content || !scrollbarThumb) return;

    const updateScrollbar = () => {
      requestAnimationFrame(() => {
        const contentHeight = content.scrollHeight;
        const containerHeight = content.clientHeight;
        const scrollbarHeight = (containerHeight / contentHeight) * containerHeight;
        scrollbarThumb.style.height = `${scrollbarHeight}px`;

        const scrollPercentage = content.scrollTop / (contentHeight - containerHeight);
        const thumbTop = scrollPercentage * (containerHeight - scrollbarHeight);
        scrollbarThumb.style.top = `${thumbTop}px`;
      });
      setIsVisible(true);
      hideScrollbar();
    };

    content.addEventListener("scroll", updateScrollbar);

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      const startY = e.clientY;
      const startTop = scrollbarThumbRef.current?.offsetTop || 0;

      const onMouseMove = (e: MouseEvent) => {
        requestAnimationFrame(() => {
          if (scrollbarThumbRef.current && contentRef.current) {
            const deltaY = e.clientY - startY;
            const newTop = startTop + deltaY;
            const containerHeight = contentRef.current.clientHeight;
            const thumbHeight = scrollbarThumbRef.current.offsetHeight;
            const maxTop = containerHeight - thumbHeight;

            // 限制newTop的范围，使其在0到maxTop之间
            const boundedTop = Math.max(0, Math.min(newTop, maxTop));
            scrollbarThumbRef.current.style.top = `${boundedTop}px`;

            // 计算内容的滚动位置，并将其设置为新的滚动位置
            const scrollPercentage = boundedTop / maxTop;
            contentRef.current.scrollTop = scrollPercentage * (contentRef.current.scrollHeight - containerHeight);
          }
        });
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    scrollbarThumb.addEventListener("mousedown", onMouseDown);

    window.addEventListener("resize", updateScrollbar);
    window.addEventListener("load", updateScrollbar);

    return () => {
      content.removeEventListener("scroll", updateScrollbar);
      scrollbarThumb.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("resize", updateScrollbar);
      window.removeEventListener("load", updateScrollbar);
    };
  }, []);

  return (
    <div className='scroll-container'>
      <div className='content' ref={contentRef}>
        <div className='content-inner'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
            Cras venenatis euismod malesuada. Nulla facilisi. Vivamus sed erat sit amet justo scelerisque pellentesque
            non a eros. Nulla et ligula vel eros semper faucibus. Nulla facilisi. Curabitur nec odio at urna fermentum
            varius. Phasellus at turpis eget nisl egestas venenatis. Nulla facilisi.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
            Cras venenatis euismod malesuada. Nulla facilisi. Vivamus sed erat sit amet justo scelerisque pellentesque
            non a eros. Nulla et ligula vel eros semper faucibus. Nulla facilisi. Curabitur nec odio at urna fermentum
            varius. Phasellus at turpis eget nisl egestas venenatis. Nulla facilisi.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
            Cras venenatis euismod malesuada. Nulla facilisi. Vivamus sed erat sit amet justo scelerisque pellentesque
            non a eros. Nulla et ligula vel eros semper faucibus. Nulla facilisi. Curabitur nec odio at urna fermentum
            varius. Phasellus at turpis eget nisl egestas venenatis. Nulla facilisi.
          </p>
        </div>
      </div>
      <div className='scrollbar'>
        <div className={cls("scrollbar-thumb", isVisible ? "visible" : "unVisible")} ref={scrollbarThumbRef}></div>
      </div>
    </div>
  );
};

export default Scrollbar;
