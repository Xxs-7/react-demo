// https://github.com/remix-run/react-router/blob/dev/examples/lazy-loading-router-provider/src/App.tsx
// 基于 React Router 实现的路由懒加载示例
// 功能：
// 1. 路由懒加载：按需加载路由组件和配置
// 2. 多级路由：支持嵌套路由的懒加载
// 3. 加载状态：展示路由加载过程中的临时状态
// 4. 数据预加载：支持在路由加载时预加载数据
//
// 主要使用的 React Router API：
// - lazy：路由级别的代码分割
// - RouterProvider：提供路由上下文和加载状态
// - useNavigation：获取导航状态
// - Outlet：渲染子路由
//
// 实现要点：
// 1. 路由懒加载设计：
//    - 使用动态导入实现代码分割
//    - 支持路由级别的组件懒加载
//    - 支持路由级别的数据加载器懒加载
// 2. 加载状态处理：
//    - 全局加载状态展示
//    - 路由切换过程反馈
//    - 平滑的加载过渡
// 3. 性能优化：
//    - 按需加载减少初始包体积
//    - 预加载关键路由
//    - 优化加载体验

import { Outlet, Link, createBrowserRouter, RouterProvider, useNavigation } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        // Single route in lazy file
        lazy: () => import("./pages/About"),
      },
      {
        path: "dashboard",
        async lazy() {
          // Multiple routes in lazy file
          let { DashboardLayout } = await import("./pages/Dashboard");
          return { Component: DashboardLayout };
        },
        children: [
          {
            index: true,
            async lazy() {
              let { DashboardIndex } = await import("./pages/Dashboard");
              return { Component: DashboardIndex };
            },
          },
          {
            path: "messages",
            async lazy() {
              let { dashboardMessagesLoader, DashboardMessages } = await import("./pages/Dashboard");
              return {
                loader: dashboardMessagesLoader,
                Component: DashboardMessages,
              };
            },
          },
        ],
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p className='text-center py-12 text-gray-600'>Loading...</p>} />
  );
}

function Layout() {
  let navigation = useNavigation();

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>Lazy Loading Example using RouterProvider</h1>

        <div className='prose prose-gray max-w-none mb-8'>
          <p className='text-gray-600'>
            This example demonstrates how to lazily load route definitions using{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>route.lazy()</code>. To get
            the full effect of this demo, be sure to open your Network tab and watch the new bundles load dynamically as
            you navigate around.
          </p>

          <p className='text-gray-600'>
            The "About" and "Dashboard" pages are not loaded until you click on the link. When you do, the code is
            loaded via a dynamic{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>import()</code> statement
            during the <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>loading</code>{" "}
            phase of the navigation. Once the code loads, the route loader executes, and then the element renders with
            the loader-provided data.
          </p>

          <p className='text-gray-600'>
            This works for all data-loading/rendering related properties of a route, including{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>action</code>,{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>loader</code>,{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>element</code>,{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>errorElement</code>, and{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>shouldRevalidate</code>. You
            cannot return path-matching properties from{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>lazy()</code> such as{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>path</code>,{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>index</code>,{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>children</code>, and{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>caseSensitive</code>.
          </p>
        </div>

        {navigation.state !== "idle" && <div className='fixed top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse' />}

        <nav className='bg-white shadow-sm rounded-lg p-6 mb-8'>
          <ul className='flex space-x-6'>
            <li>
              <Link to='/' className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/about' className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
                About
              </Link>
            </li>
            <li>
              <Link
                to='/dashboard/messages'
                className='text-blue-600 hover:text-blue-800 font-medium transition-colors'
              >
                Messages (Dashboard)
              </Link>
            </li>
          </ul>
        </nav>

        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className='prose prose-gray max-w-none'>
      <h2 className='text-2xl font-bold text-gray-900'>Home</h2>
      <p className='text-gray-600'>Welcome to the home page!</p>
    </div>
  );
}

function NoMatch() {
  return (
    <div className='text-center py-8'>
      <h2 className='text-2xl font-bold text-red-600 mb-4'>Nothing to see here!</h2>
      <p className='mb-4'>
        <Link to='/' className='text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline'>
          Go to the home page
        </Link>
      </p>
    </div>
  );
}
