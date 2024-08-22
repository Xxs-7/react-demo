import React from "react";
import SuggestionInput from "./index";

const suggestions = [
  "apple",
  "banana",
  "grape",
  "orange",
  "pineapple",
  "strawberry",
];

const SuggestionDemo: React.FC = () => {
  return (
    <div className="h-[1000px] w-screen flex flex-col items-center justify-start">
      {/* <h1>Suggestion Input</h1> */}
      <div className="w-[200px] border bg-black">
        <SuggestionInput suggestions={suggestions} />
      </div>
    </div>
  );
};

export default SuggestionDemo;
