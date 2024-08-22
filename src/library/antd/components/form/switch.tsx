import { MenuTheme, Switch } from "antd";
import { MenuProps } from "antd/lib";

import React, { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

const SwitchDemo = () => {
  const [menuTheme, setMenuTheme] = useState<MenuTheme>("light");
  const changeTheme = (value: boolean) => {
    setMenuTheme(value ? "dark" : "light");
  };

  return (
    <div>
      <Switch checked={menuTheme === "dark"} onChange={changeTheme} checkedChildren='Dark' unCheckedChildren='Light' />
    </div>
  );
};

export default SwitchDemo;
