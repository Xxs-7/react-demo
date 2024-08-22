import React from "react";

export default function Section({ children }) {
  return (
    <div className="p-4">
      <div className="p-4 rounded-md border-slate-200 border border-black/5 ">
        {children}
      </div>
    </div>
  );
}
