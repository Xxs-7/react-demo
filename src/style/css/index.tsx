import React from "react";
import "./index.css";

const SelectorDemo = () => {
  return (
    <div className={"selector"}>
      <label className={"formItem"}>
        <span>姓名</span>
        <input data-required />
      </label>
      <label className={"formItem"}>
        <span>地址</span>
        <input />
      </label>
    </div>
  );
};

const TextDemo = () => {
  return (
    <div>
      <p className='firstLetter'>
        Scientists exploring the depths of Monterey Bay unexpectedly encountered a rare and unique species of
        dragonfish. This species is the rarest of its species.
      </p>
      <p className='firstLine'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
      </p>
    </div>
  );
};

export default function CssDemo() {
  return (
    <div className='bg'>
      <SelectorDemo />
      <TextDemo />
    </div>
  );
}
