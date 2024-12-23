import { Skeleton } from "antd";
import React from "react";

const SkeletonDemo = () => {
  return (
    <div className=' flex flex-col gap-2 border border-gray-300 rounded-md'>
      <Skeleton active />
      <Skeleton.Input
        active
        style={{ width: "100%", height: "50px" }} // 不固定宽高
      />
      <Skeleton
        active
        avatar={{ shape: "circle" }} // 头像
        paragraph={false}
        // paragraph={{
        //   rows: 1, // 一行内容
        //   // width: "100px", // 固定宽度
        // }}
      />
      <Skeleton.Image
        style={{
          width: "100px",
          height: "200px",
        }}
      />
      <Skeleton.Avatar
        shape='circle'
        style={{
          width: "100px",
          height: "100px",
          background: " linear-gradient( 90deg, #f0f2f5 25%, #e6f7ff 50%, #f0f2f5 75%  ) ",
        }}
        active
      />
    </div>
  );
};

export default SkeletonDemo;
