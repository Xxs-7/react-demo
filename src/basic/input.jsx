import React, { useState } from "react";

// 时分转 Date 类型
function timeToDate(time) {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

// Date 类型转时分
function dateToTime(date) {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

function DateInput() {
  const [date, setDate] = useState("2018-07-22");
  const onDateChange = (e) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };

  return (
    <div>
      <label htmlFor="date">Start date:</label>
      <input
        type="date"
        id="date"
        value={date}
        // min="2018-01-01"
        // max="2018-12-31"
        onChange={onDateChange}
      />
    </div>
  );
}

function TimeInput() {
  const [time, setTime] = useState("12:00");
  const onTimeChange = (e) => {
    setTime(e.target.value);
    console.log(e.target.value);
    console.log(typeof e.target.value);
    console.log(timeToDate(e.target.value));
  };
  return (
    <div>
      <label htmlFor="time">Start time:</label>
      <input type="time" id="time" value={time} onChange={onTimeChange} />
    </div>
  );
}

export { DateInput, TimeInput };
