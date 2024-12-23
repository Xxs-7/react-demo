import React, { useState, useEffect } from "react";
// import "./styles.css";

const fruits = [
  { id: 1, label: "apple" },
  { id: 2, label: "pear" },
  { id: 3, label: "banana" },
  { id: 4, label: "cherry" },
];

export default function UseEffectDemo() {
  const [fruitListOfIndex, setfruitListOfIndex] = useState(fruits);

  const addOneToListOfIndex = () => {
    setfruitListOfIndex((l) => [...l, { id: 5, label: "orange" }]);
  };

  return (
    <div>
      <div>
        <h1>index</h1>
        <button onClick={addOneToListOfIndex}>增加一个</button>
        <div className='App'>
          {fruitListOfIndex.map((f) => (
            <FruitItem key={f.id} label={f.label} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FruitItem({ label }) {
  console.log("RENDER");
  return <div>{label}</div>;
}
