// https://github.com/remix-run/react-router/blob/dev/examples/custom-link/src/App.tsx
// 功能：
// 1. 自定义 Link 组件，支持激活状态样式
// 2. 展示如何使用底层的路由 hooks 构建自定义导航组件
//
// 主要使用的 React Router API：
// - useResolvedPath：将任意路径（相对或绝对）解析为完整的 URL 路径
// - useMatch：判断当前路径是否匹配指定路径
// - Link：基础路由导航组件
//
// 实现要点：
// 1. 使用 useResolvedPath 处理相对路径
// 2. 使用 useMatch 判断路径匹配状态
// 3. 基于匹配状态添加激活样式

import { Routes, Route, Outlet, Link, useMatch, useResolvedPath, BrowserRouter } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-3xl font-bold mb-6'>Custom Link Example</h1>

        <p className='text-gray-600 mb-8'>
          This example demonstrates how to create a custom{" "}
          <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>&lt;Link&gt;</code> component
          that knows whether or not it is "active" using the low-level{" "}
          <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>useResolvedPath()</code> and{" "}
          <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>useMatch()</code> hooks.
        </p>

        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='*' element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function CustomLink({ children, to, ...props }: LinkProps) {
  // 处理相对路径导航

  // useResolvedPath 将任意路径（相对或绝对）解析为完整的 URL 路径
  let resolved = useResolvedPath(to);
  // end 表示精确匹配，如果路径是 about/me，则不会匹配到about
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div className='py-2'>
      <Link
        className={`text-lg transition-colors ${
          match ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
        }`}
        to={to}
        {...props}
      >
        {children}
      </Link>
      {match && <span className='ml-2 text-sm text-blue-500'>(active)</span>}
    </div>
  );
}

function Layout() {
  return (
    <div className='space-y-6'>
      <nav className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
        <ul className='space-y-2'>
          <li>
            <CustomLink to='/'>Home</CustomLink>
          </li>
          <li>
            <CustomLink to='/about'>About</CustomLink>
          </li>
        </ul>
      </nav>

      <hr className='border-gray-200' />

      <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
        <Outlet />
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Home</h1>
      <p className='text-gray-600'>Welcome to the home page!</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1 className='text-2xl font-semibold text-gray-800 mb-4'>About</h1>
      <p className='text-gray-600'>Learn more about us.</p>
    </div>
  );
}

function NoMatch() {
  return (
    <div className='text-center py-8'>
      <h1 className='text-2xl font-semibold text-red-600 mb-4'>Nothing to see here!</h1>
      <p className='mb-4'>
        <Link
          to='/'
          className='text-blue-600 hover:text-blue-800 font-medium 
                   transition-colors hover:underline'
        >
          Go to the home page
        </Link>
      </p>
    </div>
  );
}
