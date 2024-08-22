import React, { useState } from "react";
import { ConfigProvider, Button } from "antd";

const lightThemeTokens = {
  // colorPrimaryButton: "#1890ff", // 浅色主题
  // borderRadiusButton: 8,
};

const darkThemeTokens = {
  // colorPrimaryButton: "#1DA57A", // 深色主题
  // borderRadiusButton: 16,
};

const ButtonDemo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ConfigProvider theme={{ token: isDarkMode ? darkThemeTokens : lightThemeTokens }}>
      <Button type='primary' onClick={() => setIsDarkMode(!isDarkMode)}>
        切换主题
      </Button>
    </ConfigProvider>
  );
};

export default ButtonDemo;
