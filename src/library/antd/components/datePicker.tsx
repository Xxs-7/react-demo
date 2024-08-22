import { DatePicker, DatePickerProps } from "antd";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";

// 单选：日，周，月，季度，年
// 时间范围选择：日，周，月，季度，年
// 时间多选
//
// import weekday from "dayjs/plugin/weekday";
// import localeData from "dayjs/plugin/localeData";

// dayjs.extend(weekday);
// dayjs.extend(localeData);

const dateFormat = "YYYY/MM/DD";

const DatePickerDemo = () => {
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  const handleChange: RangePickerProps["onChange"] = (dates, dateStrings) => {
    setDates(dates);
    console.log("Selected Dates: ", dateStrings); // 输出选择的日期字符串
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div>
      <DatePicker onChange={onChange} />
      <DatePicker.RangePicker
        format='YYYY/MM/DD' // 日期格式
        defaultValue={[dayjs("2015/01/01", dateFormat), dayjs("2015/01/01", dateFormat)]}
        onChange={handleChange}
      />
      {dates && dates[0] && dates[1] && (
        <div>
          选择的日期范围：{dates[0]?.format("YYYY/MM/DD")} - {dates[1]?.format("YYYY/MM/DD")}
        </div>
      )}
    </div>
  );
};

export default DatePickerDemo;
