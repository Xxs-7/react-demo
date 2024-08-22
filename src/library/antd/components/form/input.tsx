import { Input } from "antd";

import React, { useState } from "react";

const InputDemo1 = () => {
  const [userName, setUserName] = useState("");
  const onUserNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    // console.log(event.target.value);
    setUserName(event.target.value);
  };
  return <Input value={userName} onChange={onUserNameChange} allowClear showCount size='large' />;
};

const InputDemo = () => {
  return (
    <>
      <InputDemo1 />
    </>
  );
};

export default InputDemo;
