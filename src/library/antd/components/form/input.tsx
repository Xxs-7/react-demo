import React, { useState } from "react";
import { Input } from "antd";

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
    <div>
      <InputDemo1 />
    </div>
  );
};

export default InputDemo;
