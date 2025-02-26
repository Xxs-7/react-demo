// https://github.com/remix-run/react-router/blob/dev/examples/basic/src/App.tsx
// API：Routes, Route, Outlet, Link
// 功能：嵌套路由中使用 Routes outlet 实现布局
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter>
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-3xl font-bold mb-4'>Basic Example</h1>

        <p className='text-gray-600 mb-8'>
          This example demonstrates some of the core features of React Router including nested{" "}
          <code className='bg-gray-100 px-1 rounded'>&lt;Route&gt;</code>
          s, <code className='bg-gray-100 px-1 rounded'>&lt;Outlet&gt;</code>s,{" "}
          <code className='bg-gray-100 px-1 rounded'>&lt;Link&gt;</code>s, and using a "*" route (aka "splat route") to
          render a "not found" page when someone visits an unrecognized URL.
        </p>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='dashboard' element={<Dashboard />} />

            {/* Using path="*"" means "match anything", so this route
                  acts like a catch-all for URLs that we don't have explicit
                  routes for. */}
            <Route path='*' element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav className='bg-gray-50 p-4 rounded-lg mb-8'>
        <ul className='flex space-x-6'>
          <li>
            <Link to='/' className='text-blue-600 hover:text-blue-800 font-medium'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/about' className='text-blue-600 hover:text-blue-800 font-medium'>
              About
            </Link>
          </li>
          <li>
            <Link to='/dashboard' className='text-blue-600 hover:text-blue-800 font-medium'>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to='/nothing-here' className='text-blue-600 hover:text-blue-800 font-medium'>
              Nothing Here
            </Link>
          </li>
        </ul>
      </nav>

      <hr className='my-8 border-gray-200' />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div className='bg-white p-6 rounded-lg shadow-sm'>
      <h2 className='text-2xl font-semibold mb-4'>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div className='bg-white p-6 rounded-lg shadow-sm'>
      <h2 className='text-2xl font-semibold mb-4'>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div className='bg-white p-6 rounded-lg shadow-sm'>
      <h2 className='text-2xl font-semibold mb-4'>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div className='bg-white p-6 rounded-lg shadow-sm text-center'>
      <h2 className='text-2xl font-semibold mb-4 text-red-600'>Nothing to see here!</h2>
      <p>
        <Link to='/' className='text-blue-600 hover:text-blue-800 font-medium'>
          Go to the home page
        </Link>
      </p>
    </div>
  );
}
