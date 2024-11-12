import Section from "@/basic/section";
import React from "react";

// 1 容器 宽高固定，不固定（占满，适应子元素）
// 2 元素 宽高固定，不固定（占满，适应子元素）

// grid-template-cols/rows
// grid-template-cols: repeat(4, 25%) 如果有 grid-template-gap 会导致最后一个宽度和前面不一样
// grid-template-cols: repeat(4, 1fr) 也就是先分配 gap，再每个元素分配宽度, 而 1rf 则会使宽度一致
// grid-template-cols: repeat(4, minmax(0, 1fr))
//
function Layout() {
  return (
    <div>
      <Section>
        <h2>grid-cols-[repeat(4,25%)] gap-2导致最后一个子元素显示不完整</h2>
        <div className="resize overflow-auto w-[540px] h-[480px] p-2 grid grid-cols-[repeat(4,25%)] gap-2 border rounded-md bg-gray-300">
          <div className="border">1</div>
          <div className="border">2</div>
          <div className="border">3</div>
          <div className="border">4</div>
        </div>
      </Section>
      <Section>
        <div className="resize overflow-auto w-[540px] h-[480px] p-2 grid grid-cols-[repeat(4,_1fr)] gap-2 border rounded-md bg-gray-300">
          <div className="border">1</div>
          <div className="border">2</div>
          <div className="border">3</div>
          <div className="border">4</div>
        </div>
      </Section>
      <Section>
        <h2>搞不懂 1fr 和 minmax(0, 1fr)区别？目前看来没啥区别</h2>
        <div className="resize overflow-auto w-[540px] h-[480px] border flex rounded-md bg-gray-300">
          <div className="flex-1 p-2 grid grid-cols-4 gap-2">
            <div className="h-0 w-0 border"></div>
            <div className="border">2</div>
            <div className="border">3</div>
            <div className="border">4</div>
          </div>
        </div>
      </Section>
      <Section>
        <div className="resize overflow-auto w-[540px] h-[480px] p-2 grid grid-rows-[] gap-2 border  bg-gray-300 ">
          <div className="border w-[100px] h-[100px]">1</div>
          <div className="border w-[100px] h-[100px]">2</div>
          <div className="border w-[100px] h-[100px]">3</div>
          <div className="border w-[100px] h-[100px]">4</div>
        </div>
      </Section>
      <Section>
        <h2>响应式布局</h2>
        <div className="w-[540px] h-[480px] p-2 grid grid-cols-2 grid-rows-2 sm:grid-cols-3 md:grid-cols-4 gap-2 border rounded-md bg-gray-300">
          <div className="border">1</div>
          <div className="border">2</div>
          <div className="border">3</div>
          <div className="border">4</div>
        </div>
      </Section>
      <Section>
        <div className="">
          <div className="resize overflow-auto w-[540px] h-[480px] p-2 border rounded-md bg-gray-300" />
        </div>
      </Section>
    </div>
  );
}

// container
const Container = () => {
  return (
    <div className="container border">
      <div>contiainer</div>
    </div>
  );
};

// response variant
const Response = () => {
  return (
    <div>
      <Section>
        <div className="bg-lime-600	h-20 w-[100px] sm:w-[200px] md:w-[300px] lg:w-[400px]"></div>
      </Section>
      <Section>
        <div className="container border mx-auto text-center">container</div>
      </Section>
    </div>
  );
};

export default function LayoutPage() {
  // return <Layout />;
  // return <Container />;
  return <Response />;
}
