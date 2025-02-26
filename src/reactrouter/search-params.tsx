// https://github.com/remix-run/react-router/blob/dev/examples/search-params/src/App.tsx
// API：useSearchParams - 用于读取和修改 URL 的查询参数
// 功能：通过 URL 查询参数实现 GitHub 用户搜索，展示用户信息

import * as React from "react";
import { BrowserRouter, Link, Route, Routes, useSearchParams } from "react-router-dom";

export default function App() {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-4xl mx-auto px-6'>
        <header className='mb-12'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>Search GitHub Users</h1>
          <p className='text-gray-600 leading-relaxed'>
            This example demonstrates a simple search page that makes a request for user data to the GitHub API and
            displays information for that user on the page. The example uses the{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>useSearchParams()</code>{" "}
            hook to read and write the URL query string.
          </p>
        </header>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

function randomUser() {
  let users = ["chaance", "jacob-ebey", "mcansh", "mjackson", "ryanflorence"];
  return users[Math.floor(Math.random() * users.length)];
}

function Home() {
  let [searchParams, setSearchParams] = useSearchParams();

  // searchParams is a URLSearchParams object.
  // See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  let user = searchParams.get("user");

  let [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    let abortController = new AbortController();

    async function getGitHubUser() {
      let response = await fetch(`https://api.github.com/users/${user}`, {
        signal: abortController.signal,
      });

      if (!abortController.signal.aborted) {
        let data = await response.json();
        setUserData(data);
      }
    }

    if (user) {
      getGitHubUser();
    }
  }, [user]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let newUser = formData.get("user") as string;
    if (!newUser) {
      return;
    }
    setSearchParams({ user: newUser });
  }

  function handleRandomSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let newUser = randomUser();
    // our new random user is the same as our current one, let's try again
    if (newUser === user) {
      handleRandomSubmit(event);
    } else {
      setSearchParams({ user: newUser });
    }
  }

  return (
    <div className='space-y-8'>
      <div className='flex flex-wrap gap-4'>
        <form onSubmit={handleSubmit} className='flex-1 flex gap-3 max-w-xl'>
          <input
            defaultValue={user ?? undefined}
            type='text'
            name='user'
            className='flex-1 px-4 py-3 rounded-lg border border-gray-300 
                     bg-white shadow-sm
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder-gray-400 transition-all'
            placeholder='Enter GitHub username'
          />
          <button
            type='submit'
            className='px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
                     hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2
                     transition-all shadow-sm hover:shadow'
          >
            Search
          </button>
        </form>

        <form onSubmit={handleRandomSubmit}>
          <input type='hidden' name='random' />
          <button
            type='submit'
            className='px-6 py-3 bg-gray-600 text-white font-medium rounded-lg
                     hover:bg-gray-700 focus:outline-none focus:ring-2 
                     focus:ring-gray-500 focus:ring-offset-2
                     transition-all shadow-sm hover:shadow'
          >
            Random User
          </button>
        </form>
      </div>

      {userData && (
        <div className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'>
          <div className='p-8 flex flex-col md:flex-row gap-8'>
            <div className='flex-shrink-0'>
              <img
                className='w-40 h-40 rounded-xl object-cover shadow-sm'
                src={userData.avatar_url}
                alt={userData.login}
              />
            </div>
            <div className='flex-1 min-w-0'>
              <div className='flex flex-wrap items-center gap-4 mb-4'>
                <h2 className='text-3xl font-bold text-gray-900'>{userData.name}</h2>
                <a
                  href={`https://github.com/${userData.login}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-500 hover:text-blue-600 transition-colors'
                >
                  @{userData.login}
                </a>
              </div>

              {userData.bio && <p className='text-gray-600 mb-6 leading-relaxed'>{userData.bio}</p>}

              <div className='flex flex-wrap gap-6 text-sm'>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold text-gray-900'>{userData.followers.toLocaleString()}</span>
                  <span className='text-gray-500'>followers</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold text-gray-900'>{userData.following.toLocaleString()}</span>
                  <span className='text-gray-500'>following</span>
                </div>
                {userData.company && (
                  <div className='flex items-center gap-2'>
                    <svg className='w-4 h-4 text-gray-400' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z' />
                    </svg>
                    <span className='text-gray-600'>{userData.company}</span>
                  </div>
                )}
                {userData.location && (
                  <div className='flex items-center gap-2'>
                    <svg className='w-4 h-4 text-gray-400' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z' />
                    </svg>
                    <span className='text-gray-600'>{userData.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NoMatch() {
  return (
    <div className='text-center py-16'>
      <h2 className='text-3xl font-bold text-gray-900 mb-4'>404 - Page Not Found</h2>
      <p className='text-gray-600 mb-8'>The page you're looking for doesn't exist.</p>
      <Link
        to='/'
        className='inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
                 hover:bg-blue-700 focus:outline-none focus:ring-2 
                 focus:ring-blue-500 focus:ring-offset-2
                 transition-all shadow-sm hover:shadow'
      >
        Go to Home Page
      </Link>
    </div>
  );
}
