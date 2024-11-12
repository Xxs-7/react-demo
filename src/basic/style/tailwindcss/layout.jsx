import React from 'react'
import { Layout, Section } from '../layout'

export default function Page() {
  return (
    <div className='grid lg:grid-cols-[20, auto] md:grid-cols-2 sm:grid-cols-1 space-x-2 space-y-2'>
      <div className='border-2 rounded-md p-6'>
        <div className='max-w-sm mx-auto p-6 space-x-4 bg-white rounded-xl shadow-lg flex items-center'>
          <div>
            <img className='h-12 w-12' src='/next.svg' alt='ChitChat Logo' />
          </div>
          <div>
            <div className='text-xl font-medium text-black'>ChitChat</div>
            <p className='text-slate-500'>You have a new message!</p>
          </div>
        </div>
      </div>
      <Section>
        <button className='bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white'>
          Save changes
        </button>
      </Section>

      <Section>
        <dialog class='backdrop:bg-gray-50'>
          <form method='dialog'>Hello</form>
        </dialog>
      </Section>

      <Section>
        <button
          type='button'
          class='inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500'
          disabled=''
        >
          <svg
            class='motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              class='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              stroke-width='4'
            ></circle>
            <path
              class='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          Processing...
        </button>
      </Section>
      <Section>
        <div aria-checked='true' class='bg-gray-600 aria-checked:bg-sky-700'>
          hello
        </div>
      </Section>
      <Section>
        <div class='max-w-lg mx-auto p-8'>
          <details
            class='open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg'
            open
          >
            <summary class='text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none'>
              Why do they call it Ovaltine?
            </summary>
            <div class='mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400'>
              <p>
                The mug is round. The jar is round. They should call it
                Roundtine.
              </p>
            </div>
          </details>
        </div>
      </Section>
    </div>
  )
}

{
  /* <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div> */
}

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
