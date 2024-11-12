import React from "react";

const TextPage = () => {
  return (
    <div>
      <Section>
        <h2>宽度固定，文本超过元素宽度，换行</h2>
        <div className="w-[200px]">
          这是一段长文本的缩略，这是一段长文本的缩略，这是一段长文本的缩略，
        </div>
      </Section>
      <Section>
        <div className="w-[200px] truncate">
          这是一段长文本的缩略，这是一段长文本的缩略，这是一段长文本的缩略，
        </div>
      </Section>
      <Section>
        <div className="w-[300px] grid grid-cols-[100px_1fr] gap-2">
          <div className="">左侧固定</div>
          <div className="truncate">
            这是一段长文本的缩略，这是一段长文本的缩略，这是一段长文本的缩略，
          </div>
        </div>
      </Section>
      <Section>
        <div className="w-[300px] flex gap-2">
          <div className="">左侧固定</div>
          <div className="flex-1 overflow-hidden">
            <div className="truncate">
              这是一段长文本的缩略，这是一段长文本的缩略，这是一段长文本的缩略，
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <select className="w-[200px] truncate">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="2">
            超级长的 option超级长的 option超级长的 option
          </option>
        </select>
      </Section>
      <Section>
        <div className="w-[300px] grid grid-cols-[100px_1fr] gap-2">
          <div className="">左侧固定</div>
          <select className="w-[200px] truncate">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option className="w-[300px] truncate" value="2">
              超级长的 option超级长的 option超级长的 option
            </option>
          </select>
        </div>
      </Section>
    </div>
  );
};

export default TextPage;
