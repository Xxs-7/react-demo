import React, { useRef, useState } from "react";
import { useEventListener } from "ahooks";

// useEventListener
// useClickAway
// useDocumentVisibility
// useDebounce

// useEventListener
const Demo = () => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);
  const clickBtn = () => {
    setValue(value + 1);
    console.log(value);
  };
  useEventListener("click", clickBtn, { target: ref });

  return (
    <button ref={ref} type='button'>
      You click {value} times
    </button>
  );
};

const AhooksDemo = () => {
  return (
    <div>
      <Demo />
    </div>
  );
};

export default AhooksDemo;
