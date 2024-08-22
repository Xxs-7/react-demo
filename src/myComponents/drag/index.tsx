// 优化思路
// 1. UI 设计，交互设计，更好的用户体验
// 2. 数据结构设计，组件状态，数据存储（前后端，数据库）
// 3. 事件处理函数是否合理
// 4. 性能优化
// 5. 代码优化

// todo 查，改，存
// 数据结构优化，数据的 清空，读取，写入，前进/后退

import React, { useState } from "react";

const getData = () => {
  return JSON.parse(localStorage.getItem("Courses") || "[]") as Course[];
};

interface Course {
  // id: string; // 唯一标识符
  day: number; // 星期几的索引
  period: number; // 时间段的索引
  time: "am" | "pm"; // 上午或下午
  name: string; // 课程名称
}

const days = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
const courses = ["语文", "数学", "英语", "体育", "物理", "化学", "生物"];
const coursesColor = [
  "bg-blue-400",
  "bg-red-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-orange-400",
];

const generateTableData = (data: Course[], rowLen: number, colLen: number): Course[][] => {
  const rows = Array.from({ length: rowLen }, () => Array(colLen).fill(null)); // 创建 4 行 7 列的表格

  data.forEach((item) => {
    const { day, period } = item;
    rows[period][day] = item;
  });

  return rows;
};

const CourseTable: React.FC = () => {
  const [courseData, setCourseData] = useState(getData);

  const amCells = generateTableData(
    courseData.filter((item) => item.time === "am"),
    4,
    7
  );
  const pmCells = generateTableData(
    courseData.filter((item) => item.time === "pm"),
    3,
    7
  );

  const handleDrop = (e: React.DragEvent<HTMLTableCellElement>, row: number, col: number, time: "am" | "pm") => {
    e.preventDefault();
    const course = e.dataTransfer.getData("text/plain");
    let isExist = false;
    // 更新课程数据
    const updatedData = courseData.map((item) => {
      if (item.day === col && item.period === row && item.time === time) {
        isExist = true;
        return { ...item, name: course }; // 替换课程
      }
      return item;
    });

    if (!isExist) {
      const newCourse: Course = { day: col, period: row, time, name: course };
      updatedData.push(newCourse);
    }
    // 更新状态
    setCourseData(updatedData);

    e.currentTarget.classList.remove("bg-blue-100", "border-2", "border-blue-500"); // 放置后移除高亮效果
  };

  // 渲染表格的行
  const renderRows = (title: string, rowLen: number, data: Course[][], handleDrop) => {
    const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>) => {
      e.preventDefault();
      // e.currentTarget.classList.add("over");
      e.currentTarget.classList.add("bg-blue-100", "border-2", "border-blue-500"); // 添加高亮背景和边框
    };

    const handleDragLeave = (e: React.DragEvent<HTMLTableCellElement>) => {
      // e.currentTarget.classList.remove("over");
      e.currentTarget.classList.remove("bg-blue-100", "border-2", "border-blue-500"); // 移除高亮背景和边框
    };

    const handleDelete = (day: number, period: number) => {
      const updatedCourseData = courseData.filter((course) => !(course.day === day && course.period === period));
      setCourseData(updatedCourseData);
    };

    return (
      <>
        {Array.from({ length: rowLen }).map((_, index) => (
          <tr key={index}>
            {index === 0 ? (
              <td className='text-center font-bold border p-2' rowSpan={rowLen}>
                {title}
              </td>
            ) : null}
            {days.map((_, dayIndex) => (
              <td
                key={dayIndex}
                className='h-16 border border-gray-300 text-center'
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index, dayIndex)}
              >
                {data[index][dayIndex] ? (
                  <div onDoubleClick={handleDelete.bind(null, data[index][dayIndex].day, data[index][dayIndex].period)}>
                    <Course
                      name={data[index][dayIndex].name}
                      className={coursesColor[courses.indexOf(data[index][dayIndex].name)]}
                    />
                  </div>
                ) : null}
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  const onSave = () => {
    localStorage.setItem("Courses", JSON.stringify(courseData));
  };

  return (
    <div className='p-4'>
      <table className='min-w-full border-collapse border border-gray-300'>
        {/* 表头 */}
        <thead>
          <tr>
            <th className='border p-2'></th>
            {days.map((day, index) => (
              <th key={index} className='border p-2'>
                {day}
              </th>
            ))}
          </tr>
        </thead>

        {/* 上午课程 */}
        <tbody>
          {renderRows("上午", amCells.length, amCells, (e, row, col) => handleDrop(e, row, col, "am"))}

          {/* 下午课程 */}
          {renderRows("下午", pmCells.length, pmCells, (e, row, col) => handleDrop(e, row, col, "pm"))}
        </tbody>
      </table>
      <button
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700'
        onClick={onSave}
      >
        save
      </button>
    </div>
  );
};

interface CourseProps {
  name: string;
  draggable?: boolean;
  className?: string;
}

const Course: React.FC<CourseProps> = ({ name, draggable, className }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", name);
    e.currentTarget.style.opacity = "0.5"; // 拖动时改变透明度
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "1"; // 拖动结束后恢复透明度
  };

  return (
    <div
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`p-4 border rounded-md ${draggable ? "cursor-move" : ""} ${className}`}
    >
      {name}
    </div>
  );
};

const DragDemo = () => {
  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <div className='flex flex-col gap-2 p-2 border rounded-md'>
        {courses.map((course, index) => (
          <Course
            key={`${course}-${index}`}
            name={course}
            draggable={true}
            className={coursesColor[courses.indexOf(course)]}
          />
        ))}
      </div>
      <div>
        <CourseTable />
      </div>
    </div>
  );
};

export default DragDemo;

// 组件显示数据 -> state数据结构 -> 接口数据结构

// ts 定义
// 性能优化
