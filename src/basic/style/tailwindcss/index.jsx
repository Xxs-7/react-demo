import React from 'react'
// import Home1 from '../blog'
// import DarkMode from './darkmode'
// import "./index.css";

export default function TailwindPage() {
  return (
    <div className='container mx-auto max-w-xl h-screen p-4 m-2 rounded-lg bg-white dark:bg-black'>
      <Button />
    </div>
    // <Home1 />
    // <DarkMode />
  )
}

function Button() {
  return (
    <div>
      <button class='py-2 px-4 font-semibold rounded-xl shadow-md text-white bg-green-500 hover:bg-green-700'>
        darkMode
      </button>
    </div>
  )
}
