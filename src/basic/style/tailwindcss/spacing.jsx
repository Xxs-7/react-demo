import React from 'react'

export default function spacing() {
  return (
    <div class='relative rounded-xl overflow-auto p-8'>
      <div class='grid grid-cols-1 sm:grid-cols-3 gap-4 text-white text-center font-bold leading-6'>
        <div class='flex flex-col items-center shrink-0'>
          <p class='font-medium text-sm text-slate-500 font-mono text-center mb-3 dark:text-slate-400'>
            ring-2
          </p>
          <button class='px-4 py-2 font-semibold text-sm bg-white text-slate-700 border border-slate-300 rounded-md shadow-sm ring-2 ring-offset-2 ring-offset-slate-50 ring-blue-300 dark:bg-slate-700 dark:text-slate-200 dark:ring-offset-slate-900 dark:border-transparent'>
            Button A
          </button>
        </div>
        <div class='flex flex-col items-center shrink-0'>
          <p class='font-medium text-sm text-slate-500 font-mono text-center mb-3 dark:text-slate-400'>
            ring
          </p>
          <button class='px-4 py-2 font-semibold text-sm bg-white text-slate-700 border border-slate-300 rounded-md shadow-sm ring ring-offset-2 ring-offset-slate-50 ring-blue-300 dark:bg-slate-700 dark:text-slate-200 dark:ring-offset-slate-900 dark:border-transparent'>
            Button B
          </button>
        </div>
        <div class='flex flex-col items-center shrink-0'>
          <p class='font-medium text-sm text-slate-500 font-mono text-center mb-3 dark:text-slate-400'>
            ring-4
          </p>
          <button class='px-4 py-2 font-semibold text-sm bg-white text-slate-700 border border-slate-300 rounded-md shadow-sm ring-4 ring-offset-2 ring-offset-slate-50 ring-blue-300 dark:bg-slate-700 dark:text-slate-200 dark:ring-offset-slate-900 dark:border-transparent'>
            Button C
          </button>
        </div>
      </div>
    </div>
  )
}
