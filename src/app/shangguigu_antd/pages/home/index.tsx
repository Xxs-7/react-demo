/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-10-01 19:10:44
 * @LastEditors: MFine
 * @LastEditTime: 2021-02-11 21:35:13
 */
import { Card, Statistic, DatePicker, Timeline } from "antd";
import { QuestionCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import React, { useState } from "react";
// import "./home.scss";
import Line from "./line";
import Bar from "./bar";
import dayjs from "dayjs";

const dateFormat = "YYYY/MM/DD";

const Home = () => {
  const [key, setKey] = useState<string>("views");

  const tabListNoTitle = [
    {
      key: "views",
      tab: <div style={{ fontSize: "x-large" }}>访问量</div>,
    },
    {
      key: "sales",
      tab: <div style={{ fontSize: "x-large" }}>销售量</div>,
    },
  ];

  const contentListNoTitle = {
    views: <Bar />,
    sales: <Bar />,
  };

  const onTabChange = (key: string) => {
    setKey(key);
  };

  return (
    <div className='h-full'>
      <div className='flex justify-around items-center '>
        <div className='flex-[2] p-5'>
          <Card title='商品总量' extra={<QuestionCircleOutlined />}>
            <Statistic value={112893} suffix={"个"}></Statistic>
            <Statistic
              value={15}
              precision={2}
              suffix={
                <div>
                  <span>%</span>
                  <ArrowUpOutlined style={{ color: "#3f8600" }} />
                </div>
              }
              prefix='周同比'
            ></Statistic>
            <Statistic
              value={16}
              precision={2}
              suffix={
                <div>
                  <span>%</span>
                  <ArrowDownOutlined style={{ color: "#cf1322" }} />
                </div>
              }
              prefix='日同比'
            ></Statistic>
          </Card>
        </div>
        <div className='h-full p-4 flex-[5]'>
          <Line />
        </div>
      </div>
      <Card
        className='home-content'
        style={{ width: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={key}
        tabBarExtraContent={
          <DatePicker.RangePicker
            // size='large'
            defaultValue={[dayjs("2015/01/01", dateFormat), dayjs("2015/01/01", dateFormat)]}
            format={dateFormat}
          />
        }
        onTabChange={(key) => {
          onTabChange(key);
        }}
      >
        <div className='flex justify-between h-[600px]'>
          <Card
            className='p-15 flex-[3]'
            title={<div className='title'>{tabListNoTitle.find((item) => item.key === key)?.tab}</div>}
          >
            {contentListNoTitle[key]}
          </Card>
          <Card title='任务' className='flex-[2]'>
            <Timeline>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
              <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            </Timeline>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Home;
