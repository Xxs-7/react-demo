// 优化思路
import React, { useState } from "react";

function genArray2D(rows: number, cols: number) {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
}

const CourseTable: React.FC = () => {
  // 定义星期数组
  const days = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];

  const [pmCells, setPmCells] = useState<string[][]>(genArray2D(4, 7));
  const [amCells, setAmCells] = useState<string[][]>(genArray2D(3, 7));

  const handlePmDrop = (e: React.DragEvent<HTMLTableCellElement>, row: number, col: number) => {
    e.preventDefault();
    const course = e.dataTransfer.getData("text/plain");
    const newCells = pmCells.map((r, ri) => r.map((c, ci) => (ri === row && ci === col ? course : c)));
    setPmCells(newCells);
    e.currentTarget.classList.remove("over");
  };

  const handleAmDrop = (e: React.DragEvent<HTMLTableCellElement>, row: number, col: number) => {
    e.preventDefault();
    const course = e.dataTransfer.getData("text/plain");
    const newCells = amCells.map((r, ri) => r.map((c, ci) => (ri === row && ci === col ? course : c)));
    setAmCells(newCells);
    e.currentTarget.classList.remove("over");
  };

  // 渲染表格的行
  const renderRows = (title: string, rowLen: number, data: string[][], handleDrop) => {
    console.log("%c [ data ]-97", "font-size:13px; background:pink; color:#bf2c9f;", data);
    const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>) => {
      e.preventDefault();
      e.currentTarget.classList.add("over");
    };

    const handleDragLeave = (e: React.DragEvent<HTMLTableCellElement>) => {
      e.currentTarget.classList.remove("over");
    };

    return (
      <>
        {Array.from({ length: rowLen }).map((_, index) => (
          <tr key={index}>
            {index === 0 ? (
              <td className='text-center font-bold border p-2' rowSpan={4}>
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
                {data[index] && data[index][dayIndex] ? (
                  <Course
                    name={data[index][dayIndex]}
                    className={coursesColor[courses.indexOf(data[index][dayIndex])]}
                  />
                ) : null}
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className='p-4'>
      <table className='min-w-full border-collapse border border-gray-300'>
        {/* 表格头部，星期几 */}
        <thead>
          <tr>
            <th className='border p-2'></th> {/* 空单元格 */}
            {days.map((day, index) => (
              <th key={index} className='border p-2'>
                {day}
              </th>
            ))}
          </tr>
        </thead>

        {/* 上午课程 */}
        <tbody>
          {renderRows("上午", 4, pmCells, handlePmDrop)}

          {/* 下午课程 */}
          {renderRows("下午", 3, amCells, handleAmDrop)}
        </tbody>
      </table>
    </div>
  );
};

interface CourseProps {
  name: string;
  draggable?: boolean;
  className?: string;
}

const courses = ["语文", "数学", "英语", "体育", "物理", "化学", "生物"];
const coursesColor = ["blue", "green", "red", "yellow", "purple", "pink", "orange"];
const Course: React.FC<CourseProps> = ({ name, draggable, className }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", name);
  };

  return (
    <div
      draggable={draggable}
      onDragStart={handleDragStart}
      className={`p-4  border rounded-md cursor-move bg-${className}-400`}
    >
      {name}
    </div>
  );
};

const DragDemo = () => {
  return (
    <div>
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
    </div>
  );
};

export default DragDemo;
