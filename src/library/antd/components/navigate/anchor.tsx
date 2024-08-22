import React, { useState } from "react";
import { ConfigProvider, Anchor, Button, Row, Col } from "antd";

const { Link } = Anchor;
const lightThemeTokens = {
  colorPrimary: "#4A4A4A", // 墨灰色，作为主色调
  colorText: "#2C2C2C", // 深灰色文字，强调质朴感
  colorBgBase: "#F8F8F8", // 米白色背景，柔和不刺眼
  colorLinkHover: "#5A8A93", // 淡青色链接悬停
  colorBorder: "#D6D6D6", // 浅灰色边框，简洁
  colorBgContainer: "#FFFFFF", // 纯白色容器背景
};

const darkThemeTokens = {
  colorPrimary: "#8A8A8A", // 灰色，暗色主题下的主色调
  colorText: "#E6E6E6", // 淡灰色文字，保持对比度
  colorBgBase: "#1C1C1C", // 深灰黑色背景，柔和而非纯黑
  colorLinkHover: "#7DA2AC", // 柔和的青蓝色链接悬停
  colorBorder: "#4A4A4A", // 墨灰色边框，延续整体风格
  colorBgContainer: "#2A2A2A", // 深灰色容器背景
};

const CustomAnchor = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themeTokens = isDarkMode ? darkThemeTokens : lightThemeTokens;

  return (
    <ConfigProvider theme={{ token: themeTokens }}>
      <div
        style={{
          backgroundColor: themeTokens.colorBgBase,
          padding: "20px",
          // minHeight: "100vh",
        }}
      >
        <Button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            marginBottom: "20px",
            borderRadius: "5px",
            backgroundColor: themeTokens.colorPrimary,
            color: "#fff",
            border: "none",
          }}
        >
          切换主题
        </Button>

        <Row style={{ maxHeight: "100px", overflowY: "scroll" }}>
          <Col span={16}>
            <div id='part-1' style={{ height: "100px", background: "rgba(255,0,0,0.02)" }} />
            <div id='part-2' style={{ height: "100px", background: "rgba(0,255,0,0.02)" }} />
            <div id='part-3' style={{ height: "100px", background: "rgba(0,0,255,0.02)" }} />
          </Col>
          <Col span={8}>
            <Anchor
              // affix={true}
              style={{
                backgroundColor: themeTokens.colorBgContainer,
                // borderLeft: `2px solid ${themeTokens.colorPrimary}`,
              }}
              items={[
                {
                  key: "part-1",
                  href: "#part-1",
                  title: "Part 1",
                },
                {
                  key: "part-2",
                  href: "#part-2",
                  title: "Part 2",
                },
                {
                  key: "part-3",
                  href: "#part-3",
                  title: "Part 3",
                },
              ]}
            />
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
};

const AnchorDemo = () => {
  return (
    <div>
      <CustomAnchor />
    </div>
  );
};

export default AnchorDemo;
