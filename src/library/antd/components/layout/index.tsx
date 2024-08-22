import { Col, Divider, Flex, Grid, Radio, Row } from "antd";
import React from "react";

const baseStyle: React.CSSProperties = {
  width: "25%",
  height: 54,
};

const colStyle: React.CSSProperties = { background: "#0092ff", padding: "8px 0" };

const FlexDemo = () => {};

const { useBreakpoint } = Grid;
const GridDemo = () => {
  const screens = useBreakpoint();
  return (
    <>
      <Divider orientation='left'>Horizontal</Divider>
      <Row gutter={16}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Col className='gutter-row' span={6}>
            <div style={colStyle}>col-{i}</div>
          </Col>
        ))}
      </Row>

      <Divider orientation='left'>Vertical</Divider>
      <Row gutter={[16, 24]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Col className='gutter-row' span={6}>
            <div style={colStyle}>col-{i}</div>
          </Col>
        ))}
      </Row>
      <Divider orientation='left'>Responsive</Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Col className='gutter-row' span={6}>
            <div style={colStyle}>col-{i}</div>
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 24]}>
        <Col className='gutter-row' span={12} offset={6}>
          <div style={colStyle}> col-12 col-offset-6</div>
        </Col>
      </Row>
    </>
  );
};
const LayoutDemo = () => {
  const [value, setValue] = React.useState<string>("horizontal");
  return (
    <Flex gap='middle' vertical>
      <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
        <Radio value='horizontal'>horizontal</Radio>
        <Radio value='vertical'>vertical</Radio>
      </Radio.Group>
      <Divider />
      <Divider style={{ borderColor: "#7cb305" }}>Dotted</Divider>

      <Flex vertical={value === "vertical"} wrap gap='large'>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{ ...baseStyle, backgroundColor: i % 2 ? "#1677ff" : "#1677ffbf" }} />
        ))}
      </Flex>

      <div>
        Text
        <Divider type='vertical' />
        <a href=''>Link</a>
        <Divider type='vertical' />
        <a href=''>Link</a>
      </div>
      <GridDemo />
    </Flex>
  );
};

export default LayoutDemo;
