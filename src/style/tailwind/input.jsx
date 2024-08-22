import React from "react";

const UserInput = () => {
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="max-w-md px-4 mx-auto ">
      <label htmlFor="username" className="block py-2 text-gray-500">
        Username
      </label>
      <div className="flex items-center border rounded-md">
        <div className="px-3 py-2 rounded-l-md bg-gray-50 border-r text-gray-400 ">
          @
        </div>
        <input
          type="text"
          placeholder="please input"
          id="username"
          onChange={handleChange}
          className="w-full p-2 ml-2 bg-transparent outline-none"
        />
      </div>
      <div className="flex items-center py-2">
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full px-3 py-2 rounded-md  bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"
          // value="george@krugerindustrial."
          placeholder="you@example.com"
        />
      </div>
    </div>
  );
};

export { UserInput };
