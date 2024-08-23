import React from "react";
import "./index.css";

const BoxShadowDemo = () => {
  // 用法
  // 阴影的位置、模糊程度、扩展程度和颜色

  return (
    <div>
      {/* outer */}
      <div className='boxShadow'>BoxShadow</div>
      {/* inner */}
      <div className='boxShadow2'>BoxShadow</div>
      <div className='boxShadow3'>BoxShadow</div>
      <div className='boxShadow4Wrap'>
        <div className='boxShadow4'>BoxShadow</div>
      </div>
    </div>
  );
};

const ResizeDemo = () => {
  // inline 元素不生效
  // block 元素 overflow: visible 不生效
  return (
    <div>
      <div className='resize'>resize</div>
    </div>
  );
};

const SelectorDemo = () => {
  // # .
  // ~
  // :not :has -----
  //    .button:not(:first-child)
  //    span:has(+input[data-required])
  return (
    <div className={"selector"}>
      <div>
        <label className={"formItem"}>
          <span>姓名</span>
          <input data-required />
        </label>
        <label className={"formItem"}>
          <span>地址</span>
          <input />
        </label>
      </div>
      <div>
        <input type='checkbox' className={"checkbox"} />
        <p className='checkboxText'>Example element that you can show or hide element</p>
      </div>
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

const BackDropFilterDemo = () => {
  return (
    <div className='backDropFilter'>
      <div className='backDropFilter-blur'>
        <div>backDropFilter</div>
      </div>
    </div>
  );
};

const ScrollDemo = () => {
  return (
    <div className='scroll'>
      <div className='scroll-inner'>
        <div className='scroll-item'>scroll 1</div>
        <div className='scroll-item'>scroll 2</div>
        <div className='scroll-item'>scroll 3</div>
      </div>
    </div>
  );
};

export default function CssDemo() {
  return (
    <div className='bg'>
      <BoxShadowDemo />
      <ResizeDemo />
      <SelectorDemo />
      <TextDemo />
      <BackDropFilterDemo />
      <ScrollDemo />
    </div>
  );
}
