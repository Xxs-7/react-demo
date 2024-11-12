import React, { useEffect } from 'react'

export default function DarkMode() {
  const darkMode = () => {
    const clsList = document.documentElement.classList
    if (!clsList.contains('dark-mode')) {
      document.documentElement.classList.add('dark')
    }
  }
  const lightMode = () => {
    document.documentElement.classList.remove('dark')
  }
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    if (darkModeQuery.matches) {
      // 处于深色模式
      console.log('dark mode')
    } else {
      // 处于浅色模式
      console.log('light mode')
    }
  }, [])
  return (
    <div className='dark:bg-black dark:text-white container'>
      <button
        className='py-2 px-4 font-semibold rounded-xl shadow-md  bg-green-500 hover:bg-green-700'
        onClick={darkMode}
      >
        darkMode
      </button>
      <button
        className='py-2 px-4 font-semibold rounded-xl shadow-md bg-green-500 hover:bg-green-700'
        onClick={lightMode}
      >
        lightMode
      </button>
    </div>
  )
}
